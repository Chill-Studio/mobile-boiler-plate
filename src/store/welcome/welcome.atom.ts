import { atom } from "jotai";
import { selectAtom } from "jotai/utils";

export const projectAtom = atom({
  project: {
    technologies: ["React", "Typescript", "Jotaï"],
  },
});
projectAtom.debugLabel = "project";

export const technologyListAtom = selectAtom(
  projectAtom,
  ({ project: { technologies } }) => technologies
);
