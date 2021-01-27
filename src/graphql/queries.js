import { gql } from 'apollo-boost';

export const GET_REPOSITORIES = gql` 
  query allRepos($order: AllRepositoriesOrderBy, 
                 $direction: OrderDirection,
                 $search: String!,
                 $first: Int,
                 $after: String) {
    repositories(orderBy: $order, 
                 orderDirection: $direction,
                 searchKeyword: $search,
                 first: $first,
                 after: $after) {
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
          url
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        totalCount
        hasNextPage
      }
    }
  }
`;

export const GET_SINGLE_REPOSITORY = gql`
  query singleRepo($id: ID!,
                   $first: Int,
                   $after: String) {
    repository(id: $id) {
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
      url
      reviews (first: $first, after: $after) { 
        edges { 
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
          cursor
        }
        pageInfo {
          startCursor
          endCursor
          totalCount
          hasNextPage
        }
      }
    }
  }
`;


export const IS_AUTH = gql`
  query user($useReviews: Boolean = false) {
    authorizedUser {
      id
      username
      reviews @include(if: $useReviews) {
        edges {
          node {
            id
            text
            rating
            createdAt
          }
        }
      }
    }
  }
`;