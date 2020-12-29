import { gql } from 'apollo-boost';

export const LOGIN = gql`
  mutation login($credentials: AuthorizeInput) {
    authorize(credentials: $credentials) {
      accessToken
    }
  }
`;