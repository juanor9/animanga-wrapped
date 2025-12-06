# Wrapped Data System Architecture

## Overview

The Wrapped Data System processes AniList activity data to generate personalized "year in review" statistics for users. This document describes the architecture, data flow, and key algorithms used in the system.

---

## System Architecture

### High-Level Flow

```
User Registration → AniList OAuth → Fetch Lists → Store in MongoDB
                                                        ↓
User Visits /wrapped → Check Wrapped DB → [Not Found] → Process Lists → Generate Stats → Save to DB
                                        → [Found] → Return Cached Data
```

### Key Components

1. **Registration System** (`src/app/[locale]/features/registration/`)
   - Handles user sign-up and AniList OAuth
   - Fetches and stores anime/manga lists in MongoDB

2. **Wrapped API** (`src/app/api/wrapped/route.js`)
   - GET: Retrieves or generates wrapped data on-demand
   - POST: Updates user progress through slides

3. **Wrapped Data Processor** (`src/app/lib/wrappedDataProcessor.js`)
   - Core algorithm for calculating statistics
   - Handles episode counting, time calculations, aggregations

4. **Wrapped Progress Model** (`src/app/api/models/WrappedProgress.js`)
   - MongoDB schema for storing generated wrapped data
   - Caches results to avoid regeneration

---

## Data Processing Algorithm

### Episode Counting Logic

**Critical Fix**: AniList's `progress` field can be:

- `"9"` → User watched **episode 9** = **1 episode**
- `"116 - 120"` → User watched episodes 116-120 = **5 episodes** (120 - 116 + 1)
- `null` → No progress recorded = **0 episodes**

#### Implementation

```javascript
function parseEpisodesWatched(progress) {
  if (!progress) return 0;

  const progressStr = String(progress).trim();

  // Range: "116 - 120" → 5 episodes
  if (progressStr.includes(' - ')) {
    const [start, end] = progressStr.split(' - ').map((s) => parseInt(s, 10));
    return end - start + 1;
  }

  // Single: "9" → 1 episode (NOT 9 episodes!)
  return isNaN(parseInt(progressStr, 10)) ? 0 : 1;
}
```

### Minutes Watched Calculation

**Formula**: `minutes = episodesWatched × episodeDuration`

- Only **anime** has `duration` (e.g., 23 minutes per episode)
- **Manga** has `duration: null` → skip from time calculations
- Final result: Total minutes watched across all anime

### Aggregations

The processor generates:

1. **Time Statistics**
   - Total minutes watched
   - Total episodes watched
   - Minutes per series/genre/format/studio

2. **Top Series** (by minutes watched)
   - Top 5 series
   - Episode count per series
   - Cover images and metadata

3. **Genre Breakdown**
   - Minutes per genre
   - Sorted by time spent

4. **Monthly Highlights**
   - Top series per month
   - Used for timeline visualization

5. **Club Assignment**
   - Based on viewing patterns (marathoner, explorer, collector, etc.)

---

## Database Schema

### Collections

#### `users`

```javascript
{
  anilistId: Number,
  anilistUsername: String,
  email: String,
  lists: Array,  // Raw AniList activity data
  createdAt: Date
}
```

#### `wrappedprogresses`

```javascript
{
  userId: ObjectId,          // Reference to users
  anilistId: Number,
  year: Number,
  status: String,            // "not_started" | "in_progress" | "completed"
  lastSlideIndex: Number,
  wrappedData: {
    totalMinutesWatched: Number,
    totalEpisodesWatched: Number,
    totalSeries: Number,
    topAnimeByMinutes: Object,
    topSeries: Array,
    genresBreakdown: Array,
    formatsBreakdown: Array,
    monthlyHighlights: Array,
    club: Object
  },
  createdAt: Date,
  updatedAt: Date
}
```

**Index**: `{ anilistId, year }` (unique)

---

## API Endpoints

### GET `/api/wrapped`

**Query Parameters**:

- `anilistId` (required): User's AniList ID
- `year` (optional): Year to fetch (defaults to current year)

**Response**:

```javascript
{
  wrappedData: {
    totalMinutesWatched: 16295,
    totalEpisodesWatched: 683,
    totalSeries: 33,
    // ... rest of stats
  },
  status: "not_started",
  lastSlideIndex: 0
}
```

**Flow**:

1. Check if wrapped data exists in DB
2. If NOT found → fetch user lists → process → save → return
3. If found → return cached data

### POST `/api/wrapped`

**Body**:

```javascript
{
  anilistId: Number,
  year: Number,
  status: String,            // "in_progress" | "completed"
  lastSlideIndex: Number
}
```

**Purpose**: Update user's progress through wrapped slides.

---

## Performance Optimizations

### 1. On-Demand Generation

- Wrapped data is NOT generated during registration
- Generated only when user first visits `/wrapped`
- Reduces registration time significantly

### 2. Caching

- Results stored in MongoDB with unique index `{ anilistId, year }`
- Subsequent /wrapped visits read from cache
- No re-processing unless manually cleared

### 3. Data Filtering

- Only process activities from the target year
- Skip manga (no duration data)
- Skip activities with invalid progress

---

## Common Issues & Solutions

### Issue: Episode Count Too High

**Symptom**: User sees 15,000+ episodes when they only watched 600

**Cause**: Treating progress strings as episode counts

- Wrong: `"9"` counted as 9 episodes
- Wrong: `"116 - 120"` counted as 120 episodes

**Solution**: Use `parseEpisodesWatched()` helper function

### Issue: Minutes Watched = NaN

**Symptom**: Database shows `minutesWatched: NaN`

**Causes**:

1. `progress` is a string, not parsed
2. `duration` is null (manga)
3. Missing validation before multiplication

**Solution**:

- Parse progress correctly
- Skip entries with `duration === 0`
- Validate result: `isNaN(minutes) || !isFinite(minutes)`

### Issue: Mongoose "next is not a function"

**Symptom**: Error in pre-save hook

**Cause**: Mongoose 6+ requires async/await, not callbacks

**Solution**:

```javascript
// Wrong
WrappedProgressSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Correct
WrappedProgressSchema.pre('save', async function () {
  this.updatedAt = Date.now();
});
```

---

## Testing

### Unit Tests

Test `parseEpisodesWatched()`:

```javascript
expect(parseEpisodesWatched('9')).toBe(1);
expect(parseEpisodesWatched('116 - 120')).toBe(5);
expect(parseEpisodesWatched(null)).toBe(0);
```

### Integration Tests

1. Register user with test AniList account
2. Visit `/wrapped`
3. Verify correct stats in response
4. Check MongoDB for saved wrapped data

### Manual Verification

Compare with AniList manually:

- Count actual episodes watched
- Multiply by episode duration
- Verify the math matches wrapped totals

---

## Mobile Responsive Design

### Issue: Text Overflow on iPhone

**Problem**: Font sizes designed for 1080x1920 story format overflow on mobile

**Solution**: CSS media queries with responsive breakpoints

```scss
@mixin big-number {
  font-size: 128px; // Desktop

  @media (max-width: 768px) {
    font-size: min(20vw, 80px); // Tablet
  }

  @media (max-width: 480px) {
    font-size: min(18vw, 64px); // Mobile
  }
}
```

Applied to all text elements in wrapped slides.

---

## Future Improvements

1. **Background Processing**: Generate wrapped data in background job after registration
2. **Multiple Years**: Support viewing wrapped data from previous years
3. **Manga Time Estimation**: Calculate approximate reading time for manga chapters
4. **Social Sharing**: Pre-render images for social media sharing
5. **Comparison**: Allow users to compare their stats with friends

---

## References

- AniList GraphQL API: https://anilist.gitbook.io/anilist-apiv2-docs/
- MongoDB Documentation: https://docs.mongodb.com/
- Next.js App Router: https://nextjs.org/docs/app
