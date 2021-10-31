interface User {
  type: string;
  name: string;
  email: string;
}
export interface ProfileProps {
  user: User;
}
