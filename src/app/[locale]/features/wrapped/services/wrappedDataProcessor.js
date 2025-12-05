/**
 * Service to process AniList data and generate Wrapped statistics
 */

const CLUBS = {
  marathon: {
    id: 'marathon',
    name: 'Club Maratón Nocturno',
    description: 'Tu club maratonea series largas y vive pegado a los opening y ending.',
    favoriteAnime: [
      { title: 'One Piece', coverImage: '/placeholder.jpg' },
      { title: 'Naruto', coverImage: '/placeholder.jpg' },
      { title: 'Attack on Titan', coverImage: '/placeholder.jpg' },
    ],
  },
  explorer: {
    id: 'explorer',
    name: 'Club Explorador de Géneros',
    description: 'Nunca te quedas en un solo género. La variedad es tu lema.',
    favoriteAnime: [
      { title: 'Steins;Gate', coverImage: '/placeholder.jpg' },
      { title: 'Your Name', coverImage: '/placeholder.jpg' },
      { title: 'Death Note', coverImage: '/placeholder.jpg' },
    ],
  },
  collector: {
    id: 'collector',
    name: 'Club Coleccionista',
    description: 'Terminas más series que la mayoría. Tu lista está siempre al día.',
    favoriteAnime: [
      { title: 'Fullmetal Alchemist', coverImage: '/placeholder.jpg' },
      { title: 'Code Geass', coverImage: '/placeholder.jpg' },
      { title: 'Hunter x Hunter', coverImage: '/placeholder.jpg' },
    ],
  },
  seasonal: {
    id: 'seasonal',
    name: 'Club Seasonal',
    description: 'Siempre estás al día con lo último. Las temporadas no se te escapan.',
    favoriteAnime: [
      { title: 'Jujutsu Kaisen', coverImage: '/placeholder.jpg' },
      { title: 'Demon Slayer', coverImage: '/placeholder.jpg' },
      { title: 'My Hero Academia', coverImage: '/placeholder.jpg' },
    ],
  },
};

const ROLES = {
  binge_watcher: {
    role: 'Maratonista',
    description: 'Ves muchos episodios seguidos de pocas series.',
  },
  variety_seeker: {
    role: 'Explorador de Géneros',
    description: 'Saltas entre géneros y formatos sin quedarte en tu zona de confort.',
  },
  completionist: {
    role: 'Coleccionista',
    description: 'Guardas todo en tu lista y terminas más series que la mayoría.',
  },
  trend_follower: {
    role: 'Seguidor de Tendencias',
    description: 'Te enfocas en lo nuevo y popular de cada temporada.',
  },
};

/**
 * Determines user's club based on viewing patterns
 */
function determineClub(stats) {
  const { totalSeries, totalEpisodesWatched, genresBreakdown, topSeries } = stats;

  const avgEpisodesPerSeries = totalSeries > 0 ? totalEpisodesWatched / totalSeries : 0;
  const genreCount = genresBreakdown.length;
  const hasLongSeries = topSeries.some((s) => s.episodesWatched > 50);

  if (hasLongSeries && avgEpisodesPerSeries > 30) {
    return {
      ...CLUBS.marathon,
      percentage: 23,
      role: ROLES.binge_watcher.role,
      roleDescription: ROLES.binge_watcher.description,
    };
  }

  if (genreCount >= 8) {
    return {
      ...CLUBS.explorer,
      percentage: 31,
      role: ROLES.variety_seeker.role,
      roleDescription: ROLES.variety_seeker.description,
    };
  }

  const currentYear = new Date().getFullYear();
  const recentSeriesCount = topSeries.filter((s) => s.startYear >= currentYear - 1).length;

  if (recentSeriesCount >= topSeries.length * 0.6) {
    return {
      ...CLUBS.seasonal,
      percentage: 19,
      role: ROLES.trend_follower.role,
      roleDescription: ROLES.trend_follower.description,
    };
  }

  return {
    ...CLUBS.collector,
    percentage: 27,
    role: ROLES.completionist.role,
    roleDescription: ROLES.completionist.description,
  };
}

/**
 * Process raw AniList data into Wrapped statistics
 */
export function processWrappedData(animeList, year) {
  const currentYear = year || new Date().getFullYear();

  const filteredList = animeList.filter((anime) => {
    return anime.completedYear === currentYear || anime.updatedYear === currentYear;
  });

  let totalMinutesWatched = 0;
  let totalEpisodesWatched = 0;
  const genresMap = new Map();
  const formatsMap = new Map();
  const yearsMap = new Map();
  const studiosMap = new Map();
  const monthlyMap = new Map();
  const seriesMap = new Map();

  filteredList.forEach((anime) => {
    const minutes = (anime.progress || 0) * (anime.episodeDuration || 24);
    totalMinutesWatched += minutes;
    totalEpisodesWatched += anime.progress || 0;

    seriesMap.set(anime.id, {
      id: anime.id,
      title: anime.title?.romaji || anime.title?.english || 'Unknown',
      coverImage: anime.coverImage?.large || anime.coverImage?.medium || '',
      episodesWatched: anime.progress || 0,
      minutesWatched: minutes,
      format: anime.format || 'TV',
      startYear: anime.startDate?.year || 0,
    });

    if (anime.genres) {
      anime.genres.forEach((genre) => {
        genresMap.set(genre, (genresMap.get(genre) || 0) + minutes);
      });
    }

    if (anime.format) {
      formatsMap.set(anime.format, (formatsMap.get(anime.format) || 0) + minutes);
    }

    if (anime.startDate?.year) {
      yearsMap.set(anime.startDate.year, (yearsMap.get(anime.startDate.year) || 0) + minutes);
    }

    if (anime.studios?.nodes) {
      anime.studios.nodes.forEach((studio) => {
        if (studio.name) {
          studiosMap.set(studio.name, (studiosMap.get(studio.name) || 0) + minutes);
        }
      });
    }

    if (anime.updatedAt) {
      const month = new Date(anime.updatedAt * 1000).getMonth();
      if (!monthlyMap.has(month) || monthlyMap.get(month).minutes < minutes) {
        monthlyMap.set(month, {
          month,
          topSeriesTitle: anime.title?.romaji || anime.title?.english || 'Unknown',
          topSeriesCover: anime.coverImage?.large || anime.coverImage?.medium || '',
          minutesWatched: minutes,
        });
      }
    }
  });

  const genresBreakdown = Array.from(genresMap.entries())
    .map(([genre, minutes]) => ({
      genre,
      minutesWatched: minutes,
    }))
    .sort((a, b) => b.minutesWatched - a.minutesWatched);

  const formatsBreakdown = Array.from(formatsMap.entries())
    .map(([format, minutes]) => ({
      format,
      minutesWatched: minutes,
    }))
    .sort((a, b) => b.minutesWatched - a.minutesWatched);

  const yearsBreakdown = Array.from(yearsMap.entries())
    .map(([year, minutes]) => ({
      year,
      minutesWatched: minutes,
    }))
    .sort((a, b) => a.year - b.year);

  const studiosBreakdown = Array.from(studiosMap.entries())
    .map(([studio, minutes]) => ({
      studio,
      minutesWatched: minutes,
    }))
    .sort((a, b) => b.minutesWatched - a.minutesWatched)
    .slice(0, 10);

  const topSeries = Array.from(seriesMap.values())
    .sort((a, b) => b.minutesWatched - a.minutesWatched)
    .slice(0, 5);

  const topAnimeByMinutes = topSeries[0] || null;

  const monthlyHighlights = Array.from(monthlyMap.values()).sort((a, b) => a.month - b.month);

  let weightedYear = 0;
  if (totalMinutesWatched > 0) {
    const totalWeightedYears = Array.from(yearsMap.entries()).reduce(
      (sum, [year, minutes]) => sum + year * minutes,
      0
    );
    weightedYear = Math.round(totalWeightedYears / totalMinutesWatched);
  }

  const stats = {
    totalMinutesWatched,
    totalEpisodesWatched,
    totalSeries: seriesMap.size,
    topAnimeByMinutes,
    topSeries,
    genresBreakdown,
    formatsBreakdown,
    yearsBreakdown,
    studiosBreakdown,
    monthlyHighlights,
    weightedYear,
  };

  const club = determineClub(stats);

  return {
    ...stats,
    club,
  };
}

/**
 * Fetch and process user's AniList data for Wrapped
 */
export async function fetchAndProcessWrappedData(anilistUsername, year) {
  const query = `
    query ($userName: String) {
      MediaListCollection(userName: $userName, type: ANIME) {
        lists {
          entries {
            id
            mediaId
            progress
            updatedAt
            completedAt
            media {
              id
              title {
                romaji
                english
              }
              coverImage {
                large
                medium
              }
              format
              episodes
              duration
              genres
              startDate {
                year
                month
                day
              }
              studios {
                nodes {
                  name
                }
              }
            }
          }
        }
      }
    }
  `;

  const variables = {
    userName: anilistUsername,
  };

  const response = await fetch('https://graphql.anilist.co', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch AniList data');
  }

  const data = await response.json();

  const animeList = [];
  if (data.data?.MediaListCollection?.lists) {
    data.data.MediaListCollection.lists.forEach((list) => {
      list.entries.forEach((entry) => {
        const updatedDate = new Date(entry.updatedAt * 1000);
        const completedDate = entry.completedAt ? new Date(entry.completedAt * 1000) : null;

        animeList.push({
          id: entry.media.id,
          mediaId: entry.mediaId,
          progress: entry.progress,
          updatedAt: entry.updatedAt,
          updatedYear: updatedDate.getFullYear(),
          completedAt: entry.completedAt,
          completedYear: completedDate ? completedDate.getFullYear() : null,
          title: entry.media.title,
          coverImage: entry.media.coverImage,
          format: entry.media.format,
          episodes: entry.media.episodes,
          episodeDuration: entry.media.duration,
          genres: entry.media.genres,
          startDate: entry.media.startDate,
          studios: entry.media.studios,
        });
      });
    });
  }

  return processWrappedData(animeList, year);
}
