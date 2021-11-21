import { atom } from 'recoil';

export const profileAtom = atom<User | null>({
  key: 'profile',
  default: null,
});

export type UserType = 'N' | 'D' | 'S' | 'W';
export interface Style {
  id: number;
  value: string;
}
export interface ReviewListData {
  reviewId: number;
  supplierId: number;
  img: string;
  status: number;
}
export interface BodyStat {
  isPublic: boolean;
  height: number;
  weight: number;
  body: {
    id: number;
    value: string;
  };
}

export interface User {
  userType: UserType;
  userId: number;
  name: string;
  phone: string;
  email: string;
  gender: 'M' | 'F';
  introduction: string;
  styles: {
    male: Style[];
    female: Style[];
  };
  profileImg: string;
  closet: { id: number; img: string }[];
  careerList: { value: string; type: number }[];
  reviewList: ReviewListData[];
  reviewCount: number;
  hireCount: number;
  rating: number;
  price: number;
  coord: { id: number; img: string }[];
  hopeToSupplier: string;
  bodyStat: BodyStat;
  account: string;
  bank: string;
  accountUser: string;
}
