/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
import {
  GET_VIEWER,
  GET_ANIME_LIST,
  GET_MANGA_LIST,
  GET_POPULAR_ANIME,
  GET_POPULAR_MANGA,
} from './queries';
import getClient from './client';

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function getPopularAnime() {
  try {
    const query = GET_POPULAR_ANIME;
    const { data } = await getClient().query({ query });
    return data;
  } catch (error) {
    throw new Error('Error fetching popular anime data:', error);
  }
}

export async function getPopularManga() {
  try {
    const query = GET_POPULAR_MANGA;
    const { data } = await getClient().query({ query });
    return data;
  } catch (error) {
    throw new Error('Error fetching popular manga data:', error);
  }
}

export async function getViewer(token) {
  try {
    const query = GET_VIEWER;
    const { data } = await getClient(token).query({ query });
    return data;
  } catch (error) {
    throw new Error('Error fetching viewer data:', error);
  }
}

export async function getAnimeList(userId) {
  try {
    const query = GET_ANIME_LIST;
    const initialVariables = {
      userId,
      page: 1,
      perPage: 50,
    };
    const initialData = await getClient().query({
      query,
      variables: initialVariables,
    });

    if (!initialData.data || !initialData.data.Page.pageInfo) {
      throw new Error('Invalid API response');
    }

    const { lastPage } = initialData.data.Page.pageInfo;
    const allData = [initialData.data.Page.activities];

    for (let i = 2; i <= lastPage; i++) {
      const newVariables = {
        userId,
        page: i,
        perPage: 50,
      };
      const newData = await getClient().query({
        query,
        variables: newVariables,
      });
      allData.push(newData.data.Page.activities);
      if (!newData.data.Page.pageInfo.hasNextPage) {
        break; // Sale del bucle
      }
      if (i % 5 === 0) {
        await sleep(60000);
      } else {
        await sleep(1000);
      }
    }
    const allActivities = allData.flat();
    return allActivities;
  } catch (error) {
    throw new Error('Error fetching anime list:', error);
  }
}

export async function getMangaList(userId) {
  try {
    const query = GET_MANGA_LIST;
    const initialVariables = {
      userId,
      page: 1,
      perPage: 50,
    };
    const initialData = await getClient().query({
      query,
      variables: initialVariables,
    });

    if (!initialData.data || !initialData.data.Page.pageInfo) {
      throw new Error('Invalid API response');
    }

    const { lastPage } = initialData.data.Page.pageInfo;
    const allData = [initialData.data.Page.activities];

    for (let i = 2; i < lastPage; i++) {
      const newVariables = {
        userId,
        page: i,
        perPage: 50,
      };
      const newData = await getClient().query({
        query,
        variables: newVariables,
      });
      allData.push(newData.data.Page.activities);
      if (!newData.data.Page.pageInfo.hasNextPage) {
        break; // Sale del bucle
      }
      if (i % 5 === 0) {
        await sleep(60000);
      } else {
        await sleep(1000);
      }
    }
    const allActivities = allData.flat();
    return allActivities;
  } catch (error) {
    throw new Error('Error fetching anime list:', error);
  }
}
