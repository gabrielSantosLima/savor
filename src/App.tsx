import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";

import "./global_styles.css";

export function App() {
  return <RouterProvider router={routes} />;
}
