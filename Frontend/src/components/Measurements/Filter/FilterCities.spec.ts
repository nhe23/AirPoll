import fetchMock from "jest-fetch-mock";
import { mocked } from "ts-jest/utils";
import { query } from "svelte-apollo";
import { filterStore, IFilter } from "../../../store";

import FilterCities from "./FilterCities.svelte";
import { render, fireEvent } from "@testing-library/svelte";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

jest.mock("svelte-apollo");
const mockedQuery = mocked(query, true);

const cityName = "Paris";

mockedQuery.mockReturnValue({
  // @ts-ignore
  result: () => {
    return {
      data: {
        citiesStartsWith: [
          {
            name: cityName,
          },
        ],
      },
    };
  },
});

beforeAll(() => {
  fetchMock.enableMocks();
});

it("should fetch data on input change", async () => {
  const { getByTestId } = render(FilterCities);
  let filterCities = getByTestId("filterCities");
  const input = getByTestId("searchCities");
  expect(
    filterCities.querySelector('div[data-testid="citiesDropdownContent"]')
  ).not.toBe(null);

  await fireEvent.focus(input);
  await fireEvent.input(input, { target: { value: "Par" } });

  //Sleep because input is debounced
  await sleep(1000);
  expect(mockedQuery).toHaveBeenCalled();
});

it("should write in svelte store on select", async () => {
  const { getByTestId } = render(FilterCities);
  const filterCities = getByTestId("filterCities");
  const input = getByTestId("searchCities") as HTMLInputElement;

  await fireEvent.focus(input);
  await fireEvent.input(input, { target: { value: "Par" } });

  //Sleep because input is debounced
  await sleep(1000);

  const city = filterCities.querySelector('div[data-testid="city0"]');
  await fireEvent.mouseDown(city);
  let store: IFilter;
  filterStore.subscribe((f) => {
    store = f;
  });
  expect(store.key).toEqual("city");
  expect(store.value).toEqual(cityName);

  filterStore.set({key:"country", value:"FR"})
  await sleep(1000);
  expect(input.value).toEqual("")
});

