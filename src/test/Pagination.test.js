import { render, screen } from "@testing-library/react"
import Pagination from "../component/Pagination"
import { BrowserRouter as Router } from 'react-router-dom';

test("pagination", () => {
    render(<Router><Pagination /></Router>);
    const element = screen.getByTestId(/navigation/i);
    expect(element).toBeDefined();
})