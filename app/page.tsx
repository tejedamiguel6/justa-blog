import { getClient } from './lib/client'
import { gql } from '@apollo/client'

const query = gql`
  query UserByID($accountId: String!) {
    userByID(accountId: $accountId) {
      id
      socialMetadata {
        firstName
        language
        avatarUrl
        isPsPlus
      }
    }
  }
`
export default async function Home() {
  const { data } = await getClient().query({
    query: query,
    variables: { accountId: 'justvibinBro' },
  })

  console.log(data.userByID.socialMetadata.firstName, '<---')

  const firstName = data.userByID.socialMetadata.firstName
  const psnAvatar = data.userByID.socialMetadata.avatarUrl
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>PlayStation Profile:</h1>

      <h1>{firstName}</h1>
      <img src={psnAvatar} />
    </div>
  )
}
