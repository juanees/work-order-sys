import React, { useState } from "react";
import { ListResult } from "pocketbase";
import { useLoaderData } from "react-router-dom";

import ProductsGrid from "../../../components/products/ProductsGrid";

import { CollectionsService } from "../../../services/collections";
import { ProductsRecord, ProductsResponse } from "../../../types/db";

const service = new CollectionsService<ProductsResponse>("products");
export async function ProductsLoader() {
  const products = await service.getAll({ sort: "-created" });
  return products;
}

export function ProductsPage() {
  const loadedData = useLoaderData() as ListResult<ProductsResponse>;
  const [data, setData] = useState(loadedData);
  return (
    <ProductsGrid
      data={data}
      onChangePagination={async function (nextPage): Promise<void> {
        const data = await service.getAll({
          page: nextPage,
          sort: "-created",
        });
        setData(data);
      }}
      onAdd={async function (product: ProductsRecord): Promise<void> {
        await service.create(product);
        service.getAll().then(setData).catch(console.error);
      }}
      onEdit={async function (
        product: ProductsRecord & { id: string }
      ): Promise<void> {
        await service.update(product);
        service.getAll().then(setData).catch(console.error);
      }}
      onDelete={async function (id: string): Promise<void> {
        await service.delete(id);
        service.getAll().then(setData).catch(console.error);
      }}
    />
  );
}
