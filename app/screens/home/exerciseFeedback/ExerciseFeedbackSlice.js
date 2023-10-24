import {createSlice} from '@reduxjs/toolkit'; //next js redux toolkit

const  initialState= {
    userFeedback:[]
}


export const exerciseFeedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {
     updateUserFeedback: (state,action) => {
      state.userFeedback.push(action.payload)
     },
     clearUserFeedback: (state,action) => {
      state.userFeedback = [];
     },
  },
});
// case under reducers becomes an action
export const {updateUserFeedback,clearUserFeedback} = exerciseFeedbackSlice.actions;
export default exerciseFeedbackSlice.reducer;
