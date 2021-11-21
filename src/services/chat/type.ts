export interface getChatRes extends Chat {}

export interface Chat {
  targetUser: {
    id: number;
    profileImg: string;
    name: string;
  };
  payment: {
    paymentId: number;
    price: number;
    status: number;
    latestCoordId: number;
    requestEditCoordId: number;
  };
}
