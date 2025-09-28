import mongoose, { Document, Schema } from 'mongoose';

export interface IScore extends Document {
  userId: mongoose.Types.ObjectId;
  points: number;
  updatedAt: Date;
}

const ScoreSchema = new Schema<IScore>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true // One score per user
  },
  points: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
ScoreSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export const Score = mongoose.model<IScore>('Score', ScoreSchema);
