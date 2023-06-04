import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import { QueryClient, QueryClientProvider } from "react-query";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

const queryClient = new QueryClient();
export let persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    {" "}
    {/*리액트 쿼리를 사용하기 위함**/}
    <Provider store={store}>
      {" "}
      {/*리덕스를 사용하기 위함*/}
      <PersistGate loading={null} persistor={persistor}>
        {" "}
        {/*리덕스 퍼시스트를 사용하기 위함**/}
        <BrowserRouter>
          {" "}
          {/*라우터를 사용하기 위함**/}
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </QueryClientProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
