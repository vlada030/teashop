import {render, screen} from '@testing-library/react'

import Services from '../Services'

describe('Services component', () => {
    test('Is properly rendered', () => {
        render(<Services />)
        
        expect(screen.getAllByRole('article')).toHaveLength(5)
        expect(screen.getByRole('heading', {name: 'zdravlje'}))
        expect(screen.getByRole('heading', {name: 'lepota'}))
        expect(screen.getByRole('heading', {name:'duh'}))
        expect(screen.getByRole('heading', {name: 'telo'}))

    })
})