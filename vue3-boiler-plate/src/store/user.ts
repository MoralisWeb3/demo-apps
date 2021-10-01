import {
  Module,
  VuexModule,
  Mutation,
  getModule,
} from "vuex-module-decorators";
import store from ".";
import { UserModel } from "../models/User";

@Module({ dynamic: true, store: store, namespaced: true, name: "User" })
export class UserModule extends VuexModule {
  user: Partial<UserModel> = {};

  @Mutation
  SET_USER(user: UserModel): void {
    this.user = user;
  }
}

export const userModule = getModule(UserModule);
