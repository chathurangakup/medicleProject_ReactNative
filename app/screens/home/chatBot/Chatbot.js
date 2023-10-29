import React, {useEffect, useState, useCallback} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Dimensions,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { GiftedChat } from 'react-native-gifted-chat';
import IconArrow from 'react-native-vector-icons/AntDesign';
import Spinner from 'react-native-loading-spinner-overlay';

import {AppBar} from '../../../components/AppBar';
import {colors} from '../../../config/styles';
import Images from '../../../config/Images';
import {isChatbotComplete,updateChatWithUserDataArray,identifiedUserExercises,updateUserChat,setLegOrHanddata} from './ChatBotSlice'

const {width, height} = Dimensions.get('window');


const Chatbot = props => {
  const {isCompleteChatbot,userShouldDoExercises} = useSelector((state) => state.chatbot)
  const {chatWithUserDataArray} = useSelector((state) => (state.common))
  const dispatch = useDispatch()

  const [currentQuectionIndex, setCurrentQuectionIndex] = useState(0);
  const [correctOption, setCorrectOption] = useState(null);
  const [showNextButton, setShowNextButton] = useState(false);
  const [currentOptionSelected, setCurrentOptionSelected] = useState("Hello");

  const [quection, setQuection] = useState('Hello')
  const [ansdisc, setAnsdisc] = useState('')
  const [ansList, setAnsList] = useState([])
  const [loaderShow, setLoaderShow] = useState(false);
   
  const [quections, setQuections] = useState([]);

  const [messages, setMessages] = useState([])


  const apiRequest =async() =>{
    setLoaderShow(true)
    try {
      const response= await fetch('http://13.48.59.193:5005/webhooks/rest/webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "sender": "user",
          "message": currentOptionSelected
        })
      });
      const jsonText = await response.json();
       console.log(jsonText) 
    //  let text= "Hi! How may I help you? Are you facing any of these problems: Upper Limb | Lower Limb"
    if(jsonText.length==1){

      let devideTextColan= jsonText[0]?.text?.split(':');
      var answerDisc=devideTextColan[0]
      var answerList= devideTextColan[1].split('|')
      console.log("answerList[0]",answerList[0])
      if (answerList[0].indexOf('Yes') > -1) {
        var ret = answerList[0].replace('Yes','');
        answerDisc = answerDisc + ret
        answerList =[]
        answerList.push('Yes')
        answerList.push('No')
      } 
      let quectionAndAnsObj={
        id:quections?.length,
        quection: quection,
        ansdisc: answerDisc,
        ansList: answerList,
      }
      setQuection(quection)
      setAnsList(answerList)
      setQuections(quections => [...quections,quectionAndAnsObj] );
      if(currentOptionSelected!="Hello"){
        setCurrentQuectionIndex(currentQuectionIndex+1)
      }
      console.log("quections", quections)
      console.log(answerList)
    }else{
      console.log("vgvgvgv",jsonText[0]?.text)
      dispatch(identifiedUserExercises(jsonText[0]?.text))
      dispatch(isChatbotComplete(true))
      dispatch(updateUserChat(quections))
      props.navigation.navigate('bottomTabs')
    }
    setLoaderShow(false)
    }catch(e){
    console.log(e)
    setLoaderShow(false)
    }
    
  }



  useEffect(() => {
   
    if(quections?.length==0){
      apiRequest()
    }

  }, [])


  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    )
  }, [])

  const handleNext=()=>{
    // if(quections.length==currentQuectionIndex){

    // }
  
    apiRequest()
    setShowNextButton(false);
   // dispatch(isChatbotComplete(true))
    //props.navigation.navigate('bottomTabs')
  }

  const renderNextButton = () => {
    if (showNextButton) {
      return (
        <View style={styles.nextBtnRoot}>
          <View styles={styles.nxtBtnMain}>
            <TouchableOpacity
              style={styles.nextBtnStyles}
              onPress={() => handleNext()}>
              <Text style={styles.nextBtnTextStyles}>NEXT</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return null;
    }
  };

  const validateAns = selectOption => {

    setCurrentOptionSelected(selectOption);
    setQuection(selectOption)
    // clearInterval(intervalId);
     setShowNextButton(true);
     if(selectOption==" Upper Limb "){
      dispatch(setLegOrHanddata('Leg'))
     }
     if(selectOption==" Lower Limb"){
      dispatch(setLegOrHanddata('Hand'))
     }
  
  };

  const renderOptions = () => {
    return (
      <ScrollView>
        { renderQuections()}
        {quections[currentQuectionIndex]?.ansList.map((option, index) => (
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 5}}>
              <TouchableOpacity
                onPress={() => validateAns(option)}
                key={option}
                style={[
                  styles.ansButton,
                  {
                    borderColor:
                    option == currentOptionSelected
                        ? colors.red
                        : colors.primaryColor1,
                  },
                ]}>
                <View style={styles.renderOptMain}>
                  <Text
                    style={[
                      styles.renderOptMainFont,
                      {
                        color:
                        option == currentOptionSelected
                            ? colors.white
                            : colors.blackColor,
                      },
                    ]}>
                    {option}
                  </Text>
                </View>

            
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    );
  };


  const clickBack=()=>{
    if(currentOptionSelected!="Hello"){
      setCurrentQuectionIndex(currentQuectionIndex+1)
    }
  }

  const renderQuections = () => {
    return (
      <View style={{}}>
        <Text
          style={{
            color: colors.blackColor,
            fontSize: 15,
            borderWidth: 1,
            borderColor: colors.blackColor,
            width: width / 1.5,
            padding: 5,
          }}>
          {quections[currentQuectionIndex]?.ansdisc == ''
            ? ''
            : currentQuectionIndex +
              1 +
              '. ' +
              quections[currentQuectionIndex]?.ansdisc}
        </Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <AppBar title={'Chat Bot'} navigation={props.navigation}  isShowBurger={false} isShowProfile={false}/>
      <ScrollView style={{height: '100%', paddingTop: height / 10}}>
      {/* {currentOptionSelected!="Hello"?
      <TouchableOpacity onPress={() => clickBack()} style={{padding: 20}}>
              <IconArrow name="arrowleft" size={30} color={colors.blackColor} />
            </TouchableOpacity>:null} */}
      
        <View style={{flexDirection: 'row'}}>
        
          <View style={{flex: 1, paddingLeft: 20}}>
            <Image source={Images.CHATBOT} style={{width: 40}}></Image>
          </View>

          <View style={{flex: 5}}>
            <Text
              style={{
                color: colors.blackColor,
                borderWidth: 1,
                borderColor: colors.blackColor,
                width: width / 3,
                marginBottom: 20,
                marginTop: 10,
                padding: 5,
              }}>
             {quections[currentQuectionIndex]?.quection == ''
            ? ''
            : currentQuectionIndex +
              1 +
              '. ' +
              quections[currentQuectionIndex]?.quection}
            </Text>
          </View>
        </View>
        

        <View style={{flexDirection: 'row', marginTop: 50}}>
        
          <View style={{flex: 5, paddingLeft: 20}}>
          {quections?.length==0?  <Text>No data</Text>: renderOptions()}
          </View>
          <View style={{flex: 1, justifyContent:'center'}}>
            <Image source={Images.CHATBOT_USER} style={{width: 50}}></Image>
          </View>
        </View>
        {/* <View style={{margin: 30}}>{renderNextButton()}</View> */}
       
        {/* <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
    /> */}

{showNextButton?<View style={{margin: 30}}>{renderNextButton()}</View> :null}


      </ScrollView>
      <Spinner visible={loaderShow} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    width: width,
    height: width / 2,
  },
  ansButton: {
    borderWidth: 3,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 0,
    backgroundColor: colors.ansBtnColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  nextBtnStyles: {
    marginTop: 20,
    width: '100%',
    backgroundColor: colors.bgColor,
    padding: 10,
    borderRadius: 35,
  },
  nextBtnTextStyles: {
    fontSize: 20,
    color: colors.white,
    textAlign: 'center',
    paddingLeft: width / 6,
    paddingRight: width / 6,
  },
  nextBtnRoot: {
    // height: 85,
    // flex: 6,
   
    bottom: 20,
    borderColor: '#555555',
    borderWidth: 0,
    borderRadius: 0,
    // marginTop: 200,
    justifyContent: 'space-between',
  },
  nxtBtnMain: {
    paddingLeft: 100,
  },
});

export default Chatbot;
