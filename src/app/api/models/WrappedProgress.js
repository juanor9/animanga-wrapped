import mongoose from 'mongoose';

const WrappedProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  anilistId: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['not_started', 'in_progress', 'completed'],
    default: 'not_started',
  },
  lastSlideIndex: {
    type: Number,
    default: 0,
  },
  completedAt: {
    type: Date,
  },
  wrappedData: {
    totalMinutesWatched: Number,
    totalEpisodesWatched: Number,
    topAnimeByMinutes: {
      id: Number,
      title: String,
      coverImage: String,
      episodesWatched: Number,
      minutesWatched: Number,
    },
    topSeries: [
      {
        id: Number,
        title: String,
        coverImage: String,
        episodesWatched: Number,
        minutesWatched: Number,
        format: String,
      },
    ],
    genresBreakdown: [
      {
        genre: String,
        minutesWatched: Number,
      },
    ],
    formatsBreakdown: [
      {
        format: String,
        minutesWatched: Number,
      },
    ],
    yearsBreakdown: [
      {
        year: Number,
        minutesWatched: Number,
      },
    ],
    studiosBreakdown: [
      {
        studio: String,
        minutesWatched: Number,
      },
    ],
    monthlyHighlights: [
      {
        month: Number,
        topSeriesTitle: String,
        topSeriesCover: String,
        minutesWatched: Number,
      },
    ],
    weightedYear: Number,
    club: {
      id: String,
      name: String,
      description: String,
      role: String,
      roleDescription: String,
      percentage: Number,
      favoriteAnime: [
        {
          title: String,
          coverImage: String,
        },
      ],
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Compound index for efficient queries
WrappedProgressSchema.index({ anilistId: 1, year: 1 }, { unique: true });

// Update timestamp on save
WrappedProgressSchema.pre('save', async function () {
  this.updatedAt = Date.now();
});

export default mongoose.models.WrappedProgress ||
  mongoose.model('WrappedProgress', WrappedProgressSchema);
