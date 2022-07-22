import { createState } from "@hookstate/core";
import { Store } from "../../typings/store-root.typing";
import { POST_INITIAL_STATE } from "../post/post-initial-state.store";

/* STORE CREATION */
export const store = createState<Store>({
  post: POST_INITIAL_STATE,
});
