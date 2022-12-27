import PocketBase, { ListResult } from "pocketbase";

export interface FetchQuery {
  // The page (aka. offset) of the paginated list (default to 1).
  page?: number;

  // Specify the max returned records per page (default to 30).
  perPage?: number;

  // Specify the records order attribute(s).
  // Add - / + (default) in front of the attribute for DESC / ASC order. Ex.:
  //    DESC by created and ASC by id -> '-created,id'
  sort?: string;

  // Filter the returned records. Ex.:
  //    id='abc' && created>'2022-01-01'
  filter?: string;

  // Auto expand record relations. Ex.:
  //    relField1,relField2.subRelField
  expand?: string;
}

export interface ICollectionsService<T> {
  getAll(query?: FetchQuery): Promise<ListResult<T> | Error>;
  get(id: string): Promise<T | Error>;
  update(entity: { id: string }): Promise<T | Error>;
  create(entity: any): Promise<T | Error>;
  delete(id: string): Promise<boolean | Error>;
}

export class CollectionsService<T> implements ICollectionsService<T> {
  constructor(private readonly collectionName: string) {}

  private client: PocketBase = new PocketBase(
    import.meta.env.VITE_BACK_END_BASE_URL
  );

  getAll(query?: FetchQuery): Promise<ListResult<T>> {
    try {
      return new Promise<ListResult<T>>((resolve, reject) => {
        query = query || {};
        this.client
          .collection(this.collectionName)
          .getList<T>(query.page || 1, query.perPage || 30, { ...query })
          .then((list) => resolve(list))
          .catch((err) => reject(err));
      });
    } catch (error) {
      throw error;
    }
  }

  get(id: string): Promise<T> {
    try {
      return new Promise<T>((resolve, reject) => {
        this.client
          .collection(this.collectionName)
          .getOne<T>(id)
          .then((one) => resolve(one))
          .catch((err) => reject(err));
      });
    } catch (error) {
      throw error;
    }
  }

  update(entity: { id: string }): Promise<T> {
    try {
      return new Promise<T>((resolve, reject) => {
        this.client
          .collection(this.collectionName)
          .update<T>(entity.id, entity)
          .then((one) => resolve(one))
          .catch((err) => reject(err));
      });
    } catch (error) {
      throw error;
    }
  }

  create(entity: any): Promise<T> {
    try {
      return new Promise<T>((resolve, reject) => {
        this.client
          .collection(this.collectionName)
          .create<T>(entity)
          .then((created) => resolve(created))
          .catch((err) => reject(err));
      });
    } catch (error) {
      throw error;
    }
  }

  delete(id: string): Promise<boolean> {
    try {
      return new Promise((resolve, reject) => {
        this.client
          .collection(this.collectionName)
          .delete(id)
          .then((one) => resolve(one))
          .catch((err) => reject(err));
      });
    } catch (error) {
      throw error;
    }
  }
}
