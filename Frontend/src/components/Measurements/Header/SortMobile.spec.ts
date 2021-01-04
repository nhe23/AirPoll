import SortMobile from "./SortMobile.svelte";

import { render, fireEvent } from "@testing-library/svelte";
import { measurementsColumns } from "./columns";

const sort = jest.fn((key: string) => {})
it("should show tags if container is clicked", async () => {
  const { getByTestId, } = render(SortMobile, {measurementsColumns,sort});
  let rootContainer = getByTestId("rootContainer");
  expect(rootContainer.querySelector('div[data-testid="tags"]')).toBe(null)
  const toggleTagsContainer = getByTestId("toggleTags");
  await fireEvent.click(toggleTagsContainer);
  expect(rootContainer.querySelector('div[data-testid="tags"]')).not.toBe(null)
});

it("should execute sort function on click", async () => {
  const { getByTestId, } = render(SortMobile, {measurementsColumns,sort});
  const toggleTagsContainer = getByTestId("toggleTags");
  await fireEvent.click(toggleTagsContainer);
  const header = getByTestId("header00");
  await fireEvent.click(header);
  expect(sort.mock.calls.length).toBe(1);
})
