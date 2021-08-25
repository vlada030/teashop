import React from 'react';
import styled from 'styled-components';
import {Sort, ProductList, Pagination, CreateProduct, UpdateProduct, DeleteProduct} from '.';

const Helper = () => {
    return (
        <React.Fragment>
            <Sort />
            <ProductList />
            <Pagination />
        </React.Fragment>
    )
}

const AdminContent = ({view = 'proizvod_svi'}) => {

    const CONTENT_MAP = {
        proizvod_svi: <Helper />,
        proizvod_dodaj: <CreateProduct />,
        proizvod_izmeni: <UpdateProduct />,
        proizvod_obriši: <DeleteProduct />,
        korisnik_dodaj: <h4>opcija je u razvoju / under construction ✋ 👷</h4>,
        korisnik_izmeni: <h4>opcija je u razvoju / under construction ✋ 👷</h4>
    }

    let Content = CONTENT_MAP[view];

    return (
        <Wrapper>
            {Content}
        </Wrapper>
    )
}

const Wrapper = styled.section`
        height: 100%;
        background-color: var(--clr-primary-9);
        border-radius: var(--radius);
        padding: 0.5rem;
`;

export default AdminContent;