import { getClient } from '../../lib/client'

import { gql } from '@apollo/client'

const query = gql`
  query Users($accountId: String) {
    users(accountId: $accountId) {
      onlineId
      accountId
      aboutMe
      avatarUrls {
        avatarUrl
      }
      plus
      personalDetail {
        firstName
        lastName
        profilePictureUrls {
          profilePictureUrl
        }
      }
    }
  }
`

export default async function SearchResults({ searchQuery }) {
  const { data } = await getClient().query({
    query: query,
    variables: { accountId: searchQuery },
    errorPolicy: 'all',
    // skip: !searchQuery,
  })

  console.log(data, 'DATA')
  return (
    <div>
      SearchResults
      {JSON.stringify(data)}
    </div>
  )
}
