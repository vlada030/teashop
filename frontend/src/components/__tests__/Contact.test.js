import {render, screen} from '@testing-library/react'
import event from '@testing-library/user-event'

import Contact from '../Contact'

describe('Contact component', () => {
    test('Is properly rendered', () => {
        render(<Contact />)

        expect(screen.getByRole('heading', {name: /^prijavi/i}))
        expect(screen.getByPlaceholderText(/^unesite/i)).toBeInTheDocument()
        expect(screen.getByRole('button', {name: /^po.alji$/i}))
        
    })
})