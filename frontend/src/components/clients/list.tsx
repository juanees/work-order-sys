import { ClientsResponse } from "../../types/db";

export function ClientListView({
  clients,
  pagination,
}: {
  clients: ClientsResponse[];
  pagination: {
    page: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
  };
}): JSX.Element {
  const listClient = clients?.map((c) => (
    <tr>
      <td>{c.name}</td>
      <td>{c.address}</td>
      <td>{c.phone}</td>
    </tr>
  ));
  return (
    <div>
      <table>
        <tr>
          <th>Nombre</th>
          <th>Dirección</th>
          <th>Numero de telefono</th>
        </tr>
        {listClient}
      </table>
      <div>
        <span>page: {pagination.page}</span>
        <span>perPage: {pagination.perPage}</span>
        <span>totalItems: {pagination.totalItems}</span>
        <span>totalPages: {pagination.totalPages}</span>
      </div>
    </div>
  );
}
