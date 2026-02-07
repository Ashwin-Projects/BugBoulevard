import mongoose, { Document, Schema } from 'mongoose';

export interface IGame extends Document {
  mode: string;
  status: 'waiting' | 'active' | 'finished';
  maxPlayers: number;
  players: mongoose.Types.ObjectId[];
  createdAt: Date;
}

const GameSchema = new Schema<IGame>({
  mode: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    required: true,
    default: 'waiting',
    enum: ['waiting', 'active', 'finished']
  },
  maxPlayers: {
    type: Number,
    required: true,
    default: 2,
    min: 2,
    max: 10
  },
  players: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Game = mongoose.model<IGame>('Game', GameSchema);
