import { atom } from 'recoil';

export const AuthAtom = atom<{ token: string } | null>({
  key: 'auth',
  default: null,
});
