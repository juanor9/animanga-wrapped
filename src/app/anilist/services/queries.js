import { gql } from "@apollo/client";

export const GET_VIEWER = gql`
  query {
    Viewer {
      id
      name
      avatar{
        large
      }
    }
  }
`;