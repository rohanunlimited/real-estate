
import { render, screen } from "@testing-library/react"
import Header from "../component/Header";
import { BrowserRouter as Router } from 'react-router-dom'

test('Header', () => {
        render(<Router><Header /></Router>);


        const placeholderElementtwo = screen.getByPlaceholderText(/select action type/i);
        const placeholderElementthree = screen.getByPlaceholderText(/select application type/i);
        const placeholderElementfour = screen.getByTestId(/startdate/i);
        const placeholderElementfive = screen.getByPlaceholderText('e.g. 219841/2021');
        const textElement = screen.getByTestId(/remove/i)

        const placeholderElementSix = screen.getByTestId(/search/i);


        expect(placeholderElementtwo).toBeInTheDocument();
        expect(placeholderElementthree).toBeInTheDocument();
        expect(placeholderElementfour).toBeInTheDocument();

        expect(placeholderElementSix).toBeInTheDocument();
        expect(placeholderElementfive).toBeInTheDocument();
        expect(textElement).toBeInTheDocument();

})