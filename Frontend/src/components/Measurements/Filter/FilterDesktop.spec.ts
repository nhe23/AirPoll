import fetchMock from "jest-fetch-mock";
import FilterDesktop from "./FilterDesktop.svelte";
import { render } from "@testing-library/svelte";

beforeAll(() => {
  fetchMock.enableMocks();
});

it("should FilterCountries and FilterCities", async () => {
  const { getByTestId } = render(FilterDesktop);
  const filterDesktop = getByTestId("filterDesktop");

  expect(
    filterDesktop.querySelector('div[data-testid="filterCountries"]')
  ).not.toBe(null);
  expect(
    filterDesktop.querySelector('div[data-testid="filterCities"]')
  ).not.toBe(null);
});
