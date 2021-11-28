import { navigation } from '../../../../utils/navigation';
import { AppDrawerParamList } from '../../../../navigation';
import { convertHrefToNavigate } from './convertHrefToNavigate';
import authStorage from '../../../../storages/auth.storage';

const onMessageHandler = {
  navigate: (herf: string) => {
    const navigate = convertHrefToNavigate(herf);
    if (navigate) {
      navigation.current?.navigate(navigate[0], navigate[1]);
      console.log('네비게이션! : ', herf);
    } else {
      console.log('매칭 아직 안됨 : ', herf);
    }
  },
  logOut: () => {
    console.log('logOut ');

    authStorage.set('ACCESS_TOKEN', '');
    authStorage.set('REFRESH_TOKEN', '');
    navigation.current?.reset({ routes: [{ name: 'Auth', params: { screen: 'LoginScreen' } }] });
  },
};

export default function defaultOnMessage(value: string) {
  const [action, data] = value.split(': ');

  Object.entries(onMessageHandler).map(([key, func]) => {
    action === key && func(data);
  });
}
