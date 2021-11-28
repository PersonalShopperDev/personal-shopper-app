import React, { useLayoutEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';
import WebView from 'react-native-webview';

import BasicCenter from '../../../templates/BasicCenter';
import { Icon } from '../../../ui/Icons';
import { WebViewScreenOnlyMain } from '../../../ui/Screens';
import { TouchableOpacity } from '../../../ui/Touchables';
import { TextButton, TextLinkButton } from '../../../ui/Buttons';
import { BaseModal, BaseModalRef } from '../../../ui/Modals';

import {
  ChattingStackNavigationProps,
  ChattingStackParamList,
} from '../../../../navigation/Main/Chatting';
import { createStackOption, ScreenParams, ScreenProps } from '../../../../types/navigation';

import callWeb from '../../../ui/Screens/WebView/postMessage';
import { colors } from '../../../../constants';

export const SuggestionScreenOptions = createStackOption({ headerTitle: '코디제안' });
export type SuggestionScreenParams = ScreenParams<{ id: number }>;
export default function SuggestionScreen({
  route: {
    params: { id },
  },
  navigation,
}: ScreenProps<ChattingStackParamList, 'SuggestionScreen', ChattingStackNavigationProps>) {
  const [step, setStep] = useState(1);
  const ref = useRef<WebView>(null);
  const modalRef = useRef<BaseModalRef>(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity style={{ marginHorizontal: 12 }} onPress={() => navigation.goBack()}>
          <Icon size={32} name="chevron-left" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TextLinkButton
          style={{ marginHorizontal: 12, color: colors.mainColor, fontWeight: '500' }}
          onPress={() => ref.current && callWeb({ ref: ref.current, action: 'onClickStorage' })}
          text={'임시저장'}
        />
      ),
    });
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginHorizontal: 12 }}
          onPress={() =>
            step === 1
              ? navigation.goBack()
              : ref.current && callWeb({ ref: ref.current, action: 'setStep(1)' })
          }
        >
          <Icon size={32} name="chevron-left" />
        </TouchableOpacity>
      ),
    });
  }, [step]);

  useLayoutEffect(() => {
    const onBeforeRemove = navigation.addListener('beforeRemove', (event) => {
      event.preventDefault();
      modalRef.current?.show(() => {
        onBeforeRemove();
        navigation.goBack();
      });
    });

    return () => {
      onBeforeRemove();
    };
  }, []);

  return (
    <BasicCenter
      style={{ width: '100%', height: '100%', paddingVertical: 0, paddingHorizontal: 0 }}
      contents={
        <>
          <BaseModal
            title={'잠깐!'}
            text={
              '작성 중인 내용을 임시저장 하셨나요? 저장하지 않고 페이지를 나가시면 작성하신 코디 내용이 사라집니다😭'
            }
            ref={modalRef}
          />
          <WebViewScreenOnlyMain
            ref={ref}
            style={{ flex: 1 }}
            uri={`/suggestion/new?uid=${id}`}
            onMessage={(event) => {
              const { data } = event.nativeEvent;

              const [action, value] = data.split(': ');

              if (action === 'setStep') {
                setStep(Number(value));
              }
            }}
          />
        </>
      }
    />
  );
}
