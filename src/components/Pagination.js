import React from 'react';
import styled from 'styled-components';
import {useFilterContext} from '../context/filter_context';

const Pagination = () => {

    const {paginatedProducts, page, nextPage, prevPage, showPage} = useFilterContext();

    if (paginatedProducts.length < 1) {
        return null;
    }

    return (
        <Wrapper>
            <div className="btn-container">
                <button
                    className={page === 0 ? "btn btn-active" : "btn"}
                    onClick={prevPage}
                    disabled={page === 0 ? true : false}
                >
                    prethodna
                </button>

                {paginatedProducts.map((product, index) => {
                    return (
                        <button
                            key={index}
                            className={
                                index === page ? "btn btn-active" : "btn"
                            }
                            onClick={() => showPage(index)}
                        >
                            {index + 1}
                        </button>
                    );
                })}

                <button
                    className={
                        page === paginatedProducts.length - 1
                            ? "btn btn-active"
                            : "btn"
                    }
                    onClick={nextPage}
                    disabled={
                        page === paginatedProducts.length - 1 ? true : false
                    }
                >
                    sledeća
                </button>
            </div>
        </Wrapper>
    );
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

    .btn:disabled {
        cursor: not-allowed;
    }

    .btn-active {
        color: var(--clr-primary-1);
        background: var(--clr-primary-7)
    }
`;

export default Pagination;