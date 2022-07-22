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
    /* SAGAS */
    set: (_some: any) => post.set(_some),
    asyncAction: async () => {
      const response = await (await fetch("")).json;
      post.set(response);
    },
    /* SELECTORS */
    get: () => post.get(),
  };
};
