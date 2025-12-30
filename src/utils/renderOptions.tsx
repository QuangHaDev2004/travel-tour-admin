/* eslint-disable @typescript-eslint/no-explicit-any */
import { SelectItem } from "@/components/ui/select";
import { Fragment } from "react/jsx-runtime";

export const renderOptions = (categories: any[], level = 0) => {
  return categories.map((item) => (
    <Fragment key={item.id}>
      <SelectItem
        value={item.id}
      >{`${"-- ".repeat(level)}${item.name}`}</SelectItem>

      {item.children &&
        item.children.length > 0 &&
        renderOptions(item.children, level + 1)}
    </Fragment>
  ));
};
