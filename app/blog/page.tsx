import { performRequest } from '../lib/datoCMS'

const TEST_QUERY = `
query TEST {
  allBlogs {
    title
    _status
    body
    categories
  }
}

`

export default async function page() {
  const data = await performRequest({
    query: TEST_QUERY,
  })

  console.log(data, 'DATA')

  return <div>Blog</div>
}
