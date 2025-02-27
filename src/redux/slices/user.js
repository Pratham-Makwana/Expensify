import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user: null,
  userLoading: false,
};

export const counterSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      // console.log('==> setUser ', action.payload);

      state.user = action.payload;
    },
    setUserLoading: (state, action) => {
      console.log('==> setUserLoading ', action.payload);
      state.userLoading = action.payload;
    },
  },
});


export const {setUser, setUserLoading} = counterSlice.actions;

export default counterSlice.reducer;
