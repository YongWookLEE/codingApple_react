import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
    name: "user",
    initialState: { name: "Lee", age: 20 },
  
    reducers: {
      changeNm(state) {
        state.name = "john " + state.name;
      },
      changeAge(state, action){
        state.age = state.age + action.payload
      }
    },
  });

  export let { changeNm, changeAge } = user.actions;

  export default user;


  // state 변경하는 함수를 reducers를 통해 만들어 놓는다.
// export 해준다.
// 쓰려고 하는곳에서 dispatch를 통해 함수를 호출해 사용해준다.(import 필수)
