import { gql } from '@apollo/client';
import { yearNumber, yearString } from './constants/year';

export const GET_POPULAR_ANIME = gql`
  query {
    Page(perPage: 30, page: 1) {
      media(sort: POPULARITY_DESC, type: ANIME, seasonYear: ${yearString}, isAdult: false) {
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
        startDate_greater: ${yearString}0101
        startDate_lesser: ${yearString}1231
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

const startTimestamp = Math.floor(new Date(`${yearNumber}-01-01T00:00:00Z`).getTime() / 1000);
const endTimestamp = Math.floor(new Date(`${yearNumber}-12-31T23:59:59Z`).getTime() / 1000);

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
        createdAt_greater: ${startTimestamp}
        createdAt_lesser: ${endTimestamp}
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
        createdAt_greater: ${startTimestamp}
        createdAt_lesser: ${endTimestamp}
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
