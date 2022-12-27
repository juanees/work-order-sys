import { ListResult } from "pocketbase";
import { useLoaderData } from "react-router-dom";
import { ClientListView } from "../../../components";
import { CollectionsService } from "../../../services";
import { ClientsResponse } from "../../../types/db-types";

export async function ClientsLoader() {
  const service = new CollectionsService<ClientsResponse>("clients");
  const clients = await service.getAll();
  return clients;
}

export function ClientsPage() {
  const loadedData = useLoaderData() as ListResult<ClientsResponse>;
  return <ClientListView clients={loadedData.items} />;
}
