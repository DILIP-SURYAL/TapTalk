import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store.js";
import { Provider } from "react-redux";
import { SocketContext, socket } from "./socket/socket.js";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <SocketContext.Provider value={socket}>
          <App />
        </SocketContext.Provider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
