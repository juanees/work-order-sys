import { createBrowserRouter } from "react-router-dom";
import { RootPage, RootLoader } from "./root";
import { ErrorPage } from "./error";
import {
  ClientPage,
  ClientLoader,
  ClientsPage,
  ClientsLoader,
} from "./clients";
import LoginPage, { LoginLoader } from "./auth";

export default createBrowserRouter([
  {
    id: "root",
    path: "/",
    element: <RootPage />,
    loader: RootLoader,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/clients/",
        element: <ClientsPage />,
        loader: ClientsLoader,
      },
      {
        path: "/clients/:clientId",
        element: <ClientPage />,
        loader: ClientLoader,
      },
    ],
  },
  { id: "login", path: "/login", element: <LoginPage />, loader: LoginLoader },
]);
