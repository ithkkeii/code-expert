import { createAsyncThunk, createSlice, Dispatch } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import userService, { SignInInfo } from '@/src/services/user-service';

interface Profile {
  id: string;
  name: string;
  email: string;
}

export interface AuthState {
  profile: Profile | null;
  loading: 'idle' | 'pending';
  error: string | null;
}

const initialState: AuthState = {
  profile: null,
  loading: 'idle',
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLoading: (state) => {},
    userReceived: (state, action) => {},
    extraReducers: (builder) => {},
  },
});

export const { userLoading, userReceived } = userSlice.actions;

const userReducer = userSlice.reducer;
export default userReducer;
