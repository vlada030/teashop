// promena width i height window objekta
//import {resizeTo} from 'window-resizeto'
import React, { useContext } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

//import { GlobalProvider } from "../../context/global_context"
import { BrowserRouter } from "react-router-dom";
import Logo from "../Logo";
import { Button } from "../Logo";
describe("Test Logo component", () => {
    test("Click on Sidebar Button works", () => {
        const mock = jest.fn();

        render(<Button handleSidebar={mock} />);

        userEvent.click(screen.getByRole("button"));
        expect(mock).toHaveBeenCalledTimes(1);
    });

    test.todo("Is sidebar button rendered depending on CSS @media rule ");

    // test("Open sidebar button is working", () => {
    //     // resizeTo(window, 1920, 1080)
    //     // resizeTo(window, 500, 108)

    //     const { getByTestId } = render(
    //         <GlobalProvider>
    //             <BrowserRouter>
    //                 <Logo />
    //             </BrowserRouter>
    //         </GlobalProvider>
    //     );

    //     console.log({ width: window.innerWidth, height: window.innerHeight });

    //     //screen.debug()

    //     //expect(getByTestId("svg")).toBeVisible()
    //     //expect(screen.getByRole('button')).toBeInTheDocument()
    //     expect(getByTestId("svg")).toHaveStyle({ display: "none" });
    // });

    // test("Open sidebar button is working", () => {
    //     const GlobalContext = React.createContext();

    //     const wrapper = ({ children }) => {
    //         return (
    //             <GlobalContext.Provider
    //                 value={{
    //                     openSidebar: jest.fn(),
    //                 }}
    //             >
    //                 {children}
    //             </GlobalContext.Provider>
    //         );
    //     };

    //     render(
    //         <BrowserRouter>
    //             <Logo />
    //         </BrowserRouter>,
    //         { wrapper }
    //     );

    //     screen.debug();
    //     userEvent.click(screen.getByRole("button"));
    //     //expect(openSidebar).toHaveBeenCalledTimes(1)
    // });
});
