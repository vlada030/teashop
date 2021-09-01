import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import { HelperCheckoutPage } from "../CheckoutPage";

// problem with context API when it contains useEffect hook with async code?
describe.skip("CheckoutPage component", () => {
    test("Cart is empty", () => {
        render(
            <BrowserRouter>
                <HelperCheckoutPage cart={{ cart: [] }} />
            </BrowserRouter>
        );

        screen.debug();
    });
});
