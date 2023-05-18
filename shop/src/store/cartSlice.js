import { createSlice } from "@reduxjs/toolkit";

const cart = createSlice({
    name: "cart",
    initialState: [
      { id: 0, name: "White and Black", count: 2 },
      { id: 2, name: "Grey Yordan", count: 1 },
    ],

    reducers: {
        changeCnt(state, id){
            let target =state.find(m => m.id === id.payload);
            target.count++;
        },
        addItem(state, item){
            let target = item.payload;

            if (state.find(i => i.id === target.id) === undefined){
                state.push({ id: target.id, name: target.title, count: 1 });
                alert("장바구니에 추가되었습니다.")
                return ;
            }

            alert("이미 추가된 항목입니다.");
        }
    }
  });
  // 항목 지우기 버튼
  // 수량 줄이기 버튼 / 1에서 -시켰을때 처리

  export let {changeCnt, addItem} = cart.actions

  export default cart;