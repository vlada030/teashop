import React from "react";
// eslint-disable-next-line
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { links } from "../utils/constants";
import styled from "styled-components";
import CartButtons from "./CartButtons";
import NotAdminSidebarLinks from "./NotAdminSidebarLinks";
import { useGlobalContext } from "../context/global_context";
import { useUserContext } from "../context/user_context";

const Sidebar = () => {
    const { isSidebarOpen, closeSidebar } = useGlobalContext();
    const { user } = useUserContext();

    return (
        <SidebarContainer>
            <aside className={isSidebarOpen ? "sidebar show-sidebar" : "sidebar"}>
                <div className="sidebar-header">
                    <h4>admin&nbsp;panel</h4>
                    <button className="close-btn" onClick={closeSidebar}>
                        <FaAngleDoubleLeft />
                    </button>
                </div>

                <NotAdminSidebarLinks />
                
                <CartButtons />
            </aside>
        </SidebarContainer>
    );
};

const SidebarContainer = styled.div`
    text-align: center;
    .sidebar-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 1.5rem;

        h4 {
        display: inline-block;
        margin-bottom: 0;
        font-weight: 400;
        font-size: 1.5rem;
      }
    }
    .close-btn {
        font-size: 2rem;
        background: transparent;
        border-color: transparent;
        color: var(--clr-primary-5);
        transition: var(--transition);
        cursor: pointer;
        margin-top: 0.2rem;
        display: block;
        margin-left: auto;
    }
    .close-btn:hover {
        color: var(--clr-red-light);
    }

    .sidebar {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--clr-white);
        transition: var(--transition);
        transform: translate(-100%);
        z-index: -1;
    }
    .show-sidebar {
        transform: translate(0);
        z-index: 999;
    }
    .cart-btn-wrapper {
        margin: 2rem auto;
    }
    @media screen and (min-width: 992px) {
        .sidebar {
            display: none;
        }

        .cart-btn-wrapper {
        display: none;
    }
    }
`;

export default Sidebar;
