import { RESTDataSource } from '@apollo/datasource-rest'
import { getUserTitles } from 'psn-api'
import dotenv from 'dotenv'
import {
  makeUniversalSearch,
  getRecentlyPlayedGames,
  getTitleTrophies,
  exchangeNpssoForCode,
  exchangeCodeForAccessToken,
  exchangeRefreshTokenForAuthTokens,
  getProfileFromUserName,
  getBasicPresence,
} from 'psn-api'
dotenv.config()

export class PlaystationAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'https://psn-api.achievements.app/'
  }

  async getAccessToken() {
    if (!this.accessToken) {
      const myNpsso = process.env.PSN_TOKEN
      const accessCode = await exchangeNpssoForCode(myNpsso)
      this.accessToken = await exchangeCodeForAccessToken(accessCode)
    }
    return this.accessToken
  }

  async willSendRequest(_path, request) {
    console.log(request, '**^$#$')
    const token = await this.getAccessToken()
    request.headers.set('Authorization', `Bearer ${token}`)
  }

  /*
  *****************************************
  all request to the playstation network
  below this line
  *****************************************
  */

  async getUserByProfileName(username) {
    const token = await this.getAccessToken()
    const response = await getProfileFromUserName(
      token,
      username,
      'SocialAllAccounts'
    )
    return response.profile
  }

  // A call to this function will make a universal
  //search across the PlayStation Network
  //for your search query.Each search
  // query requires a domain, such as "SocialAllAccounts"
  async getUserByProfileID(username) {
    console.log('yore calling the function')
    const token = await this.getAccessToken()
    const response = await makeUniversalSearch(
      token,
      username,
      'SocialAllAccounts'
    )
    return response.domainResponses[0].results[0]
  }

  // only works for the user that is logged in
  async getRecentlyPlayedGames() {
    const token = await this.getAccessToken()
    const response = await getRecentlyPlayedGames(token)
    return response.data.gameLibraryTitlesRetrieve.games
  }

  async getUserGameTitles(accountId) {
    const token = await this.getAccessToken()
    const response = await getUserTitles(token, accountId)

    return response.trophyTitles
  }

  async getBasicPresence(accountId) {
    const token = await this.getAccessToken()
    const response = await getBasicPresence(token, accountId)
    return response.basicPresence
  }

  // getting TROPHIES
  async getTrophyTitle() {
    const token = await this.getAccessToken()
    const response = await getTitleTrophies(token, 'NPWR20188_00', 'all')
    console.log(response, 'this is trophy response')
  }

  // not sure why i need this
  // async exchangeCodeForAccessToken(accessCode) {
  //   const response = await fetch(`${this.baseURL}/auth/token`, {
  //     method: 'POST',
  //     body: JSON.stringify({ accessCode }),
  //     headers: { 'Content-Type': 'application/json' },
  //   })
  //   const data = await response.json()
  //   return data.access_token
  // }

  // async exchangeNpssoForCode(npssoToken) {
  //   const response = await fetch(`${this.baseURL}/auth/code`, {
  //     method: 'POST',
  //     body: JSON.stringify({ npssoToken }),
  //     headers: { 'Content-Type': 'application/json' },
  //   })
  //   console.log(response, 'what is the resp')
  // }
}
