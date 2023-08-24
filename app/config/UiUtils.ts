import { Dimensions, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

export const _perc = (x, ele = 'height') => {
    const { height, width } = Dimensions.get('window');
    return ele !== 'height' ? (width * x) / 100 : (height * x) / 100;
  };
  
  export const device = {
    statusbarheight: (function () {
      return function () {
        return Platform.select({
          ios: DeviceInfo.hasNotch() ? 44 : 20,
          android: 0,
          default: 0,
        });
      };
    }()),
  };

  export const calculate_water_intake = (weight: any, age: number, temperature: any, workout_time: any) =>{
    let  daily_water_intake = 30;

   let water_intake = weight * daily_water_intake

    if( age < 30){
        water_intake += 200
    }else if(age > 55){
        water_intake -= 200
    }
  
    if (temperature > 30){
        water_intake += 350
    }else if(temperature < 20){
        water_intake -= 200
    }
    
    water_intake += (workout_time / 30) * 200

    let cups = Math.round(water_intake / 250)
   
    return cups
  }