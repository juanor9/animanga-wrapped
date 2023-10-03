/* eslint-disable no-await-in-loop */
import { GET_VIEWER, GET_ANIME_LIST } from './queries';
import getClient from './client';

export async function getViewer(token) {
  try {
    const query = GET_VIEWER;
    const { data } = await getClient(token).query({ query });
    return data;
  } catch (error) {
    throw new Error('Error fetching viewer data:', error);
  }
}
function sleep(ms) {
  return new Promise((resolve) => { setTimeout(resolve, ms); });
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

    for (let i = 2; i < lastPage; i + 1) {
      const newVariables = {
        userId,
        page: i,
        perPage: 50,
      };
      const newData = await getClient().query({
        query,
        variables: newVariables,
      });
      if (!newData.data.Page.pageInfo.hasNextPage) {
        break; // Sale del bucle
      }
      allData.push(newData.data.Page.activities);
      if (i % 5 === 0) {
        await sleep(60000);
      } else {
        await sleep(1000);
      }
    }
    const allActivities = allData.flat();
    return allActivities;
  } catch (error) {
    console.error('Error fetching anime list:', error);
    throw error;
  }
}
