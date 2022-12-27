import { CrudModes } from "../../types/crud-modes";
import { ClientsResponse } from "../../types/db";

export function ClientView({
  mode,
  client,
}: {
  mode: CrudModes;
  client: ClientsResponse;
}): JSX.Element {
  console.log(
    "🚀 ~ file: create-read-update.tsx:11 ~ mode, client,",
    mode,
    client
  );

  return (
    <div>
      <div>{client.name}</div>
      <div>{client.address}</div>
      <div>{client.phone}</div>
    </div>
  );
}
