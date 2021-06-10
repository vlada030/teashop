import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ShallowRenderer from "react-test-renderer/shallow";
import { BrowserRouter} from 'react-router-dom'
import Sidebar, { Header } from "../Sidebar";
import { GlobalContext } from "../../context/global_context";
import { UserContext } from "../../context/user_context";
import { CartContext } from "../../context/cart_context";

describe("Sidebar test", () => {
    test("Render User Panel title header", () => {
        const user = {
            username: "Petar",
            role: "user",
            favorites: [],
        };
        const placeholderFn = () => {};

        render(<Header user={user} closeSidebar={placeholderFn} />);

        expect(screen.getByText(/user panel/i)).toBeInTheDocument();
        expect(screen.queryByText(/admin panel/i)).not.toBeInTheDocument();
    });

    test("Render User Panel title header", () => {
        const user = null;
        const placeholderFn = () => {};

        render(<Header user={user} closeSidebar={placeholderFn} />);

        expect(screen.getByText(/user panel/i)).toBeInTheDocument();
        expect(screen.queryByText(/admin panel/i)).not.toBeInTheDocument();
    });

    test("Render Admin Panel title header", () => {
        const user = {
            username: "Petar",
            role: "admin",
            favorites: [],
        };
        const placeholderFn = () => {};

        render(<Header user={user} closeSidebar={placeholderFn} />);

        expect(screen.getByText(/admin panel/i)).toBeInTheDocument();
        expect(screen.queryByText(/user panel/i)).not.toBeInTheDocument();
    });

    test("SVG closes sidebar", () => {
        const user = {
            username: "Petar",
            role: "admin",
            favorites: [],
        };
        const closeSidebarMock = jest.fn();

        render(<Header user={user} closeSidebar={closeSidebarMock} />);

        userEvent.click(screen.getByRole("button"));
        expect(closeSidebarMock).toHaveBeenCalledTimes(1);
        expect(closeSidebarMock).toBeCalled();
    });

    test.todo(
        "Check if Sidebar component have display: none at @media min-width: 992px"
    );

    test("Sidebar is open and click to close it", () => {
        const isSidebarOpen = true
        const closeSidebar = jest.fn()
        const user = {
            username: "Petar",
            role: "admin",
            favorites: [],
        };

        const {container} = render(
            <GlobalContext.Provider
                value={{ isSidebarOpen, closeSidebar }}
            >
                <UserContext.Provider value={{ user }}>
                    <CartContext.Provider value={{ totalItems: 5 }}>
                        <BrowserRouter>
                            <Sidebar /> 
                        </BrowserRouter>
                    </CartContext.Provider>
                </UserContext.Provider>
            </GlobalContext.Provider>
        );

        const sidebarToggleBtn = container.querySelector('.close-btn')

        expect(screen.getByTestId('aside')).toHaveClass('sidebar show-sidebar')

        userEvent.click(sidebarToggleBtn)

        expect(closeSidebar).toHaveBeenCalledTimes(1)
    });

    test("Sidebar is closed and click to open it", () => {
        const isSidebarOpen = false
        const closeSidebar = jest.fn()
        const user = {
            username: "Petar",
            role: "admin",
            favorites: [],
        };

        const {container} = render(
            <GlobalContext.Provider
                value={{ isSidebarOpen, closeSidebar }}
            >
                <UserContext.Provider value={{ user }}>
                    <CartContext.Provider value={{ totalItems: 5 }}>
                        <BrowserRouter>
                            <Sidebar /> 
                        </BrowserRouter>
                    </CartContext.Provider>
                </UserContext.Provider>
            </GlobalContext.Provider>
        );

        const asideElmnt = screen.getByTestId('aside')
        const sidebarToggleBtn = container.querySelector('.close-btn')

        expect(asideElmnt).toHaveClass('sidebar')
        expect(asideElmnt).not.toHaveClass('show-sidebar')

        userEvent.click(sidebarToggleBtn)
        expect(closeSidebar).toHaveBeenCalledTimes(1)
    });
});
