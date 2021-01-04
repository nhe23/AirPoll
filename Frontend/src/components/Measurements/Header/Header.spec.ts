import fetchMock from "jest-fetch-mock";

import Header from "./Header.svelte";
import { render, fireEvent } from "@testing-library/svelte";
import { measurementsColumns } from "./columns";

beforeAll(() => {
  fetchMock.enableMocks();
});

it("should render filter and sort components", async () => {
  const { getByTestId } = render(Header, { measurementsColumns });
  let header = getByTestId("header");
  expect(header.querySelector('div[data-testid="rootContainer"]')).not.toBe(
    null
  );
  expect(header.querySelector('div[data-testid="filterMobile"]')).not.toBe(
    null
  );
  expect(header.querySelector('div[data-testid="sortDesktop"]')).not.toBe(null);
});

it("should dispatch sort event", async () => {
  const { getByTestId, component } = render(Header, { measurementsColumns });
  const mock = jest.fn();
  component.$on("sort", mock);
  const sortHeader = getByTestId("header00");
  await fireEvent.click(sortHeader);
  expect(mock).toHaveBeenCalled();
});
