import { render, screen} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import ErrorPage from "../ErrorPage";

describe("ErrorPage component", () => {
    test("Page contains required elements", () => {
         render(
            <BrowserRouter>
                <ErrorPage />
            </BrowserRouter>
        );
    
        expect(screen.getByText(/404/i)).toBeInTheDocument();
        expect(screen.getByText(/strana koju/i)).toBeInTheDocument();
        expect(screen.getByRole("link")).toBeInTheDocument();
    })
})
