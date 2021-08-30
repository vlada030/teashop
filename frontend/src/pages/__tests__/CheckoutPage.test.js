import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import { HelperCheckoutPage } from "../CheckoutPage";

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
