export type StackParamList = {
  Home: undefined; // Якщо екран не приймає параметрів
  Login: undefined;
  Registration: { userEmail: string };
  CreatePost: undefined; // Якщо екран приймає параметри
  Posts: undefined;
  Map: { coords: object };
  Comments: { post: object };
  Profile: { user: object };
};

export interface UserData {
  uid: string | null;
  email: string | null;
  displayName?: string | null;
  profilePhoto?: string | null;
  isAuth: boolean;
  isLoading: boolean;
  error: any;
}
