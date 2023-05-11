import mongoose from 'mongoose';

const CatNationalSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model('CatNational', CatNationalSchema);
