import { createStore } from "vuex";
import User from "@/store/modules/UserModule";

export default createStore({
  modules: {
    User,
  },
});
