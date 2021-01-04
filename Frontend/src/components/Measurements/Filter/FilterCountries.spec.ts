import fetchMock from "jest-fetch-mock";
import { mocked } from "ts-jest/utils";
import { query } from "svelte-apollo";
import { filterStore, IFilter, filterDefault } from "../../../store";

import FilterCountries from "./FilterCountries.svelte";
import { render, fireEvent } from "@testing-library/svelte";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

jest.mock("svelte-apollo");
const mockedQuery = mocked(query, true);

const country = {
  name: "Tatooine",
  code: "TA",
};

mockedQuery.mockReturnValue({
  // @ts-ignore
  result: () => {
    return {
      data: {
        countries: [country],
      },
    };
  },
});

beforeAll(() => {
  fetchMock.enableMocks();
});

it("should fetch data on mount", async () => {
  const { getByTestId } = render(FilterCountries);
  let filterCountries = getByTestId("filterCountries");
  const button = getByTestId("filterCountriesButton");
  expect(
    filterCountries.querySelector('div[data-testid="countriesDropdownContent"]')
  ).not.toBe(null);
  expect(mockedQuery).toHaveBeenCalled();
});

it("should write in svelte store on select", async () => {
  const { getByTestId } = render(FilterCountries);
  let filterCountries = getByTestId("filterCountries");
  const button = getByTestId("filterCountriesButton");

  await fireEvent.click(button);
  expect(button.firstChild.textContent).toEqual("All");

  await sleep(1000);
  const countryElement = getByTestId("country1");
  await fireEvent.mouseDown(countryElement);
  expect(button.firstChild.textContent).toEqual(country.name);

  let store: IFilter;
  filterStore.subscribe((f) => {
    store = f;
  });
  expect(store.key).toEqual("country");
  expect(store.value).toEqual(country.code);

  //Reset store if placeholder is selected
  const placeholder = filterCountries.querySelector(
    'div[data-testid="country0"]'
  );
  await fireEvent.mouseDown(placeholder);
  expect(store.key).toEqual(filterDefault.key);

  filterStore.set({key:"city", value:"Paris"})
  await sleep(1000);
  expect(button.firstChild.textContent).toEqual("All");
});

it("should render error if fetch fails", async () => {
  const testError = "TEST ERROR"
  // @ts-ignore
  mockedQuery.mockReturnValue({
    result: () => {
      throw new Error(testError)
    },
  });
  const { getByTestId } = render(FilterCountries);
  let filterCountries = getByTestId("filterCountries");
  const dropdownContent = filterCountries.querySelector('div[data-testid="countriesDropdownContent"]')

  expect(dropdownContent.firstChild.textContent).toEqual(`Error loading countries: ${testError}`);
});
