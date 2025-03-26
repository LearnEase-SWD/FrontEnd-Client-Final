import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import { store } from "./redux/store/store.ts";
import ErrorBoundary from "./utils/errorBoundary.tsx";

createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId="12105794051-m9vscderip9vtvhqh04t75ic5efpej4e.apps.googleusercontent.com">

    <ErrorBoundary>


      <Provider store={store}>
        <App />
      </Provider>
      </ErrorBoundary>
  </GoogleOAuthProvider>
);
