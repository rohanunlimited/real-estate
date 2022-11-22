import { render, screen } from "@testing-library/react"
import Pagination from "./src/Pagination"

test("pagination", ()=>{
    render(<Pagination/>);
    const element = screen.getByRole('navigation');
    expect(element).toBeInDocument()
})