import React from 'react';
import styled from 'styled-components';
import CreateProduct from './CreateProduct';
import UpdateProduct from './UpdateProduct';

const AdminContent = ({view}) => {
    const CONTENT_MAP = {
        svi: <h1>RUTA NIJE POSTAVLJENA</h1>,
        dodaj: <CreateProduct />,
        izmeni: <UpdateProduct />,
        obriši: <h1>RUTA NIJE POSTAVLJENA</h1>
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
        background-color: var(--clr-primary-8);
        border-radius: var(--radius);
`;

export default AdminContent;