import { Link, Outlet } from "react-router-dom";

export async function RootLoader() {
  return null;
}
export function RootPage() {
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
          </ul>
        </nav>
        <Outlet />
      </div>
    </>
  );
}
