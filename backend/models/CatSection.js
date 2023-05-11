import mongoose from 'mongoose';

const CatSectionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model('CatSection', CatSectionSchema);
