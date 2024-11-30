export interface UserData {
  uid: string;
  email: string;
  displayName?: string;
  profilePhoto?: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
  displayName?: string;
  profilePhoto?: { imageFile: Blob; fileName: string };
}
