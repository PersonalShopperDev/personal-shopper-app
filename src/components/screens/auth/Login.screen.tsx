import React from 'react';
import { Image, View } from 'react-native';

import { WebViewScreenOnlyMain } from '../../ui/Screens';

import { createStackOption, ScreenProps, ScreenParams } from '../../../types/navigation';
import { AuthStackParamList, AuthStackNavigationProps } from '../../../navigation/Auth';
import { AppleLoginButton, KakaoLoginButton, NaverLoginButton } from '../../ui/Buttons';

import loginBackground from '../../../assets/images/login.background.image.png';
import { colors } from '../../../constants';
import { Text, Title } from '../../ui/Texts';

import personalAppLogo from '../../../assets/images/personal.app.logo.image.png';

export const LoginScreenOptions = createStackOption({ headerShown: false });
export type LoginScreenParams = ScreenParams<undefined>;
export default function LoginScreen({
  navigation,
}: ScreenProps<AuthStackParamList, 'LoginScreen', AuthStackNavigationProps>) {
  return (
    <View
      style={{
        flex: 1,
        paddingTop: 50,
        backgroundColor: colors.darkGray,
        justifyContent: 'center',
      }}
    >
      <Image
        style={{ position: 'absolute', width: '100%', height: '100%' }}
        source={loginBackground}
      />
      <View style={{ width: '100%', alignItems: 'center' }}>
        <Image style={{ width: 93, height: 93 }} source={personalAppLogo} />
        <Title style={{ color: colors.white, fontWeight: '600' }}>Personal Shopper</Title>
      </View>
      <View style={{ marginTop: 55 }}>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <NaverLoginButton />
          <KakaoLoginButton />
          <AppleLoginButton />
        </View>
        <View style={{ marginTop: 24, width: '100%', alignItems: 'center' }}>
          <Text style={{ width: '70%', maxWidth: 280, color: colors.white, textAlign: 'center' }}>
            {'최초 로그인 시 '}
            <Text style={{ fontWeight: '700', color: colors.white }}>이용약관</Text>
            {', '}
            {
              <Text style={{ fontWeight: '700', color: colors.white }}>
                개인정보 제공 및 수집/이용
              </Text>
            }
            {'에 동의하는 것으로 간주합니다.'}
          </Text>
        </View>
      </View>
    </View>
  );
}
