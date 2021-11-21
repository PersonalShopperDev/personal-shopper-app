import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { WebViewScreenOnlyMain } from '../../../ui/Screens';

import { createStackOption, ScreenParams, ScreenProps } from '../../../../types/navigation';
import BasicCenter from '../../../templates/BasicCenter';
import {
  ChattingStackParamList,
  ChattingStackNavigationProps,
} from '../../../../navigation/Main/Chatting';
import WebView from 'react-native-webview';
import { TouchableOpacity } from '../../../ui/Touchables';
import { Icon } from '../../../ui/Icons';
import { FlexRowView } from '../../../ui/LayoutViews';
import { Text } from '../../../ui/Texts';
import { Alert, View } from 'react-native';
import { getChat } from '../../../../services/chat';
import { useRecoilValue } from 'recoil';
import { authAtom } from '../../../../recoils/atoms';
import { Chat } from '../../../../services/chat/type';
import { profileAtom } from '../../../../recoils/atoms/profile';
import { IconAndTextButton } from '../../../ui/Buttons';
import { colors } from '../../../../constants';

export const ChattingScreenOptions = createStackOption({
  headerTitle: '',
});
export type ChattingScreenParams = ScreenParams<{ id: number }>;
export default function ChattingScreen({
  route: {
    params: { id },
  },
  navigation,
}: ScreenProps<ChattingStackParamList, 'ChattingScreen', ChattingStackNavigationProps>) {
  const auth = useRecoilValue(authAtom);
  const profile = useRecoilValue(profileAtom);
  const ref = useRef<WebView>();

  const [chat, setChat] = useState<Chat | null>(null);

  // const requestPayment = async () => {
  //   const hasAccount = bank && account && accountUser

  //   if (!price) {
  //     const text = `${hasAccount ? '코디 가격을' : '코디 가격과 계좌 정보를'} 입력하신 다음 다시 시도해 주세요.`
  //     await createAlert({ text })
  //     router.push('/profile')
  //     return
  //   }

  //   if (!hasAccount) {
  //     await createAlert({ text: '계좌 정보를 입력하신 다음 다시 시도해 주세요.' })
  //     router.push('/profile/account')
  //     return
  //   }

  //   const res = await communicate({
  //     url: `/payment/${room.id}/request`,
  //     method: 'POST',
  //   })

  //   if (res.status !== 201) {
  //     await createAlert({ text: ERROR_MESSAGE })
  //   }
  // }

  useEffect(() => {
    (async () => {
      if (!auth?.accessToken) return;

      const chat = await getChat(id, auth?.accessToken);
      if (!chat) return;

      setChat(chat);
    })();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <FlexRowView>
          <TouchableOpacity style={{ marginHorizontal: 12 }} onPress={() => navigation.goBack()}>
            <Icon size={32} name="chevron-left" />
          </TouchableOpacity>

          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>채팅</Text>
          </View>
        </FlexRowView>
      ),
    });
  }, []);

  useEffect(() => {
    if (chat?.payment.status === undefined || profile?.userType === undefined) return;

    const isStylist = profile.userType === 'S' || profile.userType === 'W';
    const paymentRequestEnabled = chat.payment.status !== 1 && chat.payment.status !== 2;
    const sendCoordEnabled =
      chat.payment.status === 2 && (!chat.payment.latestCoordId || chat.payment.requestEditCoordId);

    navigation.setOptions({
      headerLeft: () => (
        <FlexRowView>
          <TouchableOpacity style={{ marginHorizontal: 12 }} onPress={() => navigation.goBack()}>
            <Icon size={32} name="chevron-left" />
          </TouchableOpacity>

          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{chat.targetUser.name}</Text>
          </View>
        </FlexRowView>
      ),
      headerRight: isStylist
        ? () => (
            <FlexRowView>
              <IconAndTextButton
                disabled={!paymentRequestEnabled}
                color={!paymentRequestEnabled ? colors.gray : colors.black}
                icon="credit-card-check-outline"
                text="결제요청"
                onPress={() => Alert.alert('결제요청')}
              />
              <IconAndTextButton
                disabled={!sendCoordEnabled}
                color={!sendCoordEnabled ? colors.gray : colors.black}
                icon="tshirt-crew-outline"
                text="코디보내기"
                onPress={() => Alert.alert('코디보내기')}
              />
            </FlexRowView>
          )
        : undefined,
    });
  }, [chat?.payment.status, profile?.userType]);

  return (
    <BasicCenter
      style={{ width: '100%', height: '100%', paddingVertical: 0, paddingHorizontal: 0 }}
      contents={<WebViewScreenOnlyMain ref={ref} style={{ flex: 1 }} uri={`/chat/${id}`} />}
    />
  );
}
