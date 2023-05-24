import { createSlice } from "@reduxjs/toolkit";

const testSlice = createSlice({
    name: "testSlice",
    initialState: { data1: "test1", data2: "test2"},

    reducers: {
        changeTest1(state){
            state.data1 = "changeTest1";
        },

        changeTest2(state, action){
            state.data2 = state.data2 + action.payload;
        }
    }
})

export let {changeTest1, changeTest2} = testSlice.actions;

export default testSlice;