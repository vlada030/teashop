import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

import { Buttons } from "../CartButtons";

describe("Cart Button", () => {
    test("User is not logged in", () => {
        const user = false;
        const totalItems = 0;
        const placeholderFn = () => {};

        render(
            <BrowserRouter>
                <Buttons
                    user={user}
                    totalItems={totalItems}
                    closeSidebar={placeholderFn}
                    userLogout={placeholderFn}
                    clearCart={placeholderFn}
                />
            </BrowserRouter>
        );

        expect(screen.getByText(/prijava/i)).toBeInTheDocument();
        expect(screen.getByText(/prijava/i)).toHaveAttribute(
            "href",
            "/authentication"
        );
    });

    test("User is not logged in, click to redirect to login page", () => {
        const user = false;
        const totalItems = 0;
        const placeholderFn = () => {};
        const closeSidebarMock = jest.fn();

        render(
            <BrowserRouter>
                <Buttons
                    user={user}
                    totalItems={totalItems}
                    closeSidebar={closeSidebarMock}
                    userLogout={placeholderFn}
                    clearCart={placeholderFn}
                />
            </BrowserRouter>
        );

        userEvent.click(screen.getByText(/prijava/i));

        expect(closeSidebarMock).toHaveBeenCalledTimes(1);
    });

    test("User is logged in as User", () => {
        const user = {
            username: "Admin",
            role: "user",
            favorites: [],
        };

        const totalItems = 0;
        const placeholderFn = () => {};

        render(
            <BrowserRouter>
                <Buttons
                    user={user}
                    totalItems={totalItems}
                    closeSidebar={placeholderFn}
                    userLogout={placeholderFn}
                    clearCart={placeholderFn}
                />
            </BrowserRouter>
        );

        expect(screen.getByText(/korpa/i)).toBeInTheDocument();
    });

    test("User is logged in as Admin", () => {
        const user = {
            username: "Admin",
            role: "admin",
            favorites: [],
        };

        const totalItems = 0;
        const placeholderFn = () => {};

        render(
            <BrowserRouter>
                <Buttons
                    user={user}
                    totalItems={totalItems}
                    closeSidebar={placeholderFn}
                    userLogout={placeholderFn}
                    clearCart={placeholderFn}
                />
            </BrowserRouter>
        );

        expect(screen.queryByText(/korpa/i)).not.toBeInTheDocument();
    });

    test('Number of items in the shopping cart', () => {
        const user = {
            username: "User",
            role: "user",
            favorites: [],
        };

        const totalItems = 7;
        const placeholderFn = () => {};

        const {container} = render(
            <BrowserRouter>
                <Buttons
                    user={user}
                    totalItems={totalItems}
                    closeSidebar={placeholderFn}
                    userLogout={placeholderFn}
                    clearCart={placeholderFn}
                />
            </BrowserRouter>
        );
        
        // #1 nacin
        const span = container.querySelector('.cart-value')
        expect(span).toHaveTextContent(7)

        // #2 nacin
        expect(screen.getByText(7)).toBeInTheDocument()
    })
});
