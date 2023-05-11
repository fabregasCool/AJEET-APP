import mongoose from 'mongoose';

const PresiSectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    cat: { type: mongoose.Schema.Types.ObjectId, ref: 'CatSection' }, //Le Président appartient à une section
  },
  { timestamps: true }
);

export default mongoose.model('PresiSection', PresiSectionSchema);
