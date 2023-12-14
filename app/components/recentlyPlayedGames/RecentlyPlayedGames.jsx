'use client'
import { unstable_noStore as noStore } from 'next/cache'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { gql } from '@apollo/client'
import Image from 'next/image'

import { useState } from 'react'

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
  noStore()
  const [hoveredGame, setHoveredGame] = useState(null)
  const { data } = useSuspenseQuery(query)

  const onHoverMouseEnter = (titleId) => {
    // console.log('hovering', titleId)
    setHoveredGame(titleId)
  }

  const onHoverMouseExit = () => {
    setHoveredGame(false)
  }

  // console.log(data, 'this is nhgghfthe data from recently played component')

  return (
    <div className='flex gap-1 justify-evenly flex-wrap border-red-800'>
      {data.recentlyPlayedGames.map((game) => {
        const gameCover = game.image.url
        return (
          <div key={game.titleId}>
            <ul>
              <li>
                <Image
                  onMouseEnter={() => onHoverMouseEnter(game.titleId)}
                  onMouseOut={() => onHoverMouseExit(null)}
                  src={gameCover}
                  width={300}
                  height={300}
                  alt={game.title}
                />
                <p className='text-sm text-red-500 w-80 p-4'>{game.name}</p>
                {hoveredGame === game.titleId && (
                  <h1 className='text-green-600'>TROPHIES HERE</h1>
                )}
              </li>
            </ul>
          </div>
        )
      })}
    </div>
  )
}
