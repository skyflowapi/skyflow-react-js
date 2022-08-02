/*
	Copyright (c) 2022 Skyflow, Inc. 
*/
import * as React from "react";
import { render } from "@testing-library/react";
import CollectContainer from "skyflow-js/types/core/external/collect/CollectContainer";
import ExpirationYearElement from "../../src/elements/ExpirationYear";

jest.mock("../../src/hooks/CollectContainer");

describe("ExpiryYearElement", () => {
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
    const expiryYearContainer = render(
      <ExpirationYearElement
        container={container}
        table={"table1"}
        classes={classes}
        column={"exp_year"}
        label={"Collect Expiry Year"}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        onReady={onReady}
      />
    );
    expect(expiryYearContainer).toMatchSnapshot();
  });
});
