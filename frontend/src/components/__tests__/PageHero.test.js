import {render, screen} from '@testing-library/react'
import {BrowserRouter} from 'react-router-dom'

import PageHero from '../PageHero'

describe("PageHero component", () => {
    test('Check slug text for different pages', () => {
        render(
            <BrowserRouter>
                <PageHero title={"test"} />
            </BrowserRouter>
        )
        
        expect(screen.getByRole('link')).toHaveTextContent('početna')
        expect(screen.getByText(/\/ test/i)).toBeInTheDocument()
    })

    test('Check extended slug text for single product', () => {
        render(
            <BrowserRouter>
            <PageHero title={'test'} product={true}/>
            </BrowserRouter>
        )
    })
})