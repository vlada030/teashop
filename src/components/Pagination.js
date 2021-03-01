import React from 'react';
import styled from 'styled-components';
import {useFilterContext} from '../context/filter_context';

const Pagination = () => {

    const {filteredProducts, page, nextPage, prevPage, showPage} = useFilterContext();

    return <Wrapper>
                <div className="btn-container">
                    <button className="btn btn-prev" onClick={prevPage}>prethodna</button>

                    {filteredProducts.map((product, index) => {
                        return <button key={index} className={index === page ? 'btn btn-page btn-page-active' : 'btn btn-page'} onClick={() => showPage(index)}>{index + 1}</button>;
                        })
                    }
            
                    <button className="btn btn-next" onClick={nextPage}>sledeća</button>
                </div>
            </Wrapper>;
}

const Wrapper = styled.section`
    .btn-container {
        width: var(--fixedWidth);
        margin: 0 auto;
        padding: 5rem 0;
        max-width: var(--maxWidth);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
    }

    .btn {
        margin: 0.5rem;
    }
`;

export default Pagination;