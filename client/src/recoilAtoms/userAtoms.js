import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
//persist the state even after refresh
// const { persistAtom } = recoilPersist();

const { persistAtom } = recoilPersist({
  key: 'recoil-persist', // this key is using to store data in local storage
  storage: localStorage, // configurate which stroage will be used to store the data
});




export const isAuthState = atom({
  key: 'authKey',
  default: false,
  effects_UNSTABLE: [persistAtom],
});
