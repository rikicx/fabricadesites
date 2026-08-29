import { readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import seo from '../src/data/seo.json' with { type: 'json' }
import { render } from '../dist-ssr/entry-server.js'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const distDir = path.join(projectRoot, 'dist')
const template = await readFile(path.join(distDir, 'index.html'), 'utf8')

const escapeHtml = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')

function replaceMeta(html, attribute, key, content) {
  const expression = new RegExp(
    `<meta\\s+[^>]*${attribute}=["']${key}["'][^>]*>`,
    'i',
  )
  const tag = `<meta ${attribute}="${key}" content="${escapeHtml(content)}" />`
  return expression.test(html)
    ? html.replace(expression, tag)
    : html.replace('</head>', `    ${tag}\n  </head>`)
}

function replaceCanonical(html, canonical) {
  const expression = /<link\s+[^>]*rel=["']canonical["'][^>]*>/i
  if (!canonical) return html.replace(expression, '')
  const tag = `<link rel="canonical" href="${canonical}" />`
  return expression.test(html)
    ? html.replace(expression, tag)
    : html.replace('</head>', `    ${tag}\n  </head>`)
}

function jsonLd(pathname, page, canonical) {
  const organizationId = `${seo.site.url}/#organization`
  const websiteId = `${seo.site.url}/#website`
  const graph = [
    {
      '@type': 'Organization',
      '@id': organizationId,
      name: seo.site.name,
      url: `${seo.site.url}/`,
      logo: `${seo.site.url}/logo-green.svg`,
      description:
        'Criação de sites para pequenos negócios com direção de designer sênior e velocidade de IA.',
    },
    {
      '@type': 'WebSite',
      '@id': websiteId,
      url: `${seo.site.url}/`,
      name: seo.site.name,
      publisher: { '@id': organizationId },
      inLanguage: seo.site.language,
    },
    {
      '@type': 'WebPage',
      '@id': `${canonical}#webpage`,
      url: canonical,
      name: page.title,
      description: page.description,
      isPartOf: { '@id': websiteId },
      about: { '@id': organizationId },
      inLanguage: seo.site.language,
    },
  ]

  if (pathname !== '/') {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Início',
          item: `${seo.site.url}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: page.label,
          item: canonical,
        },
      ],
    })
  }

  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })
}

function buildHtml(pathname, page, is404 = false) {
  const canonical = is404
    ? null
    : `${seo.site.url}${pathname === '/' ? '/' : pathname}`
  const image = `${seo.site.url}${seo.site.image}`
  const robots = page.index
    ? 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    : 'noindex, follow'
  const app = render(is404 ? '/pagina-nao-encontrada' : pathname)

  let html = template
    .replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(page.title)}</title>`)
    .replace('<div id="root"></div>', `<div id="root">${app}</div>`)

  html = replaceMeta(html, 'name', 'description', page.description)
  html = replaceMeta(html, 'name', 'robots', robots)
  html = replaceMeta(html, 'name', 'googlebot', robots)
  html = replaceMeta(html, 'property', 'og:title', page.title)
  html = replaceMeta(html, 'property', 'og:description', page.description)
  html = replaceMeta(html, 'property', 'og:url', canonical ?? seo.site.url)
  html = replaceMeta(html, 'name', 'twitter:title', page.title)
  html = replaceMeta(html, 'name', 'twitter:description', page.description)
  html = replaceCanonical(html, canonical)

  const data = canonical ? jsonLd(pathname, page, canonical) : ''
  html = html.replace(
    /<script id="seo-structured-data" type="application\/ld\+json">.*?<\/script>/s,
    data
      ? `<script id="seo-structured-data" type="application/ld+json">${data}</script>`
      : '',
  )

  return html
}

for (const [pathname, page] of Object.entries(seo.routes)) {
  if (pathname === '404') continue
  const html = buildHtml(pathname, page)
  if (pathname === '/') {
    await writeFile(path.join(distDir, 'index.html'), html)
    continue
  }
  await writeFile(path.join(distDir, `${pathname.slice(1)}.html`), html)
}

await writeFile(
  path.join(distDir, '404.html'),
  buildHtml('/pagina-nao-encontrada', seo.routes['404'], true),
)

await rm(path.join(projectRoot, 'dist-ssr'), { recursive: true, force: true })
