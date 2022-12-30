import React, { useEffect, useState } from "react";
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
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState(loadedData);

  useEffect(() => {
    updateData();
  }, [currentPage]);

  const updateData = () => {
    service
      .getAll({
        page: currentPage,
        sort: "-created",
      })
      .then(setData)
      .catch(console.error);
  };

  return (
    <ProductsGrid
      data={data}
      onChangePagination={(nextPage) => {
        setCurrentPage(nextPage);
      }}
      onAdd={(product) => {
        service.create(product).then(updateData).catch(console.error);
      }}
      onEdit={(product) => {
        service.update(product).then(updateData).catch(console.error);
      }}
      onDelete={(id) => {
        service.delete(id).then(updateData).catch(console.error);
      }}
    />
  );
}
