import { createStore } from "vuex";
import user from "./modules/UserModule";

export default createStore({
  modules: {
    user,
  },
});
