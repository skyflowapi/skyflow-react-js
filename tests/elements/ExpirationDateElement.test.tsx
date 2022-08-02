/*
	Copyright (c) 2022 Skyflow, Inc. 
*/
import * as React from "react";
import { render } from "@testing-library/react";
import CollectContainer from "skyflow-js/types/core/external/collect/CollectContainer";
import { ExpirationDateElement } from "../../src/elements";

jest.mock("../../src/hooks/useCollectContainer");

describe("ExpiryDateElement", () => {
  let container: CollectContainer;
  let table: string;
  let column: string;
  let id: string;
  let label: string;
  let placeholder: string;
  let errorText: string;
  let validations: Array<Object>;
  let classes: Object;
  let onChange: jest.Mock;
  let onFocus: jest.Mock;
  let onBlur: jest.Mock;
  let onReady: jest.Mock;

  test("should match snapshot", () => {
    const expiryDateContainer = render(
      <ExpirationDateElement
        container={container}
        table={"table1"}
        classes={classes}
        column={"card_number"}
        label={"Collect Card Number"}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        onReady={onReady}
      />
    );
    expect(expiryDateContainer).toMatchSnapshot();
  });
});
