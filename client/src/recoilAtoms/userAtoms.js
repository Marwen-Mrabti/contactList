import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
//persist the state even after refresh

const isAuthPersistState = recoilPersist({
  key: 'AuthKey',
  // this key is using to store data in local storage
  storage: localStorage, // configurate which stroage will be used to store the data
});

export const isAuthState = atom({
  key: 'AuthKey',
  default: false,
  effects_UNSTABLE: [isAuthPersistState.persistAtom],
});
