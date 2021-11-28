import { AppDrawerParamList } from '../../../../navigation';

export type ConvertedNavigate = undefined extends AppDrawerParamList[keyof AppDrawerParamList]
  ?
      | [keyof AppDrawerParamList]
      | [keyof AppDrawerParamList, AppDrawerParamList[keyof AppDrawerParamList]]
  : [keyof AppDrawerParamList, AppDrawerParamList[keyof AppDrawerParamList]];

export const convertableStaticHref = [
  '/',
  '/login',
  '/intro',
  '/chat',
  '/profile',
  '/profile/info',
  '/users/stylist',
  '/users/shopper',
  '/users/search',
] as const;
export type ConvertableStaticHref = typeof convertableStaticHref[number];
export const convertableDynamicHref = [
  '/notice/:id',
  '/profile/:id',
  '/chat/:id',
  '/pay/:id',
  '/users/stylist:id',
  '/suggestion/new',
] as const;
export type ConvertableDynamicHref = typeof convertableDynamicHref[number];
export const regexConvertableDynamicHrefObject: Record<ConvertableDynamicHref, RegExp> = {
  '/notice/:id': createRegexConvertableDynamicHref('/notice/:id'),
  '/profile/:id': createRegexConvertableDynamicHref('/profile/:id'),
  '/chat/:id': createRegexConvertableDynamicHref('/chat/:id'),
  '/pay/:id': createRegexConvertableDynamicHref('/pay/:id'),
  '/users/stylist:id': createRegexConvertableDynamicHref('/users/stylist:id'),
  '/suggestion/new': createRegexConvertableDynamicHref('/suggestion/new?uid=id', /=id/gi),
};

function createRegexConvertableDynamicHref(href: string, replaceRegExp: RegExp = /:id/gi): RegExp {
  return new RegExp(
    href.replace(/\//gi, '\\/').replace(/\?/gi, '\\?').replace(replaceRegExp, '[0-9]*'),
  );
}

export const convertHrefToNavigate = (herf: string): ConvertedNavigate | null => {
  if (convertableStaticHref.includes(herf as ConvertableStaticHref)) {
    return convertStaticHrefToNavigateObject[herf as ConvertableStaticHref];
  } else {
    const hrefKey = Object.entries(regexConvertableDynamicHrefObject).find(([_, regex]) =>
      regex.test(herf),
    )?.[0];

    if (hrefKey) {
      const ids = herf
        .match(/[0-9]*/gi)
        ?.filter((s) => s)
        .map((s) => Number(s));
      if (ids) return convertDynamicHrefToNavigateObject[hrefKey as ConvertableDynamicHref](ids);
    }
  }

  return null;
};

const convertStaticHrefToNavigateObject: Record<ConvertableStaticHref, ConvertedNavigate> = {
  '/': ['Main', { screen: 'Matching', params: { screen: 'MatchingScreen' } }],
  '/login': ['Auth', { screen: 'LoginScreen' }],
  '/intro': ['Main', { screen: 'Matching', params: { screen: 'IntroScreen' } }],
  '/users/stylist': [
    'Main',
    { screen: 'Matching', params: { screen: 'StylistScreen', params: {} } },
  ],
  '/users/shopper': ['Main', { screen: 'Matching', params: { screen: 'ShopperScreen' } }],
  '/chat': ['Main', { screen: 'Chatting', params: { screen: 'ChattingListScreen' } }],
  '/profile': ['Main', { screen: 'Mypage', params: { screen: 'MypageScreen' } }],
  '/profile/info': ['Main', { screen: 'Mypage', params: { screen: 'ProfileEditScreen' } }],
  '/users/search': ['Main', { screen: 'Matching', params: { screen: 'SearchScreen' } }],
};
const convertDynamicHrefToNavigateObject: Record<
  ConvertableDynamicHref,
  (id: number[]) => ConvertedNavigate
> = {
  '/notice/:id': (id) => [
    'Main',
    { screen: 'Matching', params: { screen: 'NoticeScreen', params: { id: id[0] } } },
  ],
  '/profile/:id': (id) => {
    const navigate = ['ProfileScreen', { id: id[0] }];
    return navigate as ConvertedNavigate;
  },
  '/chat/:id': (id) => [
    'Main',
    { screen: 'Chatting', params: { screen: 'ChattingScreen', params: { id: id[0] } } },
  ],
  '/pay/:id': (id) => [
    'Main',
    { screen: 'Chatting', params: { screen: 'PayScreen', params: { id: id[0] } } },
  ],
  '/suggestion/new': (id) => [
    'Main',
    { screen: 'Chatting', params: { screen: 'SuggestionScreen', params: { id: id[0] } } },
  ],
  '/users/stylist:id': (type) => {
    console.log({ type });
    return [
      'Main',
      {
        screen: 'Matching',
        params: { screen: 'StylistScreen', params: { type: type.join('|') } },
      },
    ];
  },
};
