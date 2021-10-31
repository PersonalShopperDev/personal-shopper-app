import React from 'react';
import { View } from 'react-native';

import { Text } from '../Texts';
import { Avatar } from '../Avatars';
import { FlexRowView } from '../LayoutViews';

import { colors } from '../../../constants';

import { ProfileProps } from './type';

export function Profile({ user }: ProfileProps) {
  return (
    <FlexRowView style={{ justifyContent: 'flex-start', paddingHorizontal: 21 }}>
      <Avatar size={58} />
      <View style={{ justifyContent: 'center', paddingLeft: 15 }}>
        <FlexRowView style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
          <View>
            <Text style={{ fontWeight: 'bold' }}>{user.name}</Text>
          </View>
          <View style={{ marginLeft: 6 }}>
            <Text style={{ fontWeight: 'bold', color: colors.mainColor, fontSize: 10 }}>
              {user.type}
            </Text>
          </View>
        </FlexRowView>
        <View style={{ marginTop: 2 }}>
          <Text style={{ fontSize: 12, color: colors.darkGray }}>{user.email}</Text>
        </View>
      </View>
    </FlexRowView>
  );
}
