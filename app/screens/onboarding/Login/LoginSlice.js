import {createSlice} from '@reduxjs/toolkit'; //next js redux toolkit

const  initialState= {
    isLogged: false,
    userInfo:{}
  }


export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    isLoginComplete: (state,action) => {
        state.isLogged = action.payload
    },
    updateUserInfo: (state,action) => {
      console.log("updateUserInfo111",action.payload)
      state.userInfo = action.payload
  },
  },
});
// case under reducers becomes an action
export const {isLoginComplete,updateUserInfo} = loginSlice.actions;
export default loginSlice.reducer;
