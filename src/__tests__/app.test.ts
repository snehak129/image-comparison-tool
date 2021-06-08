import { fireEvent, getByTestId, render } from "@testing-library/svelte";

import App from "../App.svelte";


// This tests increment/decrement of counter.
test("testing counter", async () => {
  const { getByText, getByTestId } = render(App, { name: "sneha" });
  const increment = getByText('ADD');
  const decrement = getByText('REMOVE');

  await fireEvent.click(increment)
  await fireEvent.click(increment)
  await fireEvent.click(increment)
  await fireEvent.click(decrement)

  const counter = getByTestId("counter");

  expect(counter.textContent).toBe('2');


});


test("name property check", async () => {
  const { getByRole } = render(App, { name: "sneha" });
  const text =  getByRole('heading', {level: 1});

  expect(text.textContent).toBe("Hello SNEHA!");

});

