import { Schema, model } from 'mongoose';

const workoutSchema = new Schema(
  {
    name: { type: String, required: true },
    focusArea: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      default: 'Medium',
    },
    equipment: [String],
    notes: String,
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export default model('Workout', workoutSchema);
