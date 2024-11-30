import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import { setUserInfo, clearUserInfo } from "../redux/reducers/userSlice";
import { AppDispatch } from "../redux/store";
import { addUser, getImageUrl, getUser, uploadImage } from "./firestore";
import { AuthCredentials } from "../types/userDataTypes";

export const registerDB = async ({
  email,
  password,
  displayName,
  profilePhoto,
}: AuthCredentials) => {
  try {
    const credentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = credentials.user;

    let imageUrl = "";
    if (profilePhoto?.imageFile) {
      const imageRef = await uploadImage(
        user.uid,
        profilePhoto?.imageFile,
        profilePhoto?.fileName
      );
      imageUrl = await getImageUrl(imageRef);
    }

    await addUser(user.uid, {
      email: user.email || "",
      uid: user.uid,
      displayName: displayName || "",
      profilePhoto: imageUrl,
    });
  } catch (error) {
    console.log("SIGNUP ERROR:", error);
  }
};

export const loginDB = async (
  { email, password }: AuthCredentials,
  dispatch: AppDispatch
) => {
  try {
    const credentials = await signInWithEmailAndPassword(auth, email, password);
    const user = credentials.user;

    dispatch(
      setUserInfo({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || "Anonymous",
        // profilePhoto: user.profilePhoto || "",
      })
    );
    return user;
  } catch (error) {
    throw error;
  }
};

export const logoutDB = async (dispatch: AppDispatch) => {
  try {
    await signOut(auth);

    dispatch(clearUserInfo());
  } catch (error) {
    console.error("Logout error:", error);
  }
};

export const authStateChanged = (dispatch: AppDispatch) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userData = await getUser(user.uid);

      dispatch(
        setUserInfo({
          ...userData,
          uid: user.uid,
          email: user.email || "",
          // displayName: null
        })
      );
    } else {
      dispatch(clearUserInfo());
    }
  });
};

// export const updateUserProfile = async (update: {
//   displayName?: string;
//   photoURL?: string;
// }) => {
//   const user = auth.currentUser;
//   if (user) {
//     try {
//       await updateProfile(user, update);
//     } catch (error) {
//       throw error;
//     }
//   }
// };
