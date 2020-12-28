import { gql } from 'apollo-boost';

export const GET_REPOSITORIES = gql` 
  query {
    repositories {
      edges {
        node {
          id
          name
          fullName
          ratingAverage
          reviewCount
          stargazersCount
          forksCount
          description
          language
          ownerAvatarUrl
        }
      }
    }
  }
`;