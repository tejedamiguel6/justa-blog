import { gql } from 'graphql-tag'

export const typeDefs = gql`
  type Query {
    users: User
    user(accountId: String!): User
    userByID(accountId: String!): User
    # query game title by users
    userGameTitle(accountId: String!): [TrophyTitle]
    presence(accountId: String!): Presence
    recentlyPlayedGames(accountId: String): [RecentlyPlayedGame]
    testingServerComponents: String
  }

  # this user type is mainly for
  # getUserByProfileID fucntion
  type User {
    id: String
    type: String
    score: Int
    profile: Profile
    socialMetadata: SocialMetadata
  }

  type RecentlyPlayedGames {
    id: String
    RecentlyPlayedGames: [RecentlyPlayedGame]
  }

  type RecentlyPlayedGame {
    name: String!
    lastPlayedDateTime: String
    conceptId: String
    titleId: String
    platform: String
    entitlementId: String
    image: GameImageUrl
  }

  type GameImageUrl {
    url: String
  }

  # getUserByProfileName
  type Profile {
    onlineId: String
    accountId: String
    presences: [Presences]
    npId: String
    plus: Int
    aboutMe: String
    trophySummary: TrophySummary
    isOfficiallyVerified: Boolean
    personalDetailSharing: String
  }

  type Presences {
    onlineStatus: String
    hasBoradCastData: String
    lastOnlineDate: String
  }

  type TrophySummary {
    level: Int
    progress: Int
    # to do
    # earnedTrophies: it's an objec
  }

  type SocialMetadata {
    accountId: String
    country: String
    language: String
    onlineId: String
    firstName: String
    lastName: String
    isPsPlus: Boolean
    isOfficiallyVerified: Boolean
    avatarUrl: String
    profilePicUrl: String
    verifiedUserName: String
    relationshipState: String
    mutualFriendsCount: Int
    # highllights:
    AboutMe: String
    personalDetailSharing: String
  }

  type GameTitles {
    TrophyTitles: [TrophyTitle]
    titleItemCount: Int
  }

  type TrophyTitle {
    npServiceName: String
    npCommunicationId: String
    trophySetVersion: String
    trophyTitleName: String
    trophyTitleDetail: String
    trophyTitleIconUrl: String
    trophyTitlePlatform: String
    hasTrophyGroups: Boolean
    definedTrophies: TrophyCounts
    progress: Int
    earnedTrophies: TrophyCounts
    hiddenFlag: Boolean
    lastUpdatedDateTime: String
  }

  type TrophyCounts {
    bronze: Int
    silver: Int
    gold: Int
    platinum: Boolean
  }

  type Presence {
    availability: String
    lastAvailableDate: String
    primaryPlatformInfo: PrimaryPlatformInfo
    lastOnlineDate: String
    onlineStatus: String
    gameTitleInfoList: GameTitleInfoList
  }

  type PrimaryPlatformInfo {
    onlineStatus: String
    platform: String
    lastOnlineDate: String
  }

  type GameTitleInfoList {
    npTitleId: String
    titleName: String
    format: String
    launchPlatform: String
    conceptIconUrl: String
  }
`
