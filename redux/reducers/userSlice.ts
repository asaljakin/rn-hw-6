import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  uid: string | null;
  email: string | null;
  displayName?: string | null;
  profilePhoto?: string | null;
}

const initialState: UserState = {
  uid: null,
  email: null,
  displayName: null,
  profilePhoto: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo(state, action: PayloadAction<UserState>) {
      const { uid, email, displayName, profilePhoto } = action.payload;
      state.uid = uid;
      state.email = email;
      state.displayName = displayName;
      state.profilePhoto = profilePhoto;
    },
    clearUserInfo(state) {
      state.uid = null;
      state.email = null;
      state.displayName = null;
      state.profilePhoto = null;
    },
  },
});

export const { setUserInfo, clearUserInfo } = userSlice.actions;
export default userSlice.reducer;
