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

export const GET_LIST = gql`
query ($page: Int, $perPage: Int, $userId: Int) {

Page(page: $page, perPage: $perPage) {
  pageInfo {
    total
    currentPage
    lastPage
    hasNextPage
    perPage
  }
  activities(userId: $userId, type:MEDIA_LIST, createdAt_greater: 1672531200, createdAt_lesser: 1704067199, sort: ID_DESC) {
    ... on ListActivity {
      createdAt
      type
      progress
      status
      media {
        title {
          userPreferred
        }
        id
        duration
        genres
        tags {
          id
          name
        }
        studios(isMain: true) {
          nodes {
            id
            name
            isAnimationStudio
          }
        }
        staff {
          nodes {
            id
            primaryOccupations
            gender
            name {
              first
              middle
              last
              full
              native
              userPreferred
            }
            
          }
        }
      }
    }
  }
}
}
`