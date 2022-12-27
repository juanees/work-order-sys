import { ListResult } from "pocketbase";
import { useLoaderData } from "react-router-dom";
import { ClientListView } from "../../../components";
import { CollectionsService } from "../../../services/collections";
import { ClientsResponse } from "../../../types/db";

export async function ClientsLoader() {
  const service = new CollectionsService<ClientsResponse>("clients");
  const clients = await service.getAll();
  return clients;
}

export function ClientsPage() {
  const loadedData = useLoaderData() as ListResult<ClientsResponse>;
  const pagination = {
    page: loadedData.page,
    perPage: loadedData.perPage,
    totalItems: loadedData.totalItems,
    totalPages: loadedData.totalPages,
  };
  return <ClientListView clients={loadedData.items} pagination={pagination} />;
}
