import { render, screen } from "@testing-library/react"

import Loading from '../Loading'

describe('Loading component', () => {
    test('Contains necessary elements', () => {
        render(<Loading />)
        expect(screen.getByTestId('container')).toHaveClass('loading')
    })
})