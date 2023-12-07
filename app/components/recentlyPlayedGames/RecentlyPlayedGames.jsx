'use client'

export const dynamic = 'force-dynamic'

// import { getClient } from './lib/client'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { gql } from '@apollo/client'

const query = gql`
  query GET_RECENTLY_PLAYED_GAMES {
    recentlyPlayedGames {
      name
      lastPlayedDateTime
      titleId
      platform
      image {
        url
      }
    }
  }
`
export default function RecentlyPlayedGames() {
  const { data } = useSuspenseQuery(query)

  console.log(data, 'this is the data from recenelty played component')
  return <div>recentlyPlayedGames</div>
}
