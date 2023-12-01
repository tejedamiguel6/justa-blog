import { RESTDataSource } from '@apollo/datasource-rest'
import { getUserTitles } from 'psn-api'
import dotenv from 'dotenv'
import {
  makeUniversalSearch,
  getRecentlyPlayedGames,
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
    const token = await this.getAccessToken()
    request.headers.set('Authorization', `Bearer ${token}`)
  }

  async getUserByProfileName(username) {
    const token = await this.getAccessToken()
    const response = await getProfileFromUserName(
      token,
      username,
      'SocialAllAccounts'
    )
    // console.log(response.profile, 'this is the response')
    // return response
    return response.profile
  }

  async getUserByProfileID(username) {
    console.log('yore calling the function')
    const token = await this.getAccessToken()
    const response = await makeUniversalSearch(
      token,
      username,
      'SocialAllAccounts'
    )
    return response.domainResponses[0].results[0]
    // console.log(response.domainResponses[0].results[0], '((((')
  }

  async getRecentlyPlayedGames() {
    const token = await this.getAccessToken()
    const response = await getRecentlyPlayedGames(token)

    // return response.data.games
    return response.data.gameLibraryTitlesRetrieve.games
  }

  async getUserGameTitles(accountId) {
    const token = await this.getAccessToken()

    const response = await getUserTitles(token, accountId)
    console.log(
      'START',
      response.trophyTitles,
      'these are the games im playinf'
    )
    return response.trophyTitles
  }

  async getBasicPresence(accountId) {
    const token = await this.getAccessToken()
    const response = await getBasicPresence(token, accountId)
    return response.basicPresence
    // console.log(response.basicPresence, 'get')
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
