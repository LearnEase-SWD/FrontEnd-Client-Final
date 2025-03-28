import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import { store } from "./redux/store/store.ts";
import ErrorBoundary from "./utils/errorBoundary.tsx";

createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId="600509284504-p168tctt0mfp7ouedr5fpu5g7en4ehge.apps.googleusercontent.com">
    <ErrorBoundary>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>
  </GoogleOAuthProvider>
);
