import { createSlice, current } from "@reduxjs/toolkit";

const cart = createSlice({
  name: "cart",
  initialState: [
    { id: 0, name: "White and Black", count: 2 },
    { id: 2, name: "Grey Yordan", count: 1 },
  ],

  reducers: {
    changeCnt(state, action) {
      let target = state.find((m) => m.id === action.payload.id);
      if (target.count <= 0 && action.payload.amt < 0) return;
      target.count += action.payload.amt;
    },
    addItem(state, action) {
      let target = action.payload;
      console.log(current(state)); // redux에서 state를 보려면 current 내장함수 써야한다.
      if (state.find((i) => i.id === target.id) === undefined) {
        state.push({ id: target.id, name: target.title, count: 1 });
        alert("장바구니에 추가되었습니다.");
        return;
      }

      alert("이미 추가된 항목입니다.");
    },
    deleteItem(state, action) {
      const idx = state.findIndex((e) => e.id === action.payload);
      state.splice(idx, 1);
    },
  },
});

export let { changeCnt, addItem, deleteItem } = cart.actions;

export default cart;
