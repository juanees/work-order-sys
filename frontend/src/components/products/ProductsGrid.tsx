import React, { useState } from "react";
import { Button, Divider, Form, Input, Modal, Pagination, Table } from "antd";
import { ProductsRecord, ProductsResponse } from "../../types/db";
import { ListResult } from "pocketbase";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

export default function ProductsGrid({
  data,
  onChangePagination,
  onAdd,
  onEdit,
  onDelete,
}: {
  data: ListResult<ProductsResponse>;
  onChangePagination: (nextPage: number) => Promise<void>;
  onAdd: (product: ProductsRecord) => Promise<void>;
  onEdit: (product: ProductsRecord & { id: string }) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}) {
  const columns = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Marca",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Action",
      key: "action",
      render: (record: ProductsResponse) => {
        return (
          <span>
            <a
              onClick={() => {
                setCurrentItem(record);
              }}>
              <EditOutlined />
            </a>
            <Divider type="vertical" />
            <a
              onClick={() => {
                showDeleteModal(record);
              }}>
              <DeleteOutlined />
            </a>
          </span>
        );
      },
    },
  ];

  const [currentItem, setCurrentItem] = useState<
    (ProductsRecord & { id: string }) | null
  >(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const showDeleteModal = (item: ProductsRecord & { id: string }) => {
    setCurrentItem(item);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteOk = () => {
    setIsDeleteModalOpen(false);
    onDelete(currentItem!.id);
    setCurrentItem(null);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setCurrentItem(null);
  };

  const CustomPagination = ({ total, onChange, current, pageSize }: any) => {
    return (
      <Pagination
        onChange={onChange}
        total={total}
        current={current}
        pageSize={pageSize}
      />
    );
  };

  const AddOrEditItem = ({
    item,
    onSave,
    onCancel,
  }: {
    item: (ProductsRecord & { id?: string }) | null;
    onSave: (prod: ProductsRecord & { id?: string }) => void;
    onCancel: () => void;
  }) => {
    const onFinish = (values: any) => {
      // TODO: ADD ZOD VALIDATION
      onSave({ ...values } as ProductsRecord);
    };

    return (
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{
          id: item?.id ?? "",
          name: item?.name ?? "",
          brand: item?.brand ?? "",
        }}
        onFinish={onFinish}
        autoComplete="off">
        <Form.Item name="id" hidden>
          <Input />
        </Form.Item>

        <Form.Item
          label="Nombre"
          name="name"
          rules={[{ required: true, message: "Ingrese un nombre" }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Marca"
          name="brand"
          rules={[{ required: true, message: "Ingrese una marca" }]}>
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Guardar
          </Button>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button onClick={onCancel}>Limpiar</Button>
        </Form.Item>
      </Form>
    );
  };

  const isItemWithId = (
    item: ProductsRecord & { id?: string }
  ): item is ProductsRecord & { id: string } => {
    const itemWithId = item as ProductsRecord & { id?: string };
    return itemWithId.id !== undefined && itemWithId.id !== "";
  };

  return (
    <>
      <Table
        dataSource={data.items.map((i) => ({ ...i, key: i.id }))}
        columns={columns}
        pagination={false}
      />

      <CustomPagination
        total={data.totalItems}
        current={data.page}
        onChange={onChangePagination}
        pageSize={data.perPage}
      />

      <AddOrEditItem
        item={currentItem}
        onSave={(item) => {
          if (!isItemWithId(item)) {
            onAdd(item);
          } else {
            onEdit(item);
          }
          setCurrentItem(null);
        }}
        onCancel={() => setCurrentItem(null)}
      />
      <Modal
        title="Eliminar producto"
        open={isDeleteModalOpen}
        onOk={handleDeleteOk}
        onCancel={handleDeleteCancel}>
        <p>Eliminar producto {currentItem?.name}</p>
      </Modal>
    </>
  );
}
