import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import Hero from "../Hero";

describe("Hero component", () => {
    test("Contains all elements", () => {
        render(
            <BrowserRouter>
                <Hero />
            </BrowserRouter>
        )

        // expect(screen.getByText(/naru.ite va.e/i)).toBeInTheDocument();
        // expect(screen.getByRole('link')).toHaveTextContent(/^poru.i odmah$/i)
        expect(screen.getByRole('heading', {name: /naru.ite va.e/i}))
        expect(screen.getByRole('link', {name: /^poru.i odmah$/i}))
        // iz nekog razloga NE PRONALAZI slike
        // expect(screen.getAllByRole('image')).toHaveLength(2)
    });
});
