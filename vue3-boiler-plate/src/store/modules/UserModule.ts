import { UserModel } from "@/models/User";

export default {
  namespaced: true,
  name: "User",
  state(): UserState {
    return {
      user: {} as UserModel,
    };
  },
  mutations: {
    setUser(state: UserState, user: UserModel): void {
      state.user = user;
    },
  },
};

interface UserState {
  user: UserModel;
}
