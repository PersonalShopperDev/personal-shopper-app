import React, { forwardRef, useImperativeHandle, useState, useRef } from 'react';
import { Modal, View, TouchableWithoutFeedback } from 'react-native';

import { colors } from '../../../constants';
import { TextButton } from '../Buttons';
import { Text, Title } from '../Texts';

import { BaseModalProps, BaseModalRef } from './type';

export const BaseModal = forwardRef<BaseModalRef, BaseModalProps>(
  ({ title, text, ...props }, ref) => {
    const [visible, setVisible] = useState(false);
    const callbackRef = useRef<(() => void) | null>(null);

    useImperativeHandle(
      ref,
      () => ({
        show: (callback: () => void) => {
          setVisible(true);
          callbackRef.current = callback;
        },
      }),
      [visible],
    );

    return (
      <Modal
        animationType="fade"
        transparent={true}
        {...props}
        visible={visible}
        onRequestClose={() => {
          setVisible(false);
          props?.onRequestClose && props.onRequestClose();
        }}
      >
        <TouchableWithoutFeedback onPress={() => setVisible(false)} style={{}}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}
          >
            <View
              style={{
                width: '80%',
                maxWidth: 230,
                borderRadius: 7,
                backgroundColor: '#fff',
                paddingTop: 24,
                paddingBottom: 14,
                paddingHorizontal: 17,
                alignItems: 'center',
              }}
            >
              <Title style={{ fontSize: 18, color: colors.mainColor }}>{title}</Title>
              <View style={{ marginTop: 12 }}>
                <Text style={{ fontWeight: '500', textAlign: 'center' }}>{text}</Text>
              </View>
              <TextButton
                onPress={() => {
                  callbackRef.current && callbackRef.current();
                  setVisible(false);
                }}
                textProps={{ style: { textAlign: 'center', fontWeight: '600', fontSize: 14 } }}
                style={{ marginTop: 14, width: '100%', height: 42, justifyContent: 'center' }}
                text="확인하기"
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  },
);

export * from './type';
