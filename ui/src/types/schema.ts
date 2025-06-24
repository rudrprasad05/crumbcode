export type LoginResponse = {
    username: string;
    id: string;
    email: string;
    token: string;
};

export type NewSharedUserReques = {
    userId: string;
    shareId: string;
};
