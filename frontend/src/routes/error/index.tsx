import { useRouteError, useNavigate } from "react-router-dom";

export function ErrorPage() {
  const error = useRouteError() as { statusText?: string; message?: string };
  const navigate = useNavigate();

  console.log("🚀 ~ file: index.tsx:5 ~ Error ~ error", error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>
        <i>
          {error.statusText ||
            error.message ||
            "Lo sentimos, ha ocurrido un error inesperado"}
        </i>
      </p>
      <button onClick={() => navigate(-1)}>Go back</button>
    </div>
  );
}
