import { screen, render } from "@testing-library/react";
import { Buttons } from "../LoggedUserButton";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("User Authentication", () => {
    describe("User Name", () => {
        test("Display only user's first name", () => {
            const user = {
                username: "Pera Peric",
                favorites: [],
            };

            const placeholderFn = () => {};

            render(
                <BrowserRouter>
                    <Buttons
                        user={user}
                        userLogout={placeholderFn}
                        clearCart={placeholderFn}
                        closeSidebar={placeholderFn}
                    />
                </BrowserRouter>
            );

            expect(screen.getByText(/pera/i)).toBeInTheDocument();
            expect(screen.getByText(/pera/i)).toHaveTextContent("Pera");
            expect(screen.queryByText(/\.\.\./)).not.toBeInTheDocument();
        });

        test("Shorten users first name if it has length more than 9 characters", () => {
            const user = {
                username: "Peroslavimir Peric",
                role: 'user',
                favorites: [],
            };

            const placeholderFn = () => {};

            render(
                <BrowserRouter>
                    <Buttons
                        user={user}
                        userLogout={placeholderFn}
                        clearCart={placeholderFn}
                        closeSidebar={placeholderFn}
                    />
                </BrowserRouter>
            );

            expect(screen.getByText(/per/i)).toHaveTextContent("Perosla...");
        });
    });

    describe("Dropdown menu", () => {
        test("Logout button trigger appropriate events", () => {
            const user = {
                username: "Pera Peric",
                role: 'user',
                favorites: [],
            };

            const logoutMock = jest.fn();
            const clearCartMock = jest.fn();
            const closeSidebarMock = jest.fn();

            render(
                <BrowserRouter>
                    <Buttons
                        user={user}
                        userLogout={logoutMock}
                        clearCart={clearCartMock}
                        closeSidebar={closeSidebarMock}
                    />
                </BrowserRouter>
            );

            userEvent.click(screen.getByRole("button"));
            expect(logoutMock).toHaveBeenCalledTimes(1)
            expect(clearCartMock).toHaveBeenCalledTimes(1)
            expect(closeSidebarMock).toHaveBeenCalledTimes(1)
        });

        test('Display adequate text for product list depending of users role - #user', () => {
            const user = {
                username: "Pera Peric",
                role: 'user',
                favorites: [{product: 1}],
            }

            const placeholderFn = () => {};

            render(
                <BrowserRouter>
                    <Buttons
                        user={user}
                        userLogout={placeholderFn}
                        clearCart={placeholderFn}
                        closeSidebar={placeholderFn}
                    />
                </BrowserRouter>
            )

            expect(screen.getByText(/omiljeni/i)).toHaveTextContent('omiljeni (1)')
        })

        test('Display adequate text for product list depending of users role - #admin', () => {
            const user = {
                username: "Pera Peric",
                role: 'admin',
                favorites: [{product: 1}, {product: 2}],
            }

            const placeholderFn = () => {};

            render(
                <BrowserRouter>
                    <Buttons
                        user={user}
                        userLogout={placeholderFn}
                        clearCart={placeholderFn}
                        closeSidebar={placeholderFn}
                    />
                </BrowserRouter>
            )

            expect(screen.getByText(/izdvo/i)).toHaveTextContent('izdvojeni (2)')
        })
        test('Click on the product list closes sidebar', () => {
            const user = {
                username: "Pera Peric",
                role: 'admin',
                favorites: [{product: 1}, {product: 2}],
            }

            const placeholderFn = () => {};
            const closeSidebarMock = jest.fn()

            render(
                <BrowserRouter>
                    <Buttons
                        user={user}
                        userLogout={placeholderFn}
                        clearCart={placeholderFn}
                        closeSidebar={closeSidebarMock}
                    />
                </BrowserRouter>
            )

            userEvent.click(screen.getByText(/izdvojeni/i))
            expect(closeSidebarMock).toHaveBeenCalledTimes(1)
        })
    });
});
