// src/app/lib/wrappedDataProcessor.js
/**
 * Service to process AniList activity data and generate Wrapped statistics.
 * Includes the episode‑counting fix: a single progress value like "9"
 * represents ONE episode watched, while a range like "116 - 120"
 * represents the number of episodes in that range.
 */

/** Helper: parse AniList progress strings */
function parseEpisodesWatched(progress) {
  if (!progress) return 0;
  const str = String(progress).trim();
  // Range "start - end"
  if (str.includes(' - ')) {
    const [start, end] = str.split(' - ').map((s) => parseInt(s, 10));
    if (!isNaN(start) && !isNaN(end)) {
      return end - start + 1; // inclusive range
    }
    return 0;
  }
  // Single number – count as ONE episode
  const num = parseInt(str, 10);
  return isNaN(num) ? 0 : 1;
}

/**
 * Main processor – receives a flat array of AniList activity objects.
 * Each activity is expected to contain:
 *   - id, title, coverImage, progress, episodeDuration, format, startDate, studios, updatedAt, genres, etc.
 */
export function processWrappedData(activityList, year) {
  const currentYear = year || new Date().getFullYear();

  // Filter to activities that belong to the target year (completed or updated)
  const filtered = activityList.filter(
    (a) => a.completedYear === currentYear || a.updatedYear === currentYear
  );

  // Aggregation containers
  let totalMinutesWatched = 0;
  let totalEpisodesWatched = 0;
  const genresMap = new Map();
  const formatsMap = new Map();
  const yearsMap = new Map();
  const studiosMap = new Map();
  const monthlyMap = new Map();
  const seriesMap = new Map();

  filtered.forEach((a) => {
    const episodes = parseEpisodesWatched(a.progress);
    const minutes = episodes * (a.episodeDuration || 24); // fallback 24min per episode
    totalMinutesWatched += minutes;
    totalEpisodesWatched += episodes;

    // Store per‑series stats
    seriesMap.set(a.id, {
      id: a.id,
      title: a.title?.romaji || a.title?.english || 'Unknown',
      coverImage: a.coverImage?.large || a.coverImage?.medium || '',
      episodesWatched: episodes,
      minutesWatched: minutes,
      format: a.format || 'TV',
      startYear: a.startDate?.year || 0,
    });

    // Genres aggregation
    if (Array.isArray(a.genres)) {
      a.genres.forEach((g) => {
        genresMap.set(g, (genresMap.get(g) || 0) + minutes);
      });
    }

    // Format aggregation
    if (a.format) {
      formatsMap.set(a.format, (formatsMap.get(a.format) || 0) + minutes);
    }

    // Year aggregation (anime start year)
    if (a.startDate?.year) {
      yearsMap.set(a.startDate.year, (yearsMap.get(a.startDate.year) || 0) + minutes);
    }

    // Studios aggregation
    if (a.studios?.nodes) {
      a.studios.nodes.forEach((s) => {
        if (s.name) {
          studiosMap.set(s.name, (studiosMap.get(s.name) || 0) + minutes);
        }
      });
    }

    // Monthly top‑series (by minutes watched in that month)
    if (a.updatedAt) {
      const month = new Date(a.updatedAt * 1000).getMonth();
      const existing = monthlyMap.get(month);
      if (!existing || existing.minutesWatched < minutes) {
        monthlyMap.set(month, {
          month,
          topSeriesTitle: a.title?.romaji || a.title?.english || 'Unknown',
          topSeriesCover: a.coverImage?.large || a.coverImage?.medium || '',
          minutesWatched: minutes,
        });
      }
    }
  });

  // Transform maps into sorted arrays
  const genresBreakdown = Array.from(genresMap.entries())
    .map(([genre, minutes]) => ({ genre, minutesWatched: minutes }))
    .sort((a, b) => b.minutesWatched - a.minutesWatched);

  const formatsBreakdown = Array.from(formatsMap.entries())
    .map(([format, minutes]) => ({ format, minutesWatched: minutes }))
    .sort((a, b) => b.minutesWatched - a.minutesWatched);

  const yearsBreakdown = Array.from(yearsMap.entries())
    .map(([year, minutes]) => ({ year, minutesWatched: minutes }))
    .sort((a, b) => b.minutesWatched - a.minutesWatched);

  const studiosBreakdown = Array.from(studiosMap.entries())
    .map(([studio, minutes]) => ({ studio, minutesWatched: minutes }))
    .sort((a, b) => b.minutesWatched - a.minutesWatched);

  const monthlyBreakdown = Array.from(monthlyMap.values()).sort((a, b) => a.month - b.month);

  const topSeries = Array.from(seriesMap.values())
    .sort((a, b) => b.minutesWatched - a.minutesWatched)
    .slice(0, 10);

  // Return a single stats object – callers will embed it in WrappedProgress
  return {
    totalMinutesWatched,
    totalEpisodesWatched,
    totalSeries: seriesMap.size,
    genresBreakdown,
    formatsBreakdown,
    yearsBreakdown,
    studiosBreakdown,
    monthlyBreakdown,
    topSeries,
  };
}
