import {gql} from '@apollo/client'

const AXIE_FIELDS = gql`
  fragment AxieBrief on Axie {
    id
    name
    stage
    class
    breedCount
    image
    title
    battleInfo {
      banned
      __typename
    }
    auction {
      currentPrice
      currentPriceUSD
      __typename
    }
    parts {
      id
      name
      class
      type
      specialGenes
      __typename
    }
    __typename
  }
`

//query for all axies
const ALL_AXIES = gql`
  query GetAxieBriefList($auctionType: AuctionType, $criteria: AxieSearchCriteria, $from: Int, $sort: SortBy, $size: Int, $owner: String) {
    axies(auctionType: $auctionType, criteria: $criteria, from: $from, sort: $sort, size: $size, owner: $owner) {
      total
      results {
        ...AxieBrief
        __typename
      }
      __typename
    }
  }
  ${AXIE_FIELDS}
`

const AXIE_PART = gql`
fragment AxiePart on AxiePart {
  id
  name
  class
  type
  specialGenes
  stage
  __typename
}
`
const AXIE_STATS = gql`
fragment AxieStats on AxieStats {
  hp
  speed
  skill
  morale
  __typename
}
`
const AXIE_DETAIL = gql`
  ${AXIE_PART}
  ${AXIE_STATS}
  fragment AxieDetail on Axie {
    id
    image
    class
    name
    genes
    birthDate
    bodyShape
    sireId
    sireClass
    matronId
    matronClass
    stage
    title
    breedCount
    parts {
      ...AxiePart
      __typename
    }
    auction {
      currentPrice
      currentPriceUSD
      __typename
    }
    stats {
        ...AxieStats
      __typename
    }
    __typename
  }
`

//query for one axie by ID
const ONE_AXIE = gql`
  query GetAxieDetail($axieId: ID!) {
    axie(axieId: $axieId) {
      ...AxieDetail
      __typename
    }
  }
  ${AXIE_DETAIL}
`


export {
  ALL_AXIES,
  ONE_AXIE
}
