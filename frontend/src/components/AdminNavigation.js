import React from 'react';
import styled from 'styled-components';
import {productTitles, userTitles} from '../utils/constants';

const AdminNavigation = ({view, handleView}) => {
    return (
        <Wrapper>
            <div className='container'>
                <h4>proizvod</h4>
                <hr />
                {productTitles.map(item => {
                    return <button key={item} className={item === view ? 'admin-btn active' : 'admin-btn'} onClick={() => handleView(item)}>{item.split('_')[1]}</button>
                })}
            </div>

            <div className='container'>
                <h4>korisnik</h4>
                <hr />
                {userTitles.map(item => {
                    return <button key={item} className={item === view ? 'admin-btn active' : 'admin-btn'} onClick={() => handleView(item)}>{item.split('_')[1]}</button>
                })}
            </div>

        </Wrapper>
    )
}

const Wrapper = styled.section`
    height: 100%;
    background-color: var(--clr-primary-9);
    border-radius: var(--radius);
    text-align: center;

    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        /* position: sticky;
        top: 0; */

        h4 {
            padding: .75rem;
            margin-bottom: .5rem;
            font-weight: 400;
        }

        hr {
            width: 8rem;
            margin: 0 auto;
        }

        .admin-btn {
            display: block;
            font-family: inherit;
            font-size: 1rem;
            color: inherit;
            letter-spacing: var(--spacing);
            border: none;
            background-color: transparent;
            padding: 1rem;
            cursor: pointer;
            transition: var(--transition);

            
            &::first-letter {
                text-transform: uppercase;
            }
        }
        .admin-btn:hover,
        .active {
            background-color: var(--clr-primary-7);
        } 
    }

`;

export default AdminNavigation;