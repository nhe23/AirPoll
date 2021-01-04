import fetchMock from "jest-fetch-mock";
import { mocked } from "ts-jest/utils";
import { query } from "svelte-apollo";
import MeasurementsList from "./MeasurementsList.svelte";
import { render, fireEvent } from "@testing-library/svelte";
import { filterStore, IFilter, filterDefault } from "../../store";
import {
  measurements,
  measurementsByCountry,
  measurementsByCity,
} from "./mock/measurements";
import { sleep } from "../../helpers/sleep";

beforeAll(() => {
  fetchMock.enableMocks();
});

let mockedQuery: any;
jest.mock("svelte-apollo");
mockedQuery = mocked(query, true);

mockedQuery.mockReturnValue({
  // @ts-ignore
  result: () => {
    return measurements;
  },
});
afterEach(() => {
  jest.clearAllMocks();
});

test("should render header and measurements", async () => {
  const { getByTestId } = render(MeasurementsList);
  const container = getByTestId("measurementsContainer");
  await sleep(1000);

  expect(container.querySelector('div[data-testid="header"]')).not.toBe(null);

  expect(
    container.querySelector('div[data-testid="measurementDesktop"]')
  ).not.toBe(null);
});

test("should sort measurements correctly by text", async () => {
  const { getByTestId } = render(MeasurementsList);
  const container = getByTestId("measurementsContainer");
  await sleep(1000);

  const header = getByTestId("header00");

  const locations = container.querySelectorAll(
    'span[data-testid="locationDesktop"]'
  );
  expect(locations[0].firstChild.textContent).toBe(
    measurements.data.measurements[0].location
  );
  expect(locations[locations.length - 1].firstChild.textContent).toBe(
    measurements.data.measurements[measurements.data.measurements.length - 1]
      .location
  );
  await fireEvent.click(header);
  await sleep(100);
  expect(locations[0].firstChild.textContent).toBe(
    measurements.data.measurements[measurements.data.measurements.length - 1]
      .location
  );
  expect(locations[locations.length - 1].firstChild.textContent).toBe(
    measurements.data.measurements[0].location
  );
});

test("should sort measurements correctly by date", async () => {
  const { getByTestId } = render(MeasurementsList);
  const container = getByTestId("measurementsContainer");
  await sleep(1000);

  const header = getByTestId("header50");

  const updated = container.querySelectorAll(
    'span[data-testid="updatedDesktop"]'
  );
  const measurementsData = measurements.data.measurements;
  expect(updated[0].firstChild.textContent).toBe(
    measurementsData[0].measurements[0].lastUpdated
  );
  expect(updated[updated.length - 1].firstChild.textContent).toBe(
    measurementsData[measurementsData.length - 1].measurements[0].lastUpdated
  );
  await fireEvent.click(header);
  await sleep(100);
  expect(updated[0].firstChild.textContent).toBe(
    measurementsData[measurementsData.length - 1].measurements[0].lastUpdated
  );
  expect(updated[updated.length - 1].firstChild.textContent).toBe(
    measurementsData[0].measurements[0].lastUpdated
  );
});

test("should sort measurements correctly by number", async () => {
  const { getByTestId } = render(MeasurementsList);
  const container = getByTestId("measurementsContainer");
  await sleep(1000);

  const header = getByTestId("header30");

  const updated = container.querySelectorAll(
    'span[data-testid="valueDesktop"]'
  );
  const measurementsData = measurements.data.measurements;
  const value0 = `${measurementsData[0].measurements[0].value}`;
  const value1 = `${
    measurementsData[measurementsData.length - 1].measurements[0].value
  }`;
  expect(updated[0].firstChild.textContent).toBe(value0);
  expect(updated[updated.length - 1].firstChild.textContent).toBe(value1);
  await fireEvent.click(header);
  await sleep(100);
  expect(updated[0].firstChild.textContent).toBe(value1);
  expect(updated[updated.length - 1].firstChild.textContent).toBe(value0);
});

test("should refetch if scrolled to the bottom", async () => {
  const { getByTestId } = render(MeasurementsList);
  await sleep(1000);
  expect(mockedQuery).toHaveBeenCalledTimes(1);
  fireEvent.scroll(window, { target: { scrollY: 1500 } });
  expect(mockedQuery).toHaveBeenCalledTimes(2);
});

test("should react to filter state", async () => {
  const { getByTestId } = render(MeasurementsList);
  const container = getByTestId("measurementsContainer");
  await sleep(1000);
  mockedQuery.mockReturnValue({
    // @ts-ignore
    result: () => {
      return measurementsByCountry;
    },
  });
  jest.clearAllMocks();
  filterStore.set({ key: "country", value: "Tatooine" });
  await sleep(1000);
  expect(mockedQuery).toHaveBeenCalled();
  const countries = container.querySelectorAll(
    'span[data-testid="countryDesktop"]'
  );
  expect(countries[0].firstChild.textContent).toBe(
    measurementsByCountry.data.measurementsByCountry[0].country.name
  );

  mockedQuery.mockReturnValue({
    // @ts-ignore
    result: () => {
      return measurementsByCity;
    },
  });
  jest.clearAllMocks();
  filterStore.set({ key: "city", value: "Mos Eisley" });
  await sleep(1000);
  expect(mockedQuery).toHaveBeenCalled();
  const cities = container.querySelectorAll('span[data-testid="cityDesktop"]');
  expect(cities[0].firstChild.textContent).toBe(
    measurementsByCity.data.measurementsByCity[0].city
  );
});
