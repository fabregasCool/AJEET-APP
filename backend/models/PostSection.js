import mongoose from 'mongoose';

//Represente le Post(Introduction,dev image de la section)
const PostSectionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
    },
    img: {
      type: String,
    },
    cat: { type: mongoose.Schema.Types.ObjectId, ref: 'CatSection' },

    // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

export default mongoose.model('PostSection', PostSectionSchema);
