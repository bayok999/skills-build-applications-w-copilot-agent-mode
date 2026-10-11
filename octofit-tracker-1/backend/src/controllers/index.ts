import { Request, Response } from 'express';
import ActivityService from '../services/activityService';
import UserService from '../services/userService';

class ActivityController {
    async getActivities(req: Request, res: Response) {
        try {
            const activities = await ActivityService.getAllActivities();
            res.status(200).json(activities);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving activities', error });
        }
    }

    async createActivity(req: Request, res: Response) {
        try {
            const newActivity = await ActivityService.createActivity(req.body);
            res.status(201).json(newActivity);
        } catch (error) {
            res.status(500).json({ message: 'Error creating activity', error });
        }
    }
}

class UserController {
    async getUserProfile(req: Request, res: Response) {
        try {
            const userId = req.params.id;
            const userProfile = await UserService.getUserById(userId);
            res.status(200).json(userProfile);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving user profile', error });
        }
    }

    async updateUserProfile(req: Request, res: Response) {
        try {
            const userId = req.params.id;
            const updatedProfile = await UserService.updateUser(userId, req.body);
            res.status(200).json(updatedProfile);
        } catch (error) {
            res.status(500).json({ message: 'Error updating user profile', error });
        }
    }
}

export { ActivityController, UserController };