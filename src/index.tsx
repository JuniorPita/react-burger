/* Общие импорты */
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import store from "./services/store";

/* Стили */
import "./index.css";

/* Компоненты */
import App from "./components/app/app";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  // <StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  // </StrictMode>
);

reportWebVitals();
