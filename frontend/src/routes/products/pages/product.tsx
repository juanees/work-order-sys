import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";

import { CollectionsService } from "../../../services/collections";
import { ProductsResponse } from "../../../types/db";

export async function ProductLoader({ params }: LoaderFunctionArgs) {
  if (!params["productId"]) {
    throw new Response("", {
      status: 400,
      statusText: "No se encontró el producto",
    });
  }
  const service = new CollectionsService<ProductsResponse>("products");
  try {
    const client = await service.get(params.productId);
    return client;
  } catch (error) {
    throw new Response(params.productId, {
      status: 400,
      statusText: `No se encontró el producto: ${params.productId}`,
    });
  }
}

export function ProductPage() {
  const loadedData = useLoaderData() as ProductsResponse;
  return <></>;
}
