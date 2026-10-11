import mongoose from 'mongoose';

const mongoURI = 'mongodb://localhost:27017/octofit_tracker'; // Replace with your MongoDB connection string

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    }
};

export default connectDB;