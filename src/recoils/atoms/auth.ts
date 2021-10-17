import { atom } from 'recoil';

export const authAtom = atom<{ accessToken: string; refreshToken: string } | null>({
  key: 'auth',
  default: null,
});
