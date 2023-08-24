import React, {useEffect, useRef} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  Dimensions,
  FlatList,
  Image,
  Animated,
  Easing,
} from 'react-native';

import Images from '../../config/Images';
import {colors} from '../../config/styles';
import Slides from '../../config/carosoul';
import CustomButton from '../../components/CustomButton';
import BottomSignLinkText from '../../components/BottomSignLinkText'

const {width, height} = Dimensions.get('screen');

const _Splash = (props) => {
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      // props.navigation.navigate('login');
    }, 2000);

    return () => clearInterval(timer);
  });

  const SlideItems = ({item}) => {
    const translateYImage = new Animated.Value(40);
    Animated.timing(translateYImage, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
      easing: Easing.bounce,
    }).start();
    return (
      <View style={styles.containerSlide}>
        <Animated.Image
          source={item.img}
          resizeMode="contain"
          style={[styles.image, {transform: [{translateY: translateYImage}]}]}
        />
        <View style={styles.content}>
          <Text style={styles.title}>{item.title}</Text>
        </View>
      </View>
    );
  };

  const Pagination = ({data, scrollX}) => {
    console.log('data', data);
    return (
      <View style={styles.paginationDotContainer}>
        {data.map((_, idx) => {
          const inputRange = [
            (idx - 1) * width,
            idx * width,
            (idx + 1) * width,
            (idx + 2) * width,
          ];
       
          const bgColor = scrollX.interpolate({
            inputRange,
            outputRange: [colors.white, colors.dotSelectColor, colors.white, colors.white],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={idx.toString()}
              style={[styles.dot, { backgroundColor: bgColor}]}
            />
          );
        })}
      </View>
    );
  };

  const handleOnScroll = event => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      },
    )(event);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.bgColor}}>
      <View style={{flex: 1}}>
        <FlatList
          data={Slides}
          renderItem={({item}) => <SlideItems item={item} />}
          horizontal
          pagingEnabled
          snapToAlignment="center"
          showsHorizontalScrollIndicator={false}
          onScroll={handleOnScroll}
        />
        <Pagination data={Slides} scrollX={scrollX} />
        <View
          style={{
            alignItems: 'center',
            bottom: height / 13,
            marginLeft: width / 10,
            marginRight: width / 10,
          }}>
          <CustomButton
            title="GET STARTD"
            onPress={() => props.navigation.navigate('login')}
            btnStyle={{borderRadius: 10, height: height/12,}}
            textStyle={{fontSize: 25}}
          />
          <BottomSignLinkText text={'Existing User ? '} clickText={'Sign In'} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainComp: {
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 16,
    position: 'relative',
  },
  containerSlide: {
    width,
    alignItems: 'center',
    paddingTop: height/10
  },
  image: {
    flex: 0.6,
    width: '60%',
  },
  content: {
    alignItems: 'center',
    padding: 20,
    justifyContent: 'center',
    alignContent:'center',
    alignSelf:'center',

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign:'center',
  },
  paginationDotContainer: {
    position: 'absolute',
    bottom: width/1.6,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 25,
    height: 25,
    borderRadius: 20,
    backgroundColor: '#ccc',
    margin: 15,
  },
});

export default _Splash;
