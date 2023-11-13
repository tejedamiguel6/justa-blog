import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { ApolloServer } from '@apollo/server'
import { NextRequest } from 'next/server'

import { typeDefs } from './schema/schema'
import { resolvers } from './schema/resolvers'

// datasources
import { PlaystationAPI } from './datasources/playstationAPI'

interface ContextValue {
  dataSources: {
    PlaystationAPI: PlaystationAPI
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  // will need context when setting up
  // spotify api
  // @ts-ignore
})

// Typescript: req has the type NextRequest
const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => {
    return {
      req,
      dataSources: {
        PlaystationAPI: new PlaystationAPI(),
      },
    }
  },
  // context: async ({ req }) => {
  //   return {

  //     dataSources: {
  //       PlaystationAPI: new PlaystationAPI(),
  //     },
  //   }
  // },
})

export { handler as GET, handler as POST }
