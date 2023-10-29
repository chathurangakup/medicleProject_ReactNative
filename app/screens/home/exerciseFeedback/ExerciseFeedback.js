import React, {useState, useEffect} from 'react';
import {Text, View, Image, TouchableOpacity, Dimensions, Modal,Pressable,StyleSheet, ScrollView} from 'react-native';
import VideoPlayer from 'react-native-video-player';
import storage from '@react-native-firebase/storage';
import Spinner from 'react-native-loading-spinner-overlay';
import firestore from '@react-native-firebase/firestore';
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment';


import {AppBar} from '../../../components/AppBar';
import Images from '../../../config/Images';
import {colors} from '../../../config/styles';

import {updateUserFeedback,clearUserFeedback} from './ExerciseFeedbackSlice'

const {width, height} = Dimensions.get('screen');


const ExerciseFeedback = ({route, navigation}) => {
  const {correct_squats,exercise_name,incorrect_squats,num_total_squats,time_stamp} = route.params;
  const dispatch = useDispatch();
  const {userFeedback} = useSelector((state) => (state.feedback))
  const [quectionOne, setQuectionOne] =useState('')
  const [loaderShow, setLoaderShow] = useState(false);

  const {legOrHand} = useSelector((state) => state.chatbot)
  const [legOrHandState, setLegOrHand] =useState(String(legOrHand));

  const [q1none, setQ1OnPressNone] =useState(true);
  const [q1sight, setQ1OnPressSight] =useState(true);
  const [q1moderate, setQ1OnPressModerate] =useState(true);
  const [q1serve, setQ1OnPressServe] =useState(true);

  const [q2none, setQ2OnPressNone] =useState(true);
  const [q2sight, setQ2OnPressSight] =useState(true);
  const [q2moderate, setQ2OnPressModerate] =useState(true);
  const [q2serve, setQ2OnPressServe] =useState(true);

  const [q3none, setQ3OnPressNone] =useState(true);
  const [q3sight, setQ3OnPressSight] =useState(true);
  const [q3moderate, setQ3OnPressModerate] =useState(true);
  const [q3serve, setQ3OnPressServe] =useState(true); 

  const [painLevel, setPainLevel] =useState(-1); 

  const [recovery_duration, setRecovery_duration] = useState(0)
  const [pain_level_fromFireB, setPainLevelFromFireB] = useState(0)
  const [sum_correct, setSumCorrict] = useState(0)
  const [sum_incorrect, setSumIncorrect] = useState(0)

  const [q1ans, setQ1Ans] =useState('');
  const [q2ans, setQ2Ans] =useState('');
  const [q3ans, setQ3Ans] =useState('');
  const [q4ans, setQ4Ans] =useState('');

  const [showUploadDataBtn, setShowUploadDataBtn] =useState(false);

  const [modalVisible, setModalVisible] = useState(true);

  


  const textBtnComponent = (quectionNum,text,onPressNone,onPressModarate,onPressSight,onPressServe) => {
    return (
      <View
        style={{
          paddingLeft: 30,
          paddingRight: 30,
          paddingTop: 10,
          paddingBottom: 10,
        }}>
        <Text style={{ color: colors.white,padding:6, fontSize: 21}}>{text}</Text>
        {quectionNum==1 ?
          <View style={{flexDirection: 'row'}}>
          {q1none==true?
            <TouchableOpacity style={{flex: 1, borderRadius: 20, backgroundColor:colors.ansBtnColor, alignItems:'center', margin:3}} onPress={onPressNone}>
            <Text >None</Text>
          </TouchableOpacity>
          :null
          }
          {q1sight==true?
            <TouchableOpacity style={{flex: 1, borderRadius: 20, backgroundColor:colors.btnBGcolor, alignItems:'center', margin:3}} onPress={onPressSight}>
            <Text>Sight</Text>
          </TouchableOpacity>
          :null
          }
  
          {q1moderate==true?
            <TouchableOpacity style={{flex: 1, borderRadius: 20, backgroundColor:colors.fontColor, alignItems:'center', margin:3}} onPress={onPressModarate}>
            <Text>Modarate</Text>
          </TouchableOpacity>
          :null
          }
        
          {q1serve==true?
            <TouchableOpacity style={{flex: 1, borderRadius: 20, backgroundColor:colors.fontColor, alignItems:'center', margin:3}} onPress={onPressServe}>
            <Text>Serve</Text>
          </TouchableOpacity>
          :null
          }
        
        </View>
        :null
        }
        {quectionNum==2 ?
          <View style={{flexDirection: 'row'}}>
          {q2none==true?
            <TouchableOpacity style={{flex: 1, borderRadius: 20, backgroundColor:colors.ansBtnColor, alignItems:'center', margin:3}} onPress={onPressNone}>
            <Text >None</Text>
          </TouchableOpacity>
          :null
          }
          {q2sight==true?
            <TouchableOpacity style={{flex: 1, borderRadius: 20, backgroundColor:colors.btnBGcolor, alignItems:'center', margin:3}} onPress={onPressSight}>
            <Text>Sight</Text>
          </TouchableOpacity>
          :null
          }
  
          {q2moderate==true?
            <TouchableOpacity style={{flex: 1, borderRadius: 20, backgroundColor:colors.fontColor, alignItems:'center', margin:3}} onPress={onPressModarate}>
            <Text>Modarate</Text>
          </TouchableOpacity>
          :null
          }
        
          {q2serve==true?
            <TouchableOpacity style={{flex: 1, borderRadius: 20, backgroundColor:colors.fontColor, alignItems:'center', margin:3}} onPress={onPressServe}>
            <Text>Serve</Text>
          </TouchableOpacity>
          :null
          }
        </View>
        :null
        }
  
        {quectionNum==3 ?
          <View style={{flexDirection: 'row'}}>
          {q3none==true?
            <TouchableOpacity style={{flex: 1, borderRadius: 20, backgroundColor:colors.ansBtnColor, alignItems:'center', margin:3}} onPress={onPressNone}>
            <Text >None</Text>
          </TouchableOpacity>
          :null
          }
          {q3sight==true?
            <TouchableOpacity style={{flex: 1, borderRadius: 20, backgroundColor:colors.btnBGcolor, alignItems:'center', margin:3}} onPress={onPressSight}>
            <Text>Sight</Text>
          </TouchableOpacity>
          :null
          }
  
          {q3moderate==true?
            <TouchableOpacity style={{flex: 1, borderRadius: 20, backgroundColor:colors.fontColor, alignItems:'center', margin:3}} onPress={onPressModarate}>
            <Text>Modarate</Text>
          </TouchableOpacity>
          :null
          }
        
          {q3serve==true?
            <TouchableOpacity style={{flex: 1, borderRadius: 20, backgroundColor:colors.fontColor, alignItems:'center', margin:3}} onPress={onPressServe}>
            <Text>Serve</Text>
          </TouchableOpacity>
          :null
          }
        </View>
        :null
        }
      
      </View>
    );
  };
  

  useEffect(()=>{
   getData();
    if(userFeedback.length ==7  ){
      setShowUploadDataBtn(true)
      
  }else{
    setShowUploadDataBtn(false)
  }

  },[userFeedback])

const getData=async()=>{
  const usersCollection =await firestore().collection('Users').doc('test1').collection('exercise').doc('fasia_strech').get();
  console.log("usersCollection",usersCollection)

  // firestore()
  // .collection('Users')
  // .get()
  // .then(querySnapshot => {
  //   console.log('Total users: ', querySnapshot);

  //   querySnapshot.forEach(documentSnapshot => {
  //     console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
  //   });
  // });


}

const onPressNone =(qnum)=>{
  if(qnum==1){
     setQ1OnPressNone(true)
     setQ1OnPressModerate(false)
     setQ1OnPressServe(false)
     setQ1OnPressSight(false)
     setQ1Ans('none')
  }else if(qnum==2){
    setQ2OnPressNone(true)
    setQ2OnPressModerate(false)
    setQ2OnPressServe(false)
    setQ2OnPressSight(false)
    setQ2Ans('none')
  } if(qnum==3){
    setQ3OnPressNone(true)
    setQ3OnPressModerate(false)
    setQ3OnPressServe(false)
    setQ3OnPressSight(false)
    setQ3Ans('none')
 }
}

const onPressModarate =(qnum)=>{
  if(qnum==1){
    setQ1OnPressNone(false)
    setQ1OnPressModerate(true)
    setQ1OnPressServe(false)
    setQ1OnPressSight(false)
    setQ1Ans('modarate')
 }else if(qnum==2){
   setQ2OnPressNone(false)
   setQ2OnPressModerate(true)
   setQ2OnPressServe(false)
   setQ2OnPressSight(false)
   setQ2Ans('modarate')
 } if(qnum==3){
   setQ3OnPressNone(false)
   setQ3OnPressModerate(true)
   setQ3OnPressServe(false)
   setQ3OnPressSight(false)
   setQ3Ans('modarate')
}
}

const onPressServe =(qnum)=>{
  if(qnum==1){
    setQ1OnPressNone(false)
    setQ1OnPressModerate(false)
    setQ1OnPressServe(true)
    setQ1OnPressSight(false)
    setQ1Ans('serve')
 }else if(qnum==2){
   setQ2OnPressNone(false)
   setQ2OnPressModerate(false)
   setQ2OnPressServe(true)
   setQ2OnPressSight(false)
   setQ2Ans('serve')
 } if(qnum==3){
   setQ3OnPressNone(false)
   setQ3OnPressModerate(false)
   setQ3OnPressServe(true)
   setQ3OnPressSight(false)
   setQ3Ans('serve')
}
}

const onPressSight =(qnum)=>{
  if(qnum==1){
    setQ1OnPressNone(false)
    setQ1OnPressModerate(false)
    setQ1OnPressServe(false)
    setQ1OnPressSight(true)
    setQ1Ans('serve')
 }else if(qnum==2){
   setQ2OnPressNone(false)
   setQ2OnPressModerate(false)
   setQ2OnPressServe(false)
   setQ2OnPressSight(true)
   setQ2Ans('serve')
 } if(qnum==3){
   setQ3OnPressNone(false)
   setQ3OnPressModerate(false)
   setQ3OnPressServe(false)
   setQ3OnPressSight(true)
   setQ3Ans('sight')
}
}


const upload =async()=>{
  var timestamp= moment().utcOffset('+05:30').format('YYYY-MM-DD hh:mm:ss a');
  setLoaderShow(true)
 var data= 
   firestore()
  .collection('Feedback')
  .add({
    "timestamp":timestamp,
    "userFeedback":userFeedback
   }
  )
  .then(() => {
    console.log('User added!');
  });
  dispatch(clearUserFeedback())
  // navigation.navigate('exercisePlan',{
  //   videoPathKey: '',
  // }) 


  setTimeout(async() => {
    console.log("Delayed for 1 second.");
    const usersCollection = await firestore()
    .collection('Recovery_days')
    .orderBy("timestamp", "desc")
    .get()
    setRecovery_duration(usersCollection?._docs[0]?._data?.recovery_duration)
    setPainLevelFromFireB(usersCollection?._docs[0]?._data?.pain_level)
    setSumCorrict(usersCollection?._docs[0]?._data?.sum_correct)
    setSumIncorrect(usersCollection?._docs[0]?._data?.sum_incorrect)
    setLoaderShow(false)
  }, 60000);

}

const submit =async()=>{

  if(q1ans!=='' && painLevel!==-1 && q3ans!==''){
    if(userFeedback.length !==0){
    
      let userFeedbackData = userFeedback
      console.log('userFeedbackData1',userFeedbackData)
      const data = { 
        'correct_squats': correct_squats,
        'exercise_name':exercise_name,
        'incorrect_squats': incorrect_squats,
        'num_total_squats':  num_total_squats,
        'time_stamp':  "2023:10:10:20:58:51",
         'quections': [
          {
            'q1':'How was your  pain level after doing exercise?',
            'ans1': painLevel
          },
          {
            'q2':'Did you feel pain in your natural '+legOrHand+'?',
            'ans1': q1ans
          },
          // {
          //   'q2':'Was it difficult to stretch your stump?' ,
          //   'ans1':q2ans
          // },
          {
            'q3':'Did you feel brusies/burns on your stump skin?' ,
            'ans1':q3ans
          }
         ]
       }
    
      
      console.log('userFeedbackData',userFeedbackData);
      //dispatch(clearUserFeedback())
      dispatch(updateUserFeedback(data));
     navigation.navigate('exercisePlan',{
        videoPathKey: '',
      })
      
      // dispatch(updateUserFeedback(userFeedbackData))
    }else{
      const exerciseFeedback =
       { 
         'correct_squats': correct_squats,
         'exercise_name':exercise_name,
         'incorrect_squats': incorrect_squats,
         'num_total_squats':  num_total_squats,
         'time_stamp':  "2023:10:10:20:58:51",
          'quections': [
            {
              'q1':'How was your  pain level after doing exercise?',
              'ans1': painLevel
            },
           {
             'q2':'Did you feel pain in your natural ' +legOrHand+'?' ,
             'ans1': q1ans
           },
          //  {
          //    'q2':'Was it difficult to stretch your stump?' ,
          //    'ans1':q2ans
          //  },
           {
             'q3':'Did you feel brusies/burns on your stump skin?' ,
             'ans1': q3ans
           }
         ]
        }
       dispatch(updateUserFeedback(exerciseFeedback));
       navigation.navigate('exercisePlan',{
        videoPathKey: '',
      })
      
     } 

  }else{
    alert('Please select answers')
  }
  

}
 


const onPressPainLevel=(painLevel)=>{
  setPainLevel(painLevel)
}




const btnCommon = (onPress, text) => {
  return (
    <View
      style={{
        backgroundColor: colors.darkGreen,
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 10
      }}>
      <TouchableOpacity onPress={onPress}>
        <Text style={{color: colors.white, textAlign:'center'}}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
  
};
  return (
    <View>
      <AppBar
        title={'Exercise Feedback'}
        navigation={navigation}
        isShowBurger={false}
        isShowProfile={true}
        isShowBack={true}
      />
      <View
        style={{
          marginTop: 100,
          marginLeft: 20,
          marginRight: 20,
          backgroundColor: colors.bgColor,
          alignItems:'center',
          height: height- 300
        }}>
        <Text
          style={{
            paddingTop: 10,
            paddingBottom: 50,
            color: colors.white,
            paddingLeft: 20,
            alignContent: 'center',
            fontSize:25
          }}>
          {' '}
          Exercise Feedback
        </Text>

        <View style={{flexDirection:'row'}}>
           <Text style={{fontSize:18}}>Correct Squats: </Text>
           <Text style={{fontSize:18,}}>{correct_squats} </Text>
        </View>
        <View style={{flexDirection:'row'}}>
           <Text style={{fontSize:18}}>Exercise Name: </Text>
           <Text style={{fontSize:18}}>{exercise_name} </Text>
        </View>
        <View style={{flexDirection:'row'}}>
           <Text style={{fontSize:18}}>Incorrect Squats: </Text>
           <Text style={{fontSize:18}}>{incorrect_squats} </Text>
        </View>
        <View style={{flexDirection:'row'}}>
           <Text style={{fontSize:18}}>Totle Squats: </Text>
           <Text style={{fontSize:18}}>{num_total_squats} </Text>
        </View>
        <View  style={{
          paddingLeft: 30,
          paddingRight: 30,
          paddingTop: 10,
          paddingBottom: 10,
        }}>
        <Text style={{ color: colors.white,padding:6, fontSize: 21}}>How was your  pain level after doing exercise?</Text>
        <View style={{flexDirection: 'row'}}>
        <TouchableOpacity style={{flex: 1, borderRadius: 20, backgroundColor:colors.ansBtnColor, alignItems:'center', margin:3}} onPress={()=>onPressPainLevel(0)}>
            <Text >0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flex: 1, borderRadius: 20, backgroundColor:colors.ansBtnColor, alignItems:'center', margin:3}} onPress={()=>onPressPainLevel(1)}>
            <Text >1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flex: 1, borderRadius: 20, backgroundColor:colors.ansBtnColor, alignItems:'center', margin:3}} onPress={()=>onPressPainLevel(2)}>
            <Text >2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flex: 1, borderRadius: 20, backgroundColor:colors.ansBtnColor, alignItems:'center', margin:3}} onPress={()=>onPressPainLevel(3)}>
            <Text >3</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flex: 1, borderRadius: 20, backgroundColor:colors.ansBtnColor, alignItems:'center', margin:3}} onPress={()=>onPressPainLevel(4)}>
            <Text >4</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flex: 1, borderRadius: 20, backgroundColor:colors.ansBtnColor, alignItems:'center', margin:3}} onPress={()=>onPressPainLevel(5)}>
            <Text >5</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flex: 1, borderRadius: 20, backgroundColor:colors.ansBtnColor, alignItems:'center', margin:3}} onPress={()=>onPressPainLevel(6)}>
            <Text >6</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flex: 1, borderRadius: 20, backgroundColor:colors.ansBtnColor, alignItems:'center', margin:3}} onPress={()=>onPressPainLevel(7)}>
            <Text >7</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flex: 1, borderRadius: 20, backgroundColor:colors.ansBtnColor, alignItems:'center', margin:3}} onPress={()=>onPressPainLevel(8)}>
            <Text >8</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flex: 1, borderRadius: 20, backgroundColor:colors.ansBtnColor, alignItems:'center', margin:3}} onPress={()=>onPressPainLevel(9)}>
            <Text >9</Text>
          </TouchableOpacity>
        </View>
        <Text>Pain Level : {painLevel}</Text>
        </View>
       
        {textBtnComponent(1,'Did you feel pain in your natural '+legOrHandState+'?',()=>onPressNone(1),()=>onPressModarate(1),()=>onPressSight(1),()=>onPressServe(1))}
        {/* {textBtnComponent(2,'Was it difficult to stretch your stump?',()=>onPressNone(2),()=>onPressModarate(2),()=>onPressSight(2),()=>onPressServe(2))} */}
        {textBtnComponent(3,'Did you feel brusies/burns on your stump skin?',()=>onPressNone(3),()=>onPressModarate(3),()=>onPressSight(3),()=>onPressServe(3))}
        {
          showUploadDataBtn==true?
          <View style={{padding:40}}>
          <Text style={{padding:10}}>Upload data for report</Text>
          {btnCommon(() => upload(), 'Upload')}
        </View>:
        <View style={{padding:40}}>
        {btnCommon(() => submit(), 'Submit')}

       
        </View>

        }
      

      </View>
      <Spinner visible={loaderShow} />
    {recovery_duration !==0 ?
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <ScrollView style={styles.modalView} >
          <Text style={{color:'black', fontWeight:'bold',    textAlign: 'center',fontSize:25, padding:10}}>Weekly Exercise Feedback</Text>

          <Text style={{color:'black', padding:10}}>Pain Level : {pain_level_fromFireB}</Text>
          <Text style={{color:'#000', padding: 10}}>Recovery Duration: {recovery_duration}</Text>
          <Text style={{color:'black', padding:10}}>Sum Corrict : {sum_correct}</Text>
          <Text style={{color:'black', padding:10, marginBottom:50}}>Sum Incorrect : {sum_incorrect}</Text>
            <View style={{marginBottom:40}}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
            </View>
          
          </ScrollView>
        </View>
      </Modal>
      :null
    
    }
   
    </View>
  );
};


const styles = StyleSheet.create({
  centeredView: {

    justifyContent: 'center',
    alignItems: 'center',

  },
  modalView: {
   marginTop: 150,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,


  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color:'black',
    paddingLeft: 20,
    flex:2
  },
});

export default ExerciseFeedback;
