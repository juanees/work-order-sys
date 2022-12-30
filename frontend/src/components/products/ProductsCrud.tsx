import { ListResult } from "pocketbase";
import React, { useState } from "react";
import { ProductsResponse } from "../../types/db";

interface Props {
  products: ListResult<ProductsResponse>;
  add: (item: ProductsResponse) => void;
  update: (item: ProductsResponse) => void;
  delete: (id: string) => void;
}

const ProductCrud = (props: Props) => {
  const [currentItem, setCurrentItem] = useState<ProductsResponse | null>(null);

  const addOrUpdateItem = (item: ProductsResponse) => {
    if (currentItem) {
      props.update(item);
    } else {
      props.add(item);
    }
    setCurrentItem(null);
  };

  return (
    <div>
      {props.products.items.map((item: ProductsResponse) => (
        <div key={item.id}>
          {item.name}
          {item.brand}
          <button onClick={() => setCurrentItem(item)}>Edit</button>
          <button onClick={() => props.delete(item.id)}>Delete</button>
        </div>
      ))}
      {/* {currentItem ? (
        <EditProductForm
          item={currentItem}
          onSave={addOrUpdateItem}
          onCancel={() => setCurrentItem(null)}
        />
      ) : (
        <AddProductForm onSave={addOrUpdateItem} />
      )} */}
    </div>
  );
};
