import { getClient } from './lib/client'
import { gql } from '@apollo/client'

import Image from 'next/image'

const query = gql`
  query Users($accountId: String) {
    users(accountId: $accountId) {
      onlineId
      accountId

      aboutMe

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
    # }
  }
`
export default async function Home() {
  const { data } = await getClient().query({
    query: query,
    variables: { accountId: 'Botsd0ntcry_' },
  })
  //
  console.log(data, '<--yay-')

  const psnImage =
    data.users.personalDetail.profilePictureUrls[0].profilePictureUrl

  const userName = data.users.onlineId

  const aboutMe = data.users.aboutMe
  const firstName = data.users.personalDetail.firstName
  const lastName = data.users.personalDetail.lastName

  console.log(firstName, 'lol')

  // console.log(psnImage, 'omg')

  return (
    <div className='grid gap-4 grid-cols-8 border-2 border-blue-500 py-8 my-6'>
      <div className='col-span-2 py-8 mx-4 flex flex-col items-center justify-center '>
        {/* Adjust the width and height as needed */}
        <Image
          className='content-center'
          src={psnImage}
          alt='Playstation image'
          width={260}
          height={260}
        />

        <div className='flex flex-wrap  py-3 px-3 border-2 border-red-500 text-center'>
          <h1>UserName: {userName}</h1>
          <p>
            Name: <span>{firstName}</span>
          </p>
          <p>
            LastName: <span>{lastName}</span>
          </p>
        </div>
      </div>

      <p className='cols-span-6'>{aboutMe}</p>
    </div>
  )
}
