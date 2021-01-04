import SortDesktop from "./SortDesktop.svelte";

import { render, fireEvent } from "@testing-library/svelte";
import { measurementsColumns } from "./columns";


it("should execute sort function on click", async () => {
  const sort = jest.fn((key: string) => {})
  const { getByTestId } = render(SortDesktop, {measurementsColumns,sort});
  const header = getByTestId("header00");

  await fireEvent.click(header);
  expect(sort.mock.calls.length).toBe(1);
});
