import { cache } from 'react'

const dedupedFetch = cache(
  async (
    body,
    includeDrafts = fales,
    excludeInvalid = false,
    visualEditingBaseUrl = null,
    revalidate = null
  ) => {
    const headers = {
      Authorization: `Bearer ${process.env.DATOCMS_TOKEN_KEY}`,
      ...(includeDrafts ? { 'X-Include-Drafts': 'true' } : {}),
      ...(excludeInvalid ? { 'X-Exclude-Invalid': 'true ' } : {}),
      ...(visualEditingBaseUrl
        ? {
            'X-Visual-Editing': 'vercel-v1',
            'X-Base-Editing-Url': visualEditingBaseUrl,
          }
        : {}),
      ...(process.env.NEXT_DATOCMS_ENVIRONMENT
        ? { 'X-Environment': `${process.env.NEXT_DATOCMS_ENVIRONMENT}` }
        : {}),
    }

    const response = await fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers,
      body,
      next: { revalidate },
    })

    const responseBody = await response.json()

    if (!response.ok) {
      throw new Error(
        `${response.status} ${response.statusText}: ${JSON.stringify(
          responseBody
        )}`
      )
    }

    return responseBody
  }
)

export async function performRequest({
  query,
  variables = {},
  includeDrafts = false,
  excludeInvalid = false,
  visualEditingBaseUrl,
  revalidate,
}) {
  const { data } = await dedupedFetch(
    JSON.stringify({ query, variables, revalidate }),
    includeDrafts,
    excludeInvalid,
    visualEditingBaseUrl,
    revalidate
  )

  return data
}
