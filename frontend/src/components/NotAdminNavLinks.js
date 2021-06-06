import React from "react";
import { Link } from "react-router-dom";
import { links } from "../utils/constants";
import { useUserContext } from "../context/user_context";
import styled from "styled-components";

// dependancy injection zbog testiranja
export const Titles = ({links, user}) => {
    return (
        <ul className="nav-links">
            {links.map((link) => {
                const { id, text, url } = link;
                return (
                    <li key={id}>
                        <Link to={url}>{text}</Link>
                    </li>
                );
            })}
            {user && (
                <li>
                    <Link to="/checkout">kasa</Link>
                </li>
            )}
        </ul>
    )
}

export const RenderLinks = ({user}) => {
    return (<Wrapper>
        {user?.role !== "admin" ? (
                <Titles links={links} user={user} />
            ) : (
                <h4>Admin&nbsp;panel</h4>
            )}
    </Wrapper>)
}

const NotAdminLinks = () => {
    const { user } = useUserContext();
    return <RenderLinks user={user} />;
};

const Wrapper = styled.div`
    .nav-links {
        display: none;
    }

    h4 {
      display: none;
    }

    @media (min-width: 992px) {
        .nav-links {
          display: flex;
          align-items: center;
          justify-content: center;
          li {
              margin: 0 0.5rem;
          }
          a {
              color: var(--clr-grey-3);
              font-size: 1rem;
              text-transform: capitalize;
              letter-spacing: var(--spacing);
              padding: 0.5rem;
              border: 2px solid transparent;
              transition: var(--transition);
              &:hover {
                  border-bottom: 2px solid var(--clr-primary-7);
              }
          }
      }
      h4 {
        display: inline-block;
        margin-bottom: 0;
        font-weight: 400;
        font-size: 2rem;
      }
    }
`;

export default NotAdminLinks;
