import { render, screen } from "@testing-library/react"
import ViewTable from "../component/ViewTable"

test('ViewTable',()=>{
  render(<ViewTable/>);
  const table = screen.getByRole("table");
  expect(table).toBeInTheDocument();
})