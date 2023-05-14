import mongoose from 'mongoose';

//Histoire de l'ajeet Nationale
const PostAjeetNtleSchema = new mongoose.Schema(
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
    cat: { type: mongoose.Schema.Types.ObjectId, ref: 'CatNational' },
    // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

export default mongoose.model('PostAjeetNtle', PostAjeetNtleSchema);
