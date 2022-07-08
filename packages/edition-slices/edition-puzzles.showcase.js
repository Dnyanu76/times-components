import React from "react";
import { TcView } from "@times-components/utils";
import Responsive from "@times-components/responsive";
import { getPuzzleSlices } from "@times-components/fixture-generator";
import { PuzzleSlice } from "./src/slices";

const preventDefaultedAction = decorateAction =>
  decorateAction([
    ([e, ...args]) => {
      e.preventDefault();
      return ["[SyntheticEvent (storybook prevented default)]", ...args];
    }
  ]);

/* eslint-disable react/prop-types */
const renderSlice = (Component, data) => (_, { decorateAction }) => (
  <Responsive>
    <TcView>
      <Component
        onPress={preventDefaultedAction(decorateAction)("onPress")}
        slice={data}
      />
    </TcView>
  </Responsive>
);

const sliceStories = [
  {
    mock: { puzzles: getPuzzleSlices(1) },
    name: "Single Puzzle",
    Slice: PuzzleSlice
  },
  {
    mock: { puzzles: getPuzzleSlices(3) },
    name: "Multiple Puzzles",
    Slice: PuzzleSlice
  }
];

export default {
  children: sliceStories.map(({ mock, name, Slice }) => ({
    component: renderSlice(Slice, mock),
    name,
    type: "story",
    platform: "native"
  })),
  name: "Composed/Edition/Puzzles"
};
