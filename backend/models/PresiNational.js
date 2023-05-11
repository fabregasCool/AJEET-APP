import mongoose from 'mongoose';

const PresiNationalSchema = new mongoose.Schema(
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
    cat: { type: mongoose.Schema.Types.ObjectId, ref: 'CatNational' }, //Le Président appartient à une section
  },
  { timestamps: true }
);

export default mongoose.model('PresiNational', PresiNationalSchema);
