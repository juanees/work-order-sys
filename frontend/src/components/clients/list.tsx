import { ClientsResponse } from "../../types/db-types";

export function ClientListView({
  clients,
}: {
  clients: ClientsResponse[] | null;
}): JSX.Element {
  return (
    <div>
      <code>{JSON.stringify(clients)}</code>
    </div>
  );
}
