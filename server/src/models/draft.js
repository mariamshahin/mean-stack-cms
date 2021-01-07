import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const draftSchema = new Schema(
  {
    title: {
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
    //   image_url: {
    //     type: String,
    //
    //   },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export default mongoose.model('Draft', draftSchema);
