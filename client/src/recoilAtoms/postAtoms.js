import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const userPostPersistState = recoilPersist({
  key: 'userPost',
  storage: localStorage,
});
export const userPostState = atom({
  key: 'userPost',
  default: {
    text: '',
    createdAt: new Date().toISOString(),
  },
  effects_UNSTABLE: [userPostPersistState.persistAtom],
});

/********************************/
const openAddPostModalPersistState = recoilPersist({
  key: 'openAddPostModal',
  storage: localStorage,
});
export const openAddPostModalState = atom({
  key: 'openAddPostModal',
  default: false,
  effects_UNSTABLE: [openAddPostModalPersistState.persistAtom],
});
