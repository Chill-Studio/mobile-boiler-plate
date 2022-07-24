import { DevTools, useState } from "@hookstate/core";
import { store } from "../root/root.store";
import { config } from "@configs";

export const usePost = () => {
  const { post } = useState(store);
  config.debugStore?.post &&
    console.log(
      "===STORE DEBUG=== : \n post:",
      JSON.stringify(post.value, null, 2)
    );
  return {
    post: post,
    /* SAGAS */
    someAsyncAction: async () => {
      // const response = await (await fetch("")).json;
      post.title.set("This was set from a saga");
    },
    /* SELECTORS */
    someGet: () => post.get().content.toLocaleLowerCase(),
  };
};
