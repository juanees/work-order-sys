import PocketBase, { Record, Admin } from "pocketbase";

const pb = new PocketBase(import.meta.env.VITE_BACK_END_BASE_URL);

export class AuthService {
  static async isUserLogged(): Promise<Record | Admin | null> {
    try {
      await AuthService.authRefresh();
      const { isValid, model } = pb.authStore;
      return isValid ? model : null;
    } catch (error) {
      return null;
    }
  }

  static async login(login: {
    username: string;
    password: string;
  }): Promise<Record | null> {
    const { username, password } = login;
    const user = await pb
      .collection("users")
      .authWithPassword(username, password);
    return user.record;
  }

  static async authRefresh(): Promise<Record | null> {
    try {
      const user = await pb.collection("users").authRefresh();
      return user.record;
    } catch (error) {
      return null;
    }
  }

  static logout() {
    pb.authStore.clear();
  }
}
