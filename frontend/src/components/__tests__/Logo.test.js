import {BrowserRouter} from 'react-router-dom'
import { render, screen } from "@testing-library/react";
import Logo from "../Logo";
import { GlobalProvider } from "../../context/global_context";

test("Button for sidebar opening is rendered", () => {
    render(
        <GlobalProvider>
            <BrowserRouter>
            <Logo />    

            </BrowserRouter>
        </GlobalProvider>
    );
    expect(screen.queryByTestId("svg")).toBeFalsy();
});
