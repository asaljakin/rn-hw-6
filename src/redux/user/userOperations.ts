import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { addUser, getUser } from "../../firebase/firestore";
import { auth } from "../../firebase/config";

interface AuthCredentials {
  email: string;
  password: string;
}

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (data, thunkAPI) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);

      const { uid } = auth.currentUser;

      // const url =
      //   data.profilePhoto &&
      //   (await uploadPhoto(data.profilePhoto, "avatars", uid));

      await addUser(uid, {
        uid: uid,
        email: data.email || "",
        displayName: data.displayName || "",
      });

      const { email, displayName, photoURL } = auth.currentUser;

      return { uid, email, displayName, photoURL };
    } catch (error) {
      return thunkAPI.rejectWithValue("error.message", error.message);
    }
  }
);

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (data, thunkAPI) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      const { uid } = auth.currentUser;
      const userData = await getUser(uid);

      return userData;
    } catch (error) {
      return thunkAPI.rejectWithValue("error.message", error.message);
    }
  }
);

export const signOutUser = createAsyncThunk(
  "auth/signOut",
  async (_, thunkAPI) => {
    try {
      await signOut(auth);
    } catch (error) {
      return thunkAPI.rejectWithValue("error.message", error.message);
    }
  }
);

export const isLoggedIn = createAsyncThunk(
  "auth/isLoggedIn",
  async (_, thunkAPI) => {
    try {
      await onAuthStateChanged(auth, (user) => {
        console.log("Auth state changed:", user);

        if (user) {
          uid = user.uid;
          email = user.email;
          displayName = user.displayName;
          profilePhoto = user.photoURL;
        }
      });

      if (!email) {
        return thunkAPI.rejectWithValue("error.message", error.message);
      }

      return { displayName, email, profilePhoto, uid };
    } catch (error) {
      return thunkAPI.rejectWithValue("error.message", error.message);
    }
  }
);
