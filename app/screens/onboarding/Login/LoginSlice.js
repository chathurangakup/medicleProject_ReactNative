import {createSlice} from '@reduxjs/toolkit'; //next js redux toolkit

const  initialState= {
    isLogged: false,
  }


export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    isLoginComplete: (state,action) => {
        state.isLogged = action.payload
    },
  },
});
// case under reducers becomes an action
export const {isLoginComplete} = loginSlice.actions;
export default loginSlice.reducer;
