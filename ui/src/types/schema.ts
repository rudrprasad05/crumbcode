export type LoginResponse = {
  username: string;
  id: string;
  email: string;
  token: string;
  role: "Admin" | "User";
};

export type NewSharedUserReques = {
  userId: string;
  shareId: string;
};
