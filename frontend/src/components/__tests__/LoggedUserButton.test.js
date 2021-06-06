import {screen, render} from '@testing-library/react'
import LoggedUserButton from '../LoggedUserButton'

describe('User Button', () => {
    test('PROBA', () => {
        const useUserContext = jest.fn()
        useUserContext.mockReturnValue({user: {name:'Pera'}})

        render(<LoggedUserButton />)

    })
})