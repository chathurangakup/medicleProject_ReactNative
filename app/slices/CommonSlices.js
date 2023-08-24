import {createSlice} from '@reduxjs/toolkit'; //next js redux toolkit

const  initialState= {
    isLogged: false,
    isCompleteChatbot: false,
    chatWithUserDataArray: []
  }


export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    isLoginComplete: (state,action) => {
        state.isLogged = action.payload
    },
    isChatbotComplete: state => {
       state.isCompleteChatbot = action.payload;
    },
    updateChatWithUserDataArray:(state,action) => {
      state.chatWithUserDataArray = action.payload
  },
  },
});
// case under reducers becomes an action
export const {isLoginComplete, isChatbotComplete,updateChatWithUserDataArray} = commonSlice.actions;
export default commonSlice.reducer;
