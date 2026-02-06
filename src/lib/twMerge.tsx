import { extendTailwindMerge } from "tailwind-merge";

type AdditionalClassGroupIds = "typography";

type AdditionalThemeGroupIds = never;

export const twMergeExtended = extendTailwindMerge<
  AdditionalClassGroupIds,
  AdditionalThemeGroupIds
>({
  extend: {
    classGroups: {
      typography: [
        "headline-1",
        "headline-2",
        "headline-3",
        "headline-4",
        "headline-5",
        "headline-6",
        "subtitle-1",
        "subtitle-2",
        "body-1",
        "body-2",
        "button-text",
        "caption",
        "overline-text",
      ],
    },
  },
});
