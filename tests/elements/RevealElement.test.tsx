/*
	Copyright (c) 2022 Skyflow, Inc. 
*/
import * as React from "react";
import { render } from "@testing-library/react";
import CollectContainer from "skyflow-js/types/core/external/collect/CollectContainer";
import RevealElement from "../../src/elements/RevealElement";
import RevealContainer from "skyflow-js/types/core/external/reveal/RevealContainer";

jest.mock("../../src/hooks/RevealContainer");

describe("RevealElement", () => {
  let container: RevealContainer;
  let token: string;
  let id: string;
  let label: string;
  let classes: Object;

  test("should match snapshot", () => {
    const revealElement = render(
      <RevealElement
        container={container}
        id={id}
        token={token}
        classes={classes}
        label={label}
      />
    );
    expect(revealElement).toMatchSnapshot();
  });
});
