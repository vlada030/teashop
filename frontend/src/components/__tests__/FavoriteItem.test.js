import { screen, render } from "@testing-library/react";
import userEvent from '@testing-library/user-event'

import { HelperFavoriteItem } from "../FavoriteItem";

describe("FavoriteItem component", () => {
    test("Is properly rendered", () => {
        render(<HelperFavoriteItem name={"naziv proizvoda"} price={1000} />);

        expect(screen.getByRole('img', {name: 'naziv proizvoda'}))
        expect(screen.getByRole('heading', {name: 'naziv proizvoda'}))
        expect(screen.getAllByText('RSD 100')).toHaveLength(2)
        expect(screen.getByRole('button')).toBeInTheDocument()
    });

    test('Unit price for 100gr', () => {
        render(<HelperFavoriteItem price={500} />);

        expect(screen.getAllByText('RSD 50')).toHaveLength(2)
    })

    test('Delete item button', ()=> {
        const fn = jest.fn()
        render(<HelperFavoriteItem handleRemoveBtn={fn} />)

        userEvent.click(screen.getByRole('button'))
        expect(fn).toHaveBeenCalled()
    })
});
