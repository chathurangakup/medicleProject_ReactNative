import {createSlice} from '@reduxjs/toolkit'; //next js redux toolkit

const  initialState= {
    isCompleteChatbot: false,
    userShouldDoExercises:'',
    userChat:[],
    legOrHand:''
}


export const chatbotSlice = createSlice({
  name: 'chatbot',
  initialState,
  reducers: {
    isChatbotComplete: (state,action) => {
        state.isCompleteChatbot = action.payload;
     },
     identifiedUserExercises: (state,action) => {
      state.userShouldDoExercises = action.payload;
     },
     updateUserChat: (state,action) => {
      state.userChat = action.payload;
     },
     setLegOrHanddata: (state,action) => {
      state.legOrHand = action.payload;
     },
  },
});
// case under reducers becomes an action
export const {isChatbotComplete,identifiedUserExercises,updateUserChat,setLegOrHanddata} = chatbotSlice.actions;
export default chatbotSlice.reducer;
