import {execFileSync} from 'node:child_process';
import {readFileSync,writeFileSync,unlinkSync} from 'node:fs';
import postcss from 'postcss';
import prefix from 'postcss-prefix-selector';
const temp='src/ui-library/boardui/.generated.css';
execFileSync(process.execPath,['node_modules/@tailwindcss/cli/dist/index.mjs','-i','vendor/boardui/styles/entry.css','-o',temp],{stdio:'inherit'});
const result=await postcss([prefix({prefix:'.bui-kit',transform:(p,s,ps)=>s===':root'||s===':host'||s==='html'?p:s==='body'?p:ps})]).process(readFileSync(temp,'utf8'),{from:temp,to:'src/ui-library/boardui/components.css'});
writeFileSync('src/ui-library/boardui/components.css',result.css);unlinkSync(temp);
