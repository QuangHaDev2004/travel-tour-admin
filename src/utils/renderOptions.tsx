/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment } from "react/jsx-runtime";

export const renderOptions = (categories: any[], level = 0) => {
  return categories.map((item) => (
    <Fragment key={item.id}>
      <option value={item.id}>{`${"-- ".repeat(level)}${item.name}`}</option>

      {item.children &&
        item.children.length > 0 &&
        renderOptions(item.children, level + 1)}
    </Fragment>
  ));
};
