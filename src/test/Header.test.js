
import { render, screen } from "@testing-library/react"
import Header from "../component/Header";

test('Header',()=>{
        render(<Header/>);
        const textElement = screen.getByText('Employee Name');
        const placeholderElement = screen.getByPlaceholderText(/e.g. Admin User/i);
        const placeholderElementtwo = screen.getByPlaceholderText(/select action type/i);
        const placeholderElementthree = screen.getByPlaceholderText(/select application type/i);
        const placeholderElementfour = screen.getByPlaceholderText(/Select From date/i);
        const placeholderElementfive = screen.getByPlaceholderText(/Select To date/i);
        const placeholderElementSix = screen.getByRole("button");
        
        expect(textElement).toBeInTheDocument();
        expect(placeholderElement).toBeInTheDocument();
        expect(placeholderElementtwo).toBeInTheDocument();
        expect(placeholderElementthree).toBeInTheDocument();
        expect(placeholderElementfour).toBeInTheDocument();
        expect(placeholderElementfive).toBeInTheDocument();
        expect(placeholderElementSix).toBeInTheDocument();

})