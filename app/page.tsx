import { getClient } from './lib/client'
import { gql } from '@apollo/client'
import RecentlyPlayedGames from './components/recentlyPlayedGames/recentlyPlayedGames'

import SearchBar from './components/searchBar/searchBar'
import Image from 'next/image'

import SearchResults from './components/searchBar/SearchResults'

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
      primaryOnlineStatus
      presences {
        onlineStatus
      }
    }
    # presence(accountId: $presenceAccountId) {
    #   availability
    #   primaryPlatformInfo {
    #     onlineStatus
    #     lastOnlineDate
    #     platform
    #   }
    # }
  }
`
export default async function Home({ searchParams }) {
  const searchQuery = searchParams?.query

  console.log(searchQuery, 'search')
  const { data } = await getClient().query({
    query: query,
    variables: { accountId: 'botsd0ntcry_' },
  })

  const psnImage =
    data.users.personalDetail?.profilePictureUrls[0].profilePictureUrl
  const avatarImageUrls = data.users.avatarUrls[0].avatarUrl

  const userName = data.users.onlineId

  const aboutMe = data.users.aboutMe

  const onlineStatus = data.users.primaryOnlineStatus

  return (
    <>
      <div className='grid gap-4 grid-cols-3py-8 my-6'>
        <div>
          <div>
            <h1>filler content here for the grid</h1>
          </div>
        </div>

        <div className='flex flex-col items-center justify-center  py-8 mx-4  '>
          <Image
            className='content-center '
            src={psnImage ? psnImage : avatarImageUrls}
            alt='Playstation image'
            width={260}
            height={260}
          />
          <div className='flex flex-wrap  py-3 px-3 text-center mt-6 '>
            <h1 className='bg-gradient-to-r from-red-600 via-red-500 to-yellow-400  text-transparent bg-clip-text text-lg'>
              {userName}
            </h1>
          </div>

          <p className='cols-span-6'>{aboutMe}</p>
          <p>{onlineStatus}</p>
        </div>
      </div>

      <div>
        <RecentlyPlayedGames />
      </div>
    </>
  )
}
