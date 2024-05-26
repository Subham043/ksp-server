export const AuthColumn = {
  id: true,
  name: true,
  email: true,
  status: true,
  role: true,
  password: true,
  createdAt: true,
} as const;

export const AuthTokenColumn = {
  id: true,
  token: true,
  createdAt: true,
};
