import { gql } from 'apollo-boost';

export const LOGIN = gql`
  mutation login($credentials: AuthorizeInput) {
    authorize(credentials: $credentials) {
      accessToken
    }
  }
`;

export const NEW_REVIEW = gql`
  mutation createReview($repoOwner: String!, 
                        $repoName: String!, 
                        $rating: Int!,
                        $review: String) {
    createReview(review: {
      repositoryName: $repoName,
      ownerName: $repoOwner,
      rating: $rating,
      text: $review
    }) {
      id
    }
  }
`;

export const SIGN_UP = gql`
  mutation createUser($user: CreateUserInput) {
    createUser(user: $user) {
      id
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation deleteReview($id: ID!) {
    deleteReview(id: $id) 
  }
`;