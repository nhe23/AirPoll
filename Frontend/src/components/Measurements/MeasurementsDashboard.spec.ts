import fetchMock from "jest-fetch-mock";
import MeasurementsDashboard from "./MeasurementsDashboard.svelte";
import { mocked } from "ts-jest/utils";
import { query } from "svelte-apollo";
import { render } from "@testing-library/svelte";
import { sleep } from "../../helpers/sleep";
import { measurements } from "./mock/measurements";

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

it("should render measurement components", async () => {
  const { getByTestId } = render(MeasurementsDashboard);
  const desktop = getByTestId("measurementsDashboard");
  await sleep(1000);

  expect(
    desktop.querySelector('div[data-testid="measurementsContainer"]')
  ).not.toBe(null);
  expect(desktop.querySelector('div[data-testid="filterDesktop"]')).not.toBe(
    null
  );
  expect(
    desktop.querySelector('div[data-testid="measurementsDescription"]')
  ).not.toBe(null);
});
