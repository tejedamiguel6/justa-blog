export const resolvers = {
  Query: {
    users: async (parent, { accountId }, { dataSources }, info) => {
      return dataSources.PlaystationAPI.getUserByProfileName(accountId)
    },

    userByID: async (parent, { accountId }, { dataSources }) => {
      return dataSources.PlaystationAPI.getUserByProfileID(accountId)
    },

    recentlyPlayedGames: async (parent, args, { dataSources }, info) => {
      return dataSources.PlaystationAPI.getRecentlyPlayedGames()
    },

    presence: async (parent, { accountId }, { dataSources }, info) => {
      return dataSources.PlaystationAPI.getBasicPresence(accountId)
    },
    gameTitleTrophy: async (parent, { gameTitleId }, { dataSources }, info) => {
      return dataSources.PlaystationAPI.getTrophyTitle('PPSA01473_00')
    },
  },
}
