const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review can not be empty'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      index: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user.'],
    },
    tour: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tour',
      required: [true, 'Review must belong to a tour.'],
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

// Query Middleware
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name photo',
  });
  // this.populate([
  //   {
  //     path: 'user',
  //     select: 'name photo',
  //   },
  //   {
  //     path: 'tour',
  //     select: 'name',
  //   },
  // ]);
  next();
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
