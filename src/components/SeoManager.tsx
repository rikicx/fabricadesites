import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import seo from '../data/seo.json'

type RouteSeo = {
  title: string
  description: string
  index: boolean
  label: string
}

const routes = seo.routes as Record<string, RouteSeo>

function setMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"]`,
  )
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.content = content
}

function setCanonical(url: string | null) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!url) {
    element?.remove()
    return
  }
  if (!element) {
    element = document.createElement('link')
    element.rel = 'canonical'
    document.head.appendChild(element)
  }
  element.href = url
}

function structuredData(pathname: string, page: RouteSeo, canonical: string) {
  const organizationId = `${seo.site.url}/#organization`
  const websiteId = `${seo.site.url}/#website`
  const graph: Record<string, unknown>[] = [
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

  return { '@context': 'https://schema.org', '@graph': graph }
}

export function SeoManager() {
  const { pathname } = useLocation()

  useEffect(() => {
    const routePath =
      pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
    const page = routes[routePath] ?? routes['404']
    const knownRoute = Boolean(routes[routePath])
    const canonical = knownRoute
      ? `${seo.site.url}${routePath === '/' ? '/' : routePath}`
      : null
    const image = `${seo.site.url}${seo.site.image}`
    const robots = page.index
      ? 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
      : 'noindex, follow'

    document.title = page.title
    setMeta('name', 'description', page.description)
    setMeta('name', 'robots', robots)
    setMeta('name', 'googlebot', robots)
    setMeta('property', 'og:title', page.title)
    setMeta('property', 'og:description', page.description)
    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:site_name', seo.site.name)
    setMeta('property', 'og:locale', seo.site.locale)
    setMeta('property', 'og:url', canonical ?? `${seo.site.url}${routePath}`)
    setMeta('property', 'og:image', image)
    setMeta('property', 'og:image:alt', seo.site.imageAlt)
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', page.title)
    setMeta('name', 'twitter:description', page.description)
    setMeta('name', 'twitter:image', image)
    setMeta('name', 'twitter:image:alt', seo.site.imageAlt)
    setCanonical(canonical)

    let script = document.head.querySelector<HTMLScriptElement>(
      '#seo-structured-data',
    )
    if (!knownRoute) {
      script?.remove()
      return
    }
    if (!script) {
      script = document.createElement('script')
      script.id = 'seo-structured-data'
      script.type = 'application/ld+json'
      document.head.appendChild(script)
    }
    script.textContent = JSON.stringify(
      structuredData(routePath, page, canonical as string),
    )
  }, [pathname])

  return null
}
