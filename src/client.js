import {ApolloClient, InMemoryCache} from '@apollo/client'

const cache = new InMemoryCache()

const client = new ApolloClient({
  uri: 'https://axieinfinity.com/graphql-server-v2/graphql',
  // uri: 'https://rickandmortyapi.com/graphql',
  cache
})

export default client;