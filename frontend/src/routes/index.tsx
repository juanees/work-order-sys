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
import {
  ProductPage,
  ProductLoader,
  ProductsPage,
  ProductsLoader,
} from "./products";

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
      {
        path: "/products/",
        element: <ProductsPage />,
        loader: ProductsLoader,
      },
      {
        path: "/products/:productId",
        element: <ProductPage />,
        loader: ProductLoader,
      },
    ],
  },
  { id: "login", path: "/login", element: <LoginPage />, loader: LoginLoader },
]);
