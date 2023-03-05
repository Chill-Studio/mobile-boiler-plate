import { POST_INITIAL_STATE } from "../post/post-initial-state.store";
import { Store } from "../../typings/store-root.typing";
import { hookstate } from "@hookstate/core";

/* STORE CREATION */
export const store = hookstate<Store>({
  post: POST_INITIAL_STATE,
});
