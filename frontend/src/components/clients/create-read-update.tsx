import { CrudModes } from "../../types/crud-modes";
import { ClientsResponse } from "../../types/db-types";

export function ClientView({
  mode,
  client,
}: {
  mode: CrudModes;
  client: ClientsResponse | null;
}): JSX.Element {
  console.log(
    "🚀 ~ file: create-read-update.tsx:11 ~ mode, client,",
    mode,
    client
  );

  return (
    <>
      <div>{mode}</div>
      <div>
        <code>{JSON.stringify(client)}</code>
      </div>
    </>
  );
}
