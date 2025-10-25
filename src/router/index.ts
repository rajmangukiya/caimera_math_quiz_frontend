import { createBrowserRouter } from "react-router";
import { MainLayout } from "../layout/MainLayout";
import { Home } from "../pages/home";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        path: "/",
        Component: Home,
      },
    ],
  }
]);

export default router;
