import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LoginState {
    isLogin: boolean
}

const initialState: LoginState = {
  isLogin: false,
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    changeIsLogin: (state, action: PayloadAction<boolean> ) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.isLogin =  action.payload
    },

 
  },
})

// Action creators are generated for each case reducer function
export const { changeIsLogin } = loginSlice.actions

export default loginSlice.reducer