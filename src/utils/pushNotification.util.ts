import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { expo } from '../constants';

export const getPushNotificationsAsync = async () => {
  let result = '';
  if (expo.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      // alert('Failed to get push token for push notification!');
    }
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
    result = token;
  } else {
    // alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return result;
};
