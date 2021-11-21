import React from 'react';
import { View } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { DrawerContentScrollView, DrawerContentComponentProps } from '@react-navigation/drawer';

import { ListItemButton, ListItemButtonProps } from '../Buttons';

import { MyProfile, Profile } from '../Profiles';
import { Icon, IconSet } from '../Icons';
import { colors } from '../../../constants';
import authStorage from '../../../storages/auth.storage';
import { useRecoilState, useRecoilValue } from 'recoil';
import { profileAtom } from '../../../recoils/atoms/profile';
import { navigation } from '../../../utils/navigation';

export function LoggedDrawer({ ...props }: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ paddingTop: 44 }}>
        <MyProfile />
        <View style={{ paddingHorizontal: 15, paddingVertical: 18 }}>
          <LoggedDrawerItem
            onPress={() => navigation.current?.navigate('HistoryScreen')}
            text="코디 내역"
          />
          <LoggedDrawerItem
            onPress={() => navigation.current?.navigate('TermsOfServiceScreen')}
            text="서비스 이용약관"
          />
          <LoggedDrawerItem
            onPress={() => navigation.current?.navigate('PrivacyPolicyScreen')}
            text="개인정보처리방침"
          />
          <LoggedDrawerItem
            onPress={() => navigation.current?.navigate('NoticeScreen')}
            text="공지사항"
          />

          <LoggedDrawerItem
            style={{ marginTop: 20 }}
            text={'로그아웃'}
            onPress={() => {
              authStorage.set('ACCESS_TOKEN', '');
              authStorage.set('REFRESH_TOKEN', '');
              navigation.current?.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'Auth' }],
                }),
              );
            }}
            textStyle={{ color: colors.mainColor }}
            rightContents={<></>}
          />
        </View>
      </View>
    </DrawerContentScrollView>
  );
}
interface LoggedDrawerItemProps extends ListItemButtonProps {}
export function LoggedDrawerItem({ ...props }: LoggedDrawerItemProps) {
  return (
    <ListItemButton
      {...props}
      style={[{ paddingVertical: 8 }, props.style]}
      textStyle={{ color: colors.darkGray, fontSize: 14, fontWeight: 'bold', ...props.textStyle }}
      rightContents={
        props.rightContents || (
          <View style={{ flexGrow: 1, alignItems: 'flex-end' }}>
            <Icon color={colors.darkGray} size={24} name={'chevron-right'} />
          </View>
        )
      }
    />
  );
}
