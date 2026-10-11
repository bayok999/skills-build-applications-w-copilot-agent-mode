import { Schema, model } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    score: { type: Number, default: 0 },
    rank: { type: Number, default: 1 },
    period: { type: String, default: 'weekly' },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export default model('Leaderboard', leaderboardSchema);
