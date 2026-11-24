// The same checks as `lifecycle kits validate .`, for CI.
// The CLI repo is private, so CI cannot download it. Keep this file in step with
// validateRegistry in the CLI's src/registry.ts. It checks and never writes:
// rebuild index.json and the README catalog with `lifecycle kits validate . --write-index`.
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { parse } from 'yaml'

const dir = resolve(process.argv[2] ?? '.')
const SOURCES = ['klaviyo', 'shopify', 'ga4', 'stripe', 'meta']
const SEMVER = /^\d+\.\d+\.\d+$/
const problems = []
const built = []

function manifestProblems(m) {
  const out = []
  const text = (v) => typeof v === 'string' && v.length > 0
  if (!m || typeof m !== 'object') return ['kit.yaml is not a mapping']
  if (!text(m.name) || !/^[a-z0-9-]+$/.test(m.name)) out.push('name must be lowercase letters, digits and hyphens')
  if (!text(m.version) || !SEMVER.test(m.version)) out.push('version must look like 1.0.0')
  for (const k of ['title', 'summary', 'writes']) if (!text(m[k])) out.push(`${k} is required`)
  if (!Array.isArray(m.needs) || m.needs.some((s) => !SOURCES.includes(s))) out.push(`needs must be a list drawn from ${SOURCES.join(', ')}`)
  if (m.requires_cli !== undefined && !(text(m.requires_cli) && SEMVER.test(m.requires_cli))) out.push('requires_cli must look like 0.10.0')
  for (const k of ['keywords', 'files']) if (m[k] !== undefined && !(Array.isArray(m[k]) && m[k].every((v) => typeof v === 'string'))) out.push(`${k} must be a list of text`)
  if (m.secrets !== undefined && !(Array.isArray(m.secrets) && m.secrets.every((s) => s && text(s.name) && text(s.description) && (s.required === undefined || typeof s.required === 'boolean')))) out.push('each secret needs a name and a description')
  return out
}

const kitsRoot = join(dir, 'kits')
if (!existsSync(kitsRoot)) problems.push({ problem: 'No kits/ folder.' })
else {
  for (const name of readdirSync(kitsRoot).sort()) {
    const kitDir = join(kitsRoot, name)
    if (!statSync(kitDir).isDirectory()) continue
    const manifestPath = join(kitDir, 'kit.yaml')
    if (!existsSync(manifestPath)) {
      problems.push({ kit: name, problem: 'kit.yaml is invalid: no kit.yaml.' })
      continue
    }
    const raw = readFileSync(manifestPath, 'utf8')
    let m
    try {
      m = parse(raw)
    } catch (e) {
      problems.push({ kit: name, problem: `kit.yaml is invalid: ${e.message}` })
      continue
    }
    const bad = manifestProblems(m)
    if (bad.length) {
      problems.push({ kit: name, problem: `kit.yaml is invalid: ${bad.join('; ')}` })
      continue
    }
    if (m.name !== name) problems.push({ kit: name, problem: `kit.yaml name is ${m.name}, folder is ${name}.` })
    for (const f of ['AGENT.md', 'README.md']) if (!existsSync(join(kitDir, f))) problems.push({ kit: name, problem: `Missing ${f}.` })
    const agent = existsSync(join(kitDir, 'AGENT.md')) ? readFileSync(join(kitDir, 'AGENT.md'), 'utf8') : ''
    if (agent && !/^## Verify$/m.test(agent)) problems.push({ kit: name, problem: 'AGENT.md has no "## Verify" checklist.' })
    for (const f of m.files ?? []) if (!existsSync(join(kitDir, f))) problems.push({ kit: name, problem: `kit.yaml lists ${f}, which does not exist.` })
    for (const ref of agent.matchAll(/`((?:\.\.\/shared|files)\/[^`\s]+)`/g)) {
      const rel = ref[1]
      const target = rel.startsWith('../shared/') ? join(dir, 'shared', rel.slice('../shared/'.length)) : join(kitDir, rel)
      if (!existsSync(target)) problems.push({ kit: name, problem: `AGENT.md points at ${rel}, which does not exist.` })
    }
    if (/[–—]/.test(agent + raw)) problems.push({ kit: name, problem: 'Contains an em or en dash.' })
    built.push({ name: m.name, version: m.version, path: `kits/${name}`, title: m.title, summary: m.summary, keywords: m.keywords ?? [], needs: m.needs, writes: m.writes })
  }
  const indexPath = join(dir, 'index.json')
  if (!existsSync(indexPath)) problems.push({ problem: 'No index.json. Run lifecycle kits validate . --write-index' })
  else if (JSON.stringify(JSON.parse(readFileSync(indexPath, 'utf8')).kits ?? []) !== JSON.stringify(built)) {
    problems.push({ problem: 'index.json is out of date with the kit folders. Run lifecycle kits validate . --write-index' })
  }
}

if (problems.length) {
  for (const p of problems) console.error(`${p.kit ? `${p.kit}: ` : ''}${p.problem}`)
  process.exit(1)
}
console.log(`OK: ${built.length} kits.`)
