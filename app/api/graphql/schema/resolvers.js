export const resolvers = {
  Query: {
    userByID: async (parent, { accountId }, { dataSources }) => {
      const test = await dataSources.PlaystationAPI.getUserByProfileID(
        accountId
      )

      return test
    },
  },
}
