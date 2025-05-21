import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { store } from "./app/store";
import Router from "./routes/Router";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectTheme } from "./app/features/themeSlice";

function App() {
  const theme = useSelector(selectTheme);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <Router />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
