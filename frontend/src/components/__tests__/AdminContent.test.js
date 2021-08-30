import {render, screen} from '@testing-library/react'

import AdminContent from '../AdminContent'
import {FilterProvider} from '../../context/filter_context'
import {ProductsProvider} from '../../context/products_context'
import { GlobalProvider } from '../../context/global_context'

describe.skip('AdminContent component', () => {
    test('Show mask for Add new product', () => {
        render(
            <GlobalProvider>
                <ProductsProvider>
                    <FilterProvider>
                        <AdminContent view={'proizvod_dodaj'}/>
                    </FilterProvider>
                </ProductsProvider>
            </GlobalProvider>
        );
        
        expect(screen.getByText(/dodaj proizvod/i)).toBeInTheDocument()
    })

    test('Show mask for Edit existing product', () => {
        render(
            <GlobalProvider>
                <ProductsProvider>
                    <FilterProvider>
                        <AdminContent view={'proizvod_izmeni'}/>
                    </FilterProvider>
                </ProductsProvider>
            </GlobalProvider>
        );
        
        expect(screen.getByText(/prona.i proizvod/i)).toBeInTheDocument()
    })

    test('Show mask for Delete existing product', () => {
        render(
            <GlobalProvider>
                <ProductsProvider>
                    <FilterProvider>
                        <AdminContent view={'proizvod_obriši'}/>
                    </FilterProvider>
                </ProductsProvider>
            </GlobalProvider>
        );
        
        expect(screen.getByText(/obri.i proizvod/i)).toBeInTheDocument()
    })

    test('Show mask for Add new User', () => {
        render(
            <GlobalProvider>
                <ProductsProvider>
                    <FilterProvider>
                        <AdminContent view={'korisnik_dodaj'}/>
                    </FilterProvider>
                </ProductsProvider>
            </GlobalProvider>
        );
        
        expect(screen.getByText(/opcija je u razvoju/i)).toBeInTheDocument()
    })

    test('Show mask for Edit existing User', () => {
        render(
            <GlobalProvider>
                <ProductsProvider>
                    <FilterProvider>
                        <AdminContent view={'korisnik_izmeni'}/>
                    </FilterProvider>
                </ProductsProvider>
            </GlobalProvider>
        );
        
        expect(screen.getByText(/opcija je u razvoju/i)).toBeInTheDocument()
    })
})