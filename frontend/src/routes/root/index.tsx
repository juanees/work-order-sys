import {
  Link,
  LoaderFunctionArgs,
  Outlet,
  redirect,
  useNavigate,
} from "react-router-dom";
import { AuthService } from "../../services";

export async function RootLoader({ request: { url } }: LoaderFunctionArgs) {
  if (await AuthService.isUserLogged()) {
    return null;
  }

  const searchParam = new URLSearchParams();
  searchParam.append("redirect_url", new URL(url).pathname);

  return redirect("/login?" + searchParam.toString());
}
export function RootPage() {
  const navigate = useNavigate();

  const closeSession = () => {
    AuthService.logout();
    return navigate("/login");
  };

  return (
    <>
      <div id="sidebar">
        <nav>
          <ul>
            <li>
              <Link to={``}>Dashboard</Link>
            </li>
            <li>
              <Link to={`work-orders`}>Work orders</Link>
            </li>
            <li>
              <Link to={`clients`}>Clients</Link>
              <ul>
                <li>
                  <Link to={`clients/i86cwkq4sltr6sw`}>Client test</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to={`products`}>Products</Link>
            </li>
            <li>
              <button onClick={closeSession}>Cerrar sesión</button>
            </li>
          </ul>
        </nav>
        <Outlet />
      </div>
    </>
  );
}
