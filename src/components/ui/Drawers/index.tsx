import React from 'react';
import { View } from 'react-native';
import { DrawerContentScrollView, DrawerContentComponentProps } from '@react-navigation/drawer';

import { ListItemButton, ListItemButtonProps } from '../Buttons';

import { Profile } from '../Profiles';
import { Icon, IconSet } from '../Icons';
import { colors } from '../../../constants';

export function LoggedDrawer({ ...props }: DrawerContentComponentProps) {
  const user = {
    type: '일반 유저',
    name: '오준서',
    email: 'insung9546@gmail.com',
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={{ paddingTop: 44 }}>
        <Profile user={user} />
        <View style={{ paddingHorizontal: 15, paddingVertical: 18 }}>
          <LoggedDrawerItem
            onPress={() => props.navigation.navigate('HistoryScreen')}
            text="코디 내역"
          />
          <LoggedDrawerItem
            onPress={() => props.navigation.navigate('TermsOfServiceScreen')}
            text="서비스 이용약관"
          />
          <LoggedDrawerItem
            onPress={() => props.navigation.navigate('PrivacyPolicyScreen')}
            text="개인정보처리방침"
          />
          <LoggedDrawerItem
            onPress={() => props.navigation.navigate('NoticeScreen')}
            text="공지사항"
          />

          <LoggedDrawerItem
            style={{ marginTop: 20 }}
            text={'로그아웃'}
            onPress={() => console.log('로그아웃')}
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
