import { screen, render } from "@testing-library/react";
import AboutPage from "../AboutPage";
import { BrowserRouter } from "react-router-dom";

describe("Testing About Page", () => {
    test("Check a number of sections", () => {
        const { container } = render(
            <BrowserRouter>
                <AboutPage />
            </BrowserRouter>
        );

        expect(container.querySelectorAll("section")).toHaveLength(5);
    });

    test("Check section titles", () => {
        render(
            <BrowserRouter>
                <AboutPage />
            </BrowserRouter>
        );
        expect(screen.getByText("priča o čaju")).toBeInTheDocument();
        expect(screen.getByText("zeleni čaj")).toBeInTheDocument();
        expect(screen.getByText("crni čaj")).toBeInTheDocument();
        expect(screen.getByText("beli čaj")).toBeInTheDocument();
    });

    test("Check section images", () => {
        render(
            <BrowserRouter>
                <AboutPage />
            </BrowserRouter>
        );
        expect(screen.getByAltText("priča o čaju")).toBeInTheDocument();
        expect(screen.getByAltText("zeleni čaj")).toBeInTheDocument();
        expect(screen.getByAltText("crni čaj")).toBeInTheDocument();
        expect(screen.getByAltText("beli čaj")).toBeInTheDocument();
    });
});
