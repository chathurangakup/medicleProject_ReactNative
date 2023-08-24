import React from 'react'
import { View } from 'react-native'
import Splash from './onboarding/Splash'
import { useSelector, useDispatch } from 'react-redux'

import { MainStack, MainStack2, Onboarding } from '../routes/NavigationStack';
import { colors } from '../config/styles';
import type { RootState } from '../store'


const Root = () => {
  const isLogged = useSelector((state: RootState) => state.login.isLogged)
  const isCompleteChatbot = useSelector((state: RootState) => state.chatbot.isCompleteChatbot)

  console.log("isLogged", isLogged)
  console.log("isCompleteChatbot", isCompleteChatbot)
  return (
    <View style={{ flex: 1 }}>
      {isLogged == true && isCompleteChatbot == true ?
        <MainStack2/>
        :
        isLogged == true && isCompleteChatbot == false ?
          <MainStack />
          :
          <Onboarding />

      }



    </View>
  )
}

export default Root
