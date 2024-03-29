import React from "react";
import styled from "styled-components";
import Logo from "./Logo";
import CartButtons from "./CartButtons";
import NotAdminLinks from "./NotAdminNavLinks";

const Nav = () => {
    return (
        <NavContainer>
            <div className="nav-center">
                <Logo />
                <NotAdminLinks />
                <div className='helper'>
                  <CartButtons />
                </div>
            </div>
        </NavContainer>
    );
};

const NavContainer = styled.nav`
    height: 5rem;
    margin-top: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;

    .nav-center {
        width: 90vw;
        margin: 0 auto;
        max-width: var(--max-width);
    }

    .helper {
      display: none;
    }

    @media (min-width: 992px) {
        .nav-center {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            align-items: center;
            justify-items: center;
        }

        .helper {
          display: block;
        }
    }
`;

export default Nav;
