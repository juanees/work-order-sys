import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { ClientView } from "../../../components";
import { CollectionsService } from "../../../services/collections";
import { ClientsResponse } from "../../../types/db-types";

export async function ClientLoader({ params }: LoaderFunctionArgs) {
  if (!params["clientId"]) {
    throw new Response("", {
      status: 400,
      statusText: "No se encontró el cliente",
    });
  }
  const service = new CollectionsService<ClientsResponse>("clients");
  try {
    const client = await service.get(params.clientId);
    return client;
  } catch (error) {
    throw new Response(params.clientId, {
      status: 400,
      statusText: `No se encontró el cliente: ${params.clientId}`,
    });
  }
}

export function ClientPage() {
  const loadedData = useLoaderData() as ClientsResponse;
  return <ClientView mode="view" client={loadedData} />;
}
