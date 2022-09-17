import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  User: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    addUser: (state, action) => {
      state.User = action.payload;
    },
  },
});

export const { addUser } = userSlice.actions;

export default userSlice.reducer;
