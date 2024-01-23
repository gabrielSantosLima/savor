import { createBrowserRouter } from "react-router-dom";
import { MainPage } from "./pages/MainPage";
import { NotFound } from "./pages/NotFound";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
