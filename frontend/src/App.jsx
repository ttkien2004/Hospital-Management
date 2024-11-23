import { PrimeReactProvider } from "primereact/api";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeicons/primeicons.css"; //icons
import routes from "./routes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

function App() {
  return (
    <PrimeReactProvider>
      <ToastContainer></ToastContainer>
      <RouterProvider router={createBrowserRouter(routes)}></RouterProvider>
    </PrimeReactProvider>
  );
}

export default App;
