import { store } from "../root/root.store";
import { useHookstate } from "@hookstate/core";

export const usePost = () => {
  const { post } = useHookstate(store);

  return {
    post,
    /* SAGAS */
    someAsyncAction: async (title: string) => {
      // const response = await (await fetch("")).json;
      post.title.set(title);
    },
    /* SELECTORS */
    someGet: () => post.get().content.toLocaleLowerCase(),
  };
};
