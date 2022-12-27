import { redirect, useNavigate, useSearchParams } from "react-router-dom";
import { AuthService } from "../../services";

export async function LoginLoader() {
  if (await AuthService.isUserLogged()) {
    return redirect("/");
  }
  return null;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const [searchParams, _] = useSearchParams();
  console.log(
    "🚀 ~ file: index.tsx:14 ~ LoginPage ~ searchParams",
    searchParams
  );

  const login = (event: any) => {
    // Prevent default behavior
    event.preventDefault();

    const data = new FormData(event.target);

    AuthService.login({
      username: data.get("username")?.toString() || "",
      password: data.get("password")?.toString() || "",
    })
      .then(() => navigate(searchParams.get("redirect_url") || "/"))
      .catch((err) => {
        console.log("🚀 ~ file: index.tsx:23 ~ onFinish ~ err", err);
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={login}>
        <input type="text" name="username" placeholder="username" />
        <input type="password" name="password" placeholder="password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
