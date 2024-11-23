import { PrimeReactProvider } from "primereact/api";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import routes from "./routes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  return (
    <PrimeReactProvider>
      <ToastContainer></ToastContainer>
      <RouterProvider router={createBrowserRouter(routes)}></RouterProvider>
    </PrimeReactProvider>
  );
}

export default App;
