// promena widthai heighta window objekta
import {resizeTo} from 'window-resizeto'
import { render, screen } from "@testing-library/react"
import {BrowserRouter} from 'react-router-dom'
import Logo from "../Logo"
import { GlobalProvider } from "../../context/global_context"


test("Button for sidebar opening is rendered", () => {

    // resizeTo(window, 1920, 1080)
    // resizeTo(window, 500, 108)
    
    const {getByTestId} = render(
        <GlobalProvider>
            <BrowserRouter>
                <Logo />    
            </BrowserRouter>
        </GlobalProvider>
    );

    console.log({width: window.innerWidth, height: window.innerHeight});

    //screen.debug()

    //expect(getByTestId("svg")).toBeVisible()
    //expect(screen.getByRole('button')).toBeInTheDocument()
    expect(getByTestId("svg")).toHaveStyle({display: none})


});
