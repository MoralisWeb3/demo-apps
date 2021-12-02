import { UserModel } from "./../models/User";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { MoralisObject } from "../config/moralis";
import store from "../store/index";

const CheckLogin = async () => {
  const user: UserModel = await MoralisObject.User.current();
  if (!user) throw new Error("Unauthorized");
  store.commit("User/setUser", user);
};

export default class RouterGuard {
  static async Login(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ): Promise<void> {
    try {
      await CheckLogin();
      next();
    } catch (error) {
      const redirectLocation =
        "/login" + to.fullPath == "/dashboard"
          ? ""
          : "?redirect=" + to.fullPath;
      next(redirectLocation);
    }
  }

  static async Continue(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ): Promise<void> {
    try {
      await CheckLogin();
      next();
    } catch (error) {
      next();
    }
  }
}
