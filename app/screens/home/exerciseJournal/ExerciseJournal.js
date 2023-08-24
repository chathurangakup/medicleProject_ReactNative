import React from 'react'
import { Text, View } from 'react-native';
import {AppBar} from '../../../components/AppBar';
import { colors } from '../../../config/styles';

const ExerciseJournal = (props) => {
  return (
    <View>
    <AppBar
        title={'External Journal'}
        navigation={props.navigation}
        isShowSearch={false}
      />
      <View style={{marginTop: 150, marginLeft: 20}}>
      <View style={{flexDirection:'row'}}>
       <View style={{padding: 5}}>
           <Text style={{color: colors.blackColor, textAlign:'center'}}>MONDAY</Text>
           <View style={{width: 100, height: 100, borderWidth: 1}}></View>
        </View>
        <View style={{padding: 5}}>
           <Text style={{color: colors.blackColor, textAlign:'center'}}>TUESDAY</Text>
           <View style={{width: 100, height: 100, borderWidth: 1}}></View>
        </View>
        <View style={{padding: 5}}>
           <Text style={{color: colors.blackColor, textAlign:'center'}}>WHENSDAY</Text>
           <View style={{width: 100, height: 100, borderWidth: 1}}></View>
        </View>
      </View>
      <View style={{flexDirection:'row'}}>
       <View style={{padding: 5}}>
           <Text style={{color: colors.blackColor, textAlign:'center'}}>THURSDAY</Text>
           <View style={{width: 100, height: 100, borderWidth: 1}}></View>
        </View>
        <View style={{padding: 5}}>
           <Text style={{color: colors.blackColor, textAlign:'center'}}>FRIDAY</Text>
           <View style={{width: 100, height: 100, borderWidth: 1}}></View>
        </View>
        <View style={{padding: 5}}>
           <Text style={{color: colors.blackColor, textAlign:'center'}}>SATURDAY</Text>
           <View style={{width: 100, height: 100, borderWidth: 1}}></View>
        </View>
      </View>
      
      
       
         
      </View>
    </View>
  )
}

export default ExerciseJournal
