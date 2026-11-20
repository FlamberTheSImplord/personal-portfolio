import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { existsSync, readFileSync, readdirSync, mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { categories, resources, sources, purposes, stacks, prices } from './src/ui-library/resources'
import { pages, llmsTxt, sitemapXml, site } from './src/seo/pages'
import { paletteProblems } from './src/palette/check'
import { rulesMd, rulesPath } from './src/ui-tips/rules'
import { briefMd, briefPath } from './src/ai-brief/brief'

// /ui-library.json: the UI Library directory as plain data, for search tools and AI agents.
const directoryJson = () => JSON.stringify({categories, purposes, stacks, prices, sources, resources: resources.map(r => ({...r, category: categories.find(c => c.id === r.category)!.name, source: sources[r.via]}))}, null, 1)

// Prerender: every route gets its own index.html with real content, title and description, so the site is readable
// without JavaScript. React replaces this content when it mounts. Also emits llms.txt and sitemap.xml.
const staticPages = (): Plugin => {
  let outDir = 'dist', serving = false
  return {
    name: 'static-pages',
    configResolved(config) { outDir = config.build.outDir; serving = config.command === 'serve' },
    // Data check: a tag on more than a quarter of the library stops narrowing anything, so split it.
    buildStart() {
      // UI rules for AI tools: a real file in public/, so the repo and GitHub hold the same copy as the live site.
      mkdirSync('public/ui-tips', {recursive: true}); writeFileSync(`public${rulesPath}`, rulesMd()); writeFileSync(`public${briefPath}`, briefMd())
      const problems = paletteProblems(readdirSync('src/palette/scenes'))
      for (const file of readdirSync('src/palette/scene-kit/layers')) {
        const scene = file.replace('.json', ''), manifest = JSON.parse(readFileSync(`src/palette/scene-kit/layers/${file}`, 'utf8'))
        const names = manifest.layers.flatMap((l: {id: string, accent?: boolean | 'only'}) => l.accent === false ? [l.id] : l.accent === 'only' ? [`${l.id}-v`] : [`${l.id}-b`, `${l.id}-v`])
        for (const name of [...names, ...(manifest.bg ? ['bg'] : [])]) if (!existsSync(`public/palettes/${scene}/${name}.webp`)) problems.push(`Palette scene "${scene}" is missing public/palettes/${scene}/${name}.webp.`)
      }
      if (problems.length && !serving) this.error(problems.join('\n'))
      problems.forEach(problem => this.warn(problem))
      const missing = resources.filter(r => !(r.still ? [`${r.id}.webp`] : [`${r.id}.mp4`, `${r.id}-poster.webp`]).every(file => existsSync(`public/ui-library/directory/${file}`)))
      if (missing.length) this.warn(`UI Library thumbnails missing for ${missing.map(r => r.id).join(', ')}. Run npm run library:sync.`)
      // TAG_LIMIT=0.2 npm run build  shows the warning with a lower limit, to test it.
      const limit = Number(process.env.TAG_LIMIT) || 0.25
      for (const tag of purposes) {
        const n = resources.filter(r => r.purpose.includes(tag)).length
        if (n / resources.length > limit) this.warn(`UI Library tag "${tag}" is on ${n} of ${resources.length} resources (over ${Math.round(limit * 100)}%). Split it into narrower tags.`)
      }
    },
    configureServer(server) {
      const files: Record<string, [string, () => string]> = {'/ui-library.json': ['application/json', directoryJson], '/llms.txt': ['text/plain', llmsTxt], '/sitemap.xml': ['application/xml', sitemapXml], [rulesPath]: ['text/markdown; charset=utf-8', rulesMd], [briefPath]: ['text/markdown; charset=utf-8', briefMd]}
      // Private reference frames for the palette overlay. They stay in .claude and are never built.
      server.middlewares.use('/__palette-ref', (req, res, next) => {
        const name = (req.url ?? '').split('?')[0].replace(/^\//, ''), file = join('.claude/palette-refs', name)
        if (!/^[a-z0-9-]+\.jpg$/.test(name) || !existsSync(file)) return next()
        res.setHeader('Content-Type', 'image/jpeg')
        res.end(req.method === 'HEAD' ? undefined : readFileSync(file))
      })
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
