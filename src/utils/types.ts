export type User = {
  id?: string;
  name?: string;
  email?: string;
  image?: string;
  role?: string;
};

export type Login = {
  email: string;
  password: string;
};

export type Register = {
  email: string;
  name: string;
  password: string;
  password_confirm: string;
};
