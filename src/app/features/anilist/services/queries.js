import { gql } from '@apollo/client';

export const GET_POPULAR_ANIME = gql`
  query {
    Page(perPage: 30, page: 1) {
      media(
        sort: POPULARITY_DESC
        type: ANIME
        seasonYear: 2023
        isAdult: false
      ) {
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
      media(
        type: MANGA
        startDate_greater: 20230101
        startDate_lesser: 20231231
        sort: POPULARITY_DESC
        isAdult: false
      ) {
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
          type
          progress
          status
          media {
            title {
              userPreferred
            }
            id
            format
            duration
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
                  first
                  middle
                  last
                  full
                  native
                  userPreferred
                }
              }
            }
            startDate {
              year
              month
              day
            }
            endDate {
              year
              month
              day
            }
            episodes
            chapters
            mediaListEntry {
              score(format: POINT_10)
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
      activities(
        userId: $userId
        type: MANGA_LIST
        createdAt_greater: 1672531200
        createdAt_lesser: 1704067199
        sort: ID_DESC
      ) {
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
            duration
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
                image {
                  large
                  medium
                }
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
            startDate {
              year
              month
              day
            }
            endDate {
              year
              month
              day
            }
            episodes
            chapters
            mediaListEntry {
              score(format: POINT_10)
            }
          }
        }
      }
    }
  }
`;
