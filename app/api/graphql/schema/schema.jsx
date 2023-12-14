import { gql } from 'graphql-tag'

export const typeDefs = gql`
  type Query {
    # get any playerInfo
    users(accountId: String): LegacyUser
    user(accountId: String!): User
    userByID(accountId: String!): User
    # query game title by users
    userGameTitle(accountId: String!): [TrophyTitle]
    # retrieves presence of the player such as online, lastAvailableDate
    presence(accountId: String!): Presence
    recentlyPlayedGames(accountId: String): [RecentlyPlayedGame]
    # get trphy from game title
    gameTitleTrophy(gameTitleId: String): [Trophies]
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

  type LegacyUser {
    onlineId: String
    accountId: String
    npId: String
    avatarUrls: [AvatarUrl]
    plus: Int
    personalDetail: PersonalDetail
    aboutMe: String
    languagesUsed: String
    trophySummary: TrophySummary
    isOfficiallyVerified: Boolean
    personalDetailSharing: String
    personalDetailSharingRequestMessageFlag: Boolean
    primaryOnlineStatus: String
    presences: [Presences]
    friendRelation: Boolean
    requestMessageFlag: Boolean
    blocking: Boolean
    following: Boolean
    # consoleAvailability:
  }

  type PersonalDetail {
    firstName: String
    lastName: String
    profilePictureUrls: [ProfilePictureUrls]
  }

  type ProfilePictureUrls {
    size: String
    profilePictureUrl: String
  }

  # type Profile {
  #   onlineId: String
  #   accountId: String
  #   presences: [Presences]
  #   npId: String
  #   plus: Int
  #   aboutMe: String
  #   trophySummary: TrophySummary
  #   isOfficiallyVerified: Boolean
  #   personalDetailSharing: String
  # }

  type AvatarUrl {
    size: String
    avatarUrl: String
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

  # GAME TITLE TROPHY
  type Trophies {
    trophySetVersion: String
    hasTrophyGroups: Boolean
    trophies: [TitleThinTrophy]
    totalItemCount: Int
    nextOffset: Int
    previousOffset: Int
  }

  type TitleThinTrophy {
    trophyId: Int
    trophyHidden: Int
    trophyType: String
    trophyName: String
    trohpyDetail: String
    trophyIconUrl: String
    trophyGroupId: String
  }

  type TrophyCounts {
    bronze: Int
    silver: Int
    gold: Int
    platimnums: Boolean
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
    platform: String
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
