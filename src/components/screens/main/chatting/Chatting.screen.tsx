import React, { useLayoutEffect, useRef, useState } from 'react';

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
import { View } from 'react-native';

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
  const [headerTitle, setHeaderTitle] = useState('채팅');
  const ref = useRef<WebView>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <FlexRowView>
          <TouchableOpacity style={{ marginHorizontal: 12 }} onPress={() => navigation.goBack()}>
            <Icon size={32} name="chevron-left" />
          </TouchableOpacity>

          <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'blue' }}>
            <Text style={{ backgroundColor: 'red' }}>{headerTitle}</Text>
          </View>
        </FlexRowView>
      ),
      headerRight: () => (
        <FlexRowView>
          <TouchableOpacity style={{ marginHorizontal: 12 }} onPress={() => navigation.goBack()}>
            <Icon size={24} name="close" />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginHorizontal: 12 }} onPress={() => navigation.goBack()}>
            <Icon size={24} name="close" />
          </TouchableOpacity>
        </FlexRowView>
      ),
    });
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <FlexRowView>
          <TouchableOpacity style={{ marginHorizontal: 12 }} onPress={() => navigation.goBack()}>
            <Icon size={32} name="chevron-left" />
          </TouchableOpacity>

          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: '500' }}>{headerTitle}</Text>
          </View>
        </FlexRowView>
      ),
    });
  }, [headerTitle]);

  return (
    <BasicCenter
      style={{ width: '100%', height: '100%', paddingVertical: 0, paddingHorizontal: 0 }}
      contents={
        <WebViewScreenOnlyMain
          ref={ref}
          style={{ flex: 1 }}
          uri={`/chat/${id}`}
          onLoadEnd={() => {
            ref.current?.injectJavaScript(`
              var height = document.getElementById('__next').style.height;
            `);
            ref.current?.injectJavaScript(`
              ReactNativeWebView.postMessage("headerTitle: " + document.querySelector('.app-bar_title__1rrzi').innerText);
            `);
          }}
          onMessage={(event) => {
            const { data } = event.nativeEvent;
            if (data.includes('headerTitle: ')) setHeaderTitle(data.replace('headerTitle: ', ''));
          }}
        />
      }
    />
  );
}
