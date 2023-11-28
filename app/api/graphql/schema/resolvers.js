export const resolvers = {
  Query: {
    users: (parent, { accountId }, { dataSources }, info) => {
      return dataSources.PlaystationAPI.getUserByProfileName(accountId)
    },

    userByID: async (parent, { accountId }, { dataSources }) => {
      return dataSources.PlaystationAPI.getUserByProfileID(accountId)
    },

    testingServerComponents: async (parent, args, ctx, info) => {
      return 'this is a test'
    },

    recentlyPlayedGames: async (parent, args, { dataSources }, infor) => {
      return dataSources.PlaystationAPI.getRecentlyPlayedGames()
    },
  },
}
