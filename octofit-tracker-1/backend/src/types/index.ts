export type User = {
    id: string;
    username: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
};

export type Activity = {
    id: string;
    userId: string;
    type: string;
    duration: number; // in minutes
    distance: number; // in kilometers
    date: Date;
};

export type ApiResponse<T> = {
    success: boolean;
    data?: T;
    message?: string;
};

export type AuthRequest = {
    username: string;
    password: string;
};

export type AuthResponse = {
    token: string;
    user: User;
};