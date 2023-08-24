import { IS_CHATBOT_COMPLETE, IS_LOGIN_COMPLETE } from "../actionTypes/CommonActionTypes";

export const IsLoginComplete = (payload) => ({ 
    type: IS_LOGIN_COMPLETE,
    payload: payload,
})

export const IsChatbotComplete = (payload) => ({ 
    type: IS_CHATBOT_COMPLETE,
    payload: payload,
})