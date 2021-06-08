import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { links } from "../utils/constants";

const NotAdminSidebarLinks = ({user, closeSidebar}) => {

    return (
        <Wrapper>
            {user?.role !== "admin" ? (
                <ul className="links">
                    {links.map((link) => {
                        const { id, text, url } = link;
                        return (
                            <li key={id}>
                                <Link to={url} onClick={closeSidebar}>
                                    {text}
                                </Link>
                            </li>
                        );
                    })}
                    {user && (
                        <li>
                            <Link to="/checkout" onClick={closeSidebar}>
                                kasa
                            </Link>
                        </li>
                    )}
                </ul>
            ) : null}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    .links {
        margin-bottom: 2rem;
    }
    
    .links a {
        display: block;
        text-align: left;
        font-size: 1rem;
        text-transform: capitalize;
        padding: 1rem 1.5rem;
        color: var(--clr-grey-3);
        transition: var(--transition);
        letter-spacing: var(--spacing);
    }

    .links a:hover {
        padding: 1rem 1.5rem;
        padding-left: 2rem;
        background: var(--clr-grey-10);
        color: var(--clr-grey-2);
    }
`;

export default NotAdminSidebarLinks;
