import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import Activity from '../models/activity.js';
import Leaderboard from '../models/leaderboard.js';
import Team from '../models/team.js';
import User from '../models/user.js';
import Workout from '../models/workout.js';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await connectDatabase();

    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await Leaderboard.deleteMany({});
    await Workout.deleteMany({});

    const users = await User.insertMany([
      { name: 'Mona Patel', email: 'mona@example.com', fitnessLevel: 'Advanced', streak: 18 },
      { name: 'Alex Chen', email: 'alex@example.com', fitnessLevel: 'Intermediate', streak: 12 },
      { name: 'Priya Singh', email: 'priya@example.com', fitnessLevel: 'Beginner', streak: 9 },
    ]);

    const teamOne = await Team.insertMany([
      {
        name: 'Trail Blazers',
        description: 'Endurance-focused teammates',
        members: [users[0]._id, users[1]._id],
        totalPoints: 980,
      },
      {
        name: 'Sunrise Squad',
        description: 'Strength and mobility specialists',
        members: [users[2]._id],
        totalPoints: 840,
      },
    ]);

    await Activity.insertMany([
      {
        user: users[0]._id,
        type: 'Run',
        durationMinutes: 42,
        caloriesBurned: 520,
        distanceKm: 6.8,
      },
      {
        user: users[1]._id,
        type: 'Cycling',
        durationMinutes: 35,
        caloriesBurned: 410,
        distanceKm: 12.4,
      },
      {
        user: users[2]._id,
        type: 'Yoga',
        durationMinutes: 28,
        caloriesBurned: 180,
      },
    ]);

    await Leaderboard.insertMany([
      { user: users[0]._id, team: teamOne[0]._id, score: 980, rank: 1, period: 'weekly' },
      { user: users[1]._id, team: teamOne[0]._id, score: 900, rank: 2, period: 'weekly' },
      { user: users[2]._id, team: teamOne[1]._id, score: 810, rank: 3, period: 'weekly' },
    ]);

    await Workout.insertMany([
      {
        name: 'HIIT Burn',
        focusArea: 'Cardio',
        durationMinutes: 30,
        difficulty: 'Hard',
        equipment: ['Jump rope', 'Mat'],
        notes: 'Alternating sprint blocks with recovery intervals.',
      },
      {
        name: 'Core Stability',
        focusArea: 'Core',
        durationMinutes: 20,
        difficulty: 'Medium',
        equipment: ['Mat'],
        notes: 'Planks and unilateral loading for control.',
      },
      {
        name: 'Mobility Flow',
        focusArea: 'Recovery',
        durationMinutes: 18,
        difficulty: 'Easy',
        equipment: ['Foam roller'],
        notes: 'Gentle lengthening and balance work.',
      },
    ]);

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
