import fetchMock from "jest-fetch-mock";
import FilterMobile from "./FilterMobile.svelte";
import { render, fireEvent } from "@testing-library/svelte";

beforeAll(() => {
  fetchMock.enableMocks();
});

it("should FilterCountries and FilterCities", async () => {
  const { getByTestId } = render(FilterMobile);
  const filterMobile = getByTestId("filterMobile");
  const toggleContainer = getByTestId("filterMobileToggle");

  await fireEvent.click(toggleContainer)

  expect(
    filterMobile.querySelector('div[data-testid="filterCountries"]')
  ).not.toBe(null);
  expect(
    filterMobile.querySelector('div[data-testid="filterCities"]')
  ).not.toBe(null);
});
