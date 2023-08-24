import React, { FC, useEffect, useRef, useState } from 'react'
import { View, Text, StyleSheet, ImageBackground, Animated, Dimensions, Image, FlatList, TouchableOpacity } from 'react-native'
import { colors } from '../../config/styles'
import Images from '../../config/Images';
import { AppBar } from '../../components/AppBar';
import { useSelector, useDispatch } from 'react-redux';

import {isChatbotComplete} from './chatBot/ChatBotSlice'



const { width, height } = Dimensions.get('screen');



export interface HomeProps { }

const Home: FC<HomeProps> = (props: any) => {
    const pan = useRef(new Animated.ValueXY()).current;
    const dispatch = useDispatch()


    const tileComponent = (title: string, imagesource: string, onPressBtn: any, clickText: string) => {
        return (
            <View style={{ marginLeft: 20 }}>
                <Text style={{ color: colors.blackColor, paddingBottom: 5 }}>{title}</Text>
                <View style={{ flexDirection: 'row', backgroundColor: colors.bgColor, width: width / 1.6, alignContent: 'center', padding: 20 }}>
                    <View>
                        <Image source={imagesource} style={{ width: 70, height: 50 }}></Image>
                    </View>
                    <View style={{ margin: 20, padding: 5, borderWidth: 1, borderColor: colors.blackColor }}>
                        <TouchableOpacity onPress={onPressBtn}>
                            <Text>{clickText}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        )
    }


    useEffect(() => {
        Animated.timing(pan, {
            toValue: { x: 800, y: 0 },
            delay: 1000,
            useNativeDriver: false,
        }).start()
    })
    return (
        <View style={styles.page}>
            <AppBar title={'Chat Bot'} navigation={props.navigation} isShowSearch={true} />
            <View style={{ paddingTop: 100 }}>
                {tileComponent("Exercise Plan", Images.E_PLAN, () => props.navigation.navigate('exercisePlan',{
            videoPathKey: '',
          }), "Click me")}
                <View style={{ margin: 20}}>
                    <Text style={{ borderWidth: 1, borderColor: colors.blackColor, color: colors.blackColor, padding: 5}}>Exercise to help you improve balance on the new proshetic limb</Text>
                </View>
                {tileComponent("Exercise Articles", Images.E_ARTICLE, () => dispatch(isChatbotComplete(false)), "Read me")}
                <View style={{paddingTop: 20}}>
              
                </View>
              
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    page: {

        flexDirection: 'column'
    },
    bi: {
        width: width,
        height: 240
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 40,
        marginHorizontal: 20,
        justifyContent: 'space-between'
    },
    item: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10,
        marginVertical: 10,
        marginHorizontal: 12,
        borderRadius: 18,
    },
    title: {
        fontSize: 16,

    },
})

export default Home;


