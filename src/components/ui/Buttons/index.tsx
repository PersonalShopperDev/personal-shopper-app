import React from 'react';
import * as AppleAuthentication from 'expo-apple-authentication';

import { colors, expo } from '../../../constants';

import { TouchableOpacity } from '../Touchables';

import { Text } from '../Texts';
import {
  TextButtonProps,
  TextLinkButtonProps,
  ListItemButtonProps,
  IconAndTextButtonProps,
} from './type';
import { FlexRowView } from '../LayoutViews';
import { Icon, IconSet } from '../Icons';
import { Alert, Dimensions, Image } from 'react-native';
import { getAccessToken, putPushToken } from '../../../services/login';
import { getProfile } from '../../../services/profile';
import { useNavigation } from '@react-navigation/core';
import { getPushNotificationsAsync } from '../../../utils/pushNotification.util';
import { useSetRecoilState } from 'recoil';
import { authAtom } from '../../../recoils/atoms';
import { profileAtom } from '../../../recoils/atoms/profile';
import authStorage from '../../../storages/auth.storage';
import { AuthStackNavigationProps, AuthStackParamList } from '../../../navigation/Auth';

import kakaoLogo from '../../../assets/images/kakao.logo.image.png';
import naverLogo from '../../../assets/images/naver.logo.image.png';

export function TextButton({ text, textProps, ...props }: TextButtonProps) {
  return (
    <TouchableOpacity
      {...props}
      style={[
        {
          paddingHorizontal: 30,
          paddingVertical: 5,
          borderRadius: 4,
          backgroundColor: colors.mainColor,
        },
        props.style,
      ]}
    >
      <Text {...textProps} style={[{ color: colors.white, fontSize: 16 }, textProps?.style]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}
export function TextLinkButton({ text, ...props }: TextLinkButtonProps) {
  return (
    <TouchableOpacity>
      <Text {...props}>{text}</Text>
    </TouchableOpacity>
  );
}

export function ListItemButton({ text, rightContents, textStyle, ...props }: ListItemButtonProps) {
  return (
    <TouchableOpacity {...props}>
      <FlexRowView style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
        <Text style={textStyle}>{text}</Text>
        {rightContents}
      </FlexRowView>
    </TouchableOpacity>
  );
}

export function IconAndTextButton({
  icon,
  color,
  text,
  onPress,
  disabled,
}: IconAndTextButtonProps) {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={{ marginHorizontal: 12, alignItems: 'center' }}
      onPress={onPress}
    >
      <Icon size={24} color={color} name={icon} />
      <Text style={{ fontSize: 10, color }}>{text}</Text>
    </TouchableOpacity>
  );
}

export function AppleLoginButton() {
  const navigation = useNavigation();

  const setAuth = useSetRecoilState(authAtom);
  const setProfile = useSetRecoilState(profileAtom);

  return (
    <AppleAuthentication.AppleAuthenticationButton
      buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
      buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.WHITE}
      cornerRadius={5}
      style={{ marginTop: 9, height: 54, width: '80%', maxWidth: 333 }}
      onPress={async () => {
        try {
          const credential = await AppleAuthentication.signInAsync({
            requestedScopes: [
              AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
              AppleAuthentication.AppleAuthenticationScope.EMAIL,
            ],
          });
          console.log({ credential });

          if (credential.authorizationCode && credential.identityToken) {
            const token = await getAccessToken({
              resource: 'apple',
              token: credential.authorizationCode,
            });

            console.log({ token });
            if (token) {
              const profile = await getProfile(token.accessToken);
              console.log({ profile });
              if (!profile) {
                navigation.goBack();
                return;
              }

              const pushToken = await getPushNotificationsAsync();
              putPushToken(token.accessToken, { token: pushToken });
              console.log({ pushToken });

              setProfile(profile);
              setAuth({ accessToken: token.accessToken, refreshToken: token.refreshToken });
              authStorage.set('ACCESS_TOKEN', token.accessToken);
              authStorage.set('REFRESH_TOKEN', token.refreshToken);

              navigation.navigate('Main', {
                screen: 'Matching',
                params: { screen: 'MatchingScreen' },
              });
            }
          }
          // signed in
        } catch (e: any) {
          if (e.code === 'ERR_CANCELED') {
            // handle that the user canceled the sign-in flow
          } else {
            // handle other errors
            Alert.alert('알 수 없는 에러', '다시 시도해주세요');
            console.error(e);
          }
        }
      }}
    />
  );
}

export function KakaoLoginButton() {
  const navigation = useNavigation<AuthStackNavigationProps>();

  return (
    <TouchableOpacity
      style={{
        marginTop: 9,
        backgroundColor: '#fce750',
        flexDirection: 'row',
        height: 54,
        width: '80%',
        maxWidth: 333,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
      }}
      onPress={() => navigation.navigate('KakaoLoginScreen')}
    >
      <Image style={{ width: 18, height: 18 }} source={kakaoLogo} />
      <Text style={{ marginLeft: 13, fontSize: 22, fontWeight: 'bold' }}>카카오로 로그인하기</Text>
    </TouchableOpacity>
  );
}

export function NaverLoginButton() {
  const navigation = useNavigation<AuthStackNavigationProps>();

  return (
    <TouchableOpacity
      style={{
        backgroundColor: '#06be34',
        flexDirection: 'row',
        height: 54,
        width: '80%',
        maxWidth: 333,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
      }}
      onPress={() => navigation.navigate('NaverLoginScreen')}
    >
      <Image style={{ width: 34, height: 34 }} source={naverLogo} />
      <Text style={{ marginLeft: 5, fontSize: 22, fontWeight: 'bold', color: colors.white }}>
        네이버로 로그인하기
      </Text>
    </TouchableOpacity>
  );
}

export * from './type';
