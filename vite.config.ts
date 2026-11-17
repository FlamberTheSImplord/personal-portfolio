import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { categories, resources, sources, purposes, stacks, prices } from './src/ui-library/resources'
import { pages, llmsTxt, sitemapXml, site } from './src/seo/pages'

// /ui-library.json: the UI Library directory as plain data, for search tools and AI agents.
const directoryJson = () => JSON.stringify({categories, purposes, stacks, prices, sources, resources: resources.map(r => ({...r, category: categories.find(c => c.id === r.category)!.name, source: sources[r.via]}))}, null, 1)

// Prerender: every route gets its own index.html with real content, title and description, so the site is readable
// without JavaScript. React replaces this content when it mounts. Also emits llms.txt and sitemap.xml.
const staticPages = (): Plugin => {
  let outDir = 'dist'
  return {
    name: 'static-pages',
    configResolved(config) { outDir = config.build.outDir },
    // Data check: a tag on more than a quarter of the library stops narrowing anything, so split it.
    buildStart() {
      // TAG_LIMIT=0.2 npm run build  shows the warning with a lower limit, to test it.
      const limit = Number(process.env.TAG_LIMIT) || 0.25
      for (const tag of purposes) {
        const n = resources.filter(r => r.purpose.includes(tag)).length
        if (n / resources.length > limit) this.warn(`UI Library tag "${tag}" is on ${n} of ${resources.length} resources (over ${Math.round(limit * 100)}%). Split it into narrower tags.`)
      }
    },
    configureServer(server) {
      const files: Record<string, [string, () => string]> = {'/ui-library.json': ['application/json', directoryJson], '/llms.txt': ['text/plain', llmsTxt], '/sitemap.xml': ['application/xml', sitemapXml]}
      server.middlewares.use((req, res, next) => { const f = files[req.url?.split('?')[0] ?? '']; if (!f) return next(); res.setHeader('Content-Type', f[0]); res.end(f[1]()) })
    },
    generateBundle() {
      this.emitFile({type: 'asset', fileName: 'ui-library.json', source: directoryJson()})
      this.emitFile({type: 'asset', fileName: 'llms.txt', source: llmsTxt()})
      this.emitFile({type: 'asset', fileName: 'sitemap.xml', source: sitemapXml()})
    },
    writeBundle() {
      const shell = readFileSync(join(outDir, 'index.html'), 'utf8')
      for (const p of pages) {
        const html = shell
          .replace(/<title>.*?<\/title>/, `<title>${p.title}</title><link rel="canonical" href="${site}${p.path}"/>`)
          .replace(/<meta name="description" content="[^"]*"\/>/, `<meta name="description" content="${p.description.replace(/"/g, '&quot;')}"/>`)
          .replace('<div id="root"></div>', `<div id="root">${p.body}</div>`)
        const dir = join(outDir, p.path); mkdirSync(dir, {recursive: true}); writeFileSync(join(dir, 'index.html'), html)
      }
    },
  }
}

export default defineConfig({plugins:[react(),staticPages()],build:{target:'es2022',rollupOptions:{input:{main:'index.html',stageshow:'vendor/stageshow/playground/index.html'}}},resolve:{dedupe:['react','react-dom']}})
