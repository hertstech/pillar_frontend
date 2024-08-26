import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";
import ThemeProvider from "./Provider/index.tsx";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store.ts";
import {
  RecoilRoot,

} from "recoil";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <RecoilRoot>
            <App />
          </RecoilRoot>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </HelmetProvider>
);
