import { gql } from '@apollo/client';

export const GET_POPULAR_ANIME = gql`
  query {
    Page(perPage: 30, page: 1) {
      media(sort: POPULARITY_DESC, type: ANIME, seasonYear: 2023, isAdult: false) {
        id
        title {
          romaji
          native
        }
        coverImage {
          large
          medium
        }
      }
    }
  }
`;

export const GET_POPULAR_MANGA = gql`
  query {
    Page(page: 1, perPage: 30) {
      media(type: MANGA, startDate_greater: 20230101, startDate_lesser: 20231231, sort: POPULARITY_DESC, isAdult: false) {
        id
        title {
          romaji
          english
          native
        }
        startDate {
          year
          month
          day
        }
        popularity
        coverImage {
          large
        }
        description
        genres
      }
    }
  }
`;

export const GET_VIEWER = gql`
  query {
    Viewer {
      id
      name
      avatar {
        large
      }
    }
  }
`;

export const GET_ANIME_LIST = gql`
  query ($page: Int, $perPage: Int, $userId: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      activities(
        userId: $userId
        type: ANIME_LIST
        createdAt_greater: 1672531200
        createdAt_lesser: 1704067199
        sort: ID_DESC
      ) {
        ... on ListActivity {
          createdAt
          progress
          status
          media {
            title {
              userPreferred
            }
            id
            coverImage {
              extraLarge
              large
              medium
              color
            }
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
                  full
                  userPreferred
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_MANGA_LIST = gql`
  query ($page: Int, $perPage: Int, $userId: Int) {
  Page(page: $page, perPage: $perPage) {
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    activities(userId: $userId, type: MANGA_LIST, createdAt_greater: 1672531200, createdAt_lesser: 1704067199, sort: ID_DESC) {
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
          format
          coverImage {
            extraLarge
            large
            medium
            color
          }
          genres
          tags {
            id
            name
          }
          staff {
            nodes {
              id
              primaryOccupations
              gender
              name {
                full
                userPreferred
              }
            }
          }
        }
      }
    }
  }
}

`;
