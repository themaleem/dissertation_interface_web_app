import { createSlice, nanoid } from "@reduxjs/toolkit";

export const INITIAL_STATE = [];

const notificationSlice = createSlice({
  name: "notification",
  initialState: INITIAL_STATE,
  reducers: {
    showNotification: {
      reducer: (state, action) => {
        state.push(action.payload);
      },
      prepare: (message) => ({
        payload: { id: nanoid(), message, visible: true },
      }),
    },
    hideNotification: (state, action) => {
      const index = state.findIndex(
        (notification) => notification.id === action.payload,
      );
      if (index !== -1) {
        state[index].visible = false;
      }
      state[index].visible = false;
    },

    // @todo delete notification from global state on remove and hide
    removeNotification: (state, action) => {
      return state.filter((notification) => notification.id !== action.payload);
    },
  },
});

export const { showNotification, hideNotification, removeNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;
