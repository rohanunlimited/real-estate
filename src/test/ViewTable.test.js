import { render, screen } from "@testing-library/react"
import Table from "../component/Table";
import { BrowserRouter as Router } from 'react-router-dom';

test('ViewTable', () => {
  render(<Router><Table /></Router>);
  const table = screen.getByRole("table");
  expect(table).toBeInTheDocument();
})