import React, {useState} from "react";
import styled from "styled-components";
import { AdminNavigation, AdminContent } from "../components";

const AdminPage = () => {
    const [view, setView] = useState('proizvod_svi');
    return (
        <Wrapper className="section-center page-100">
            <AdminNavigation view={view} handleView={setView}/>
            <AdminContent view={view} />
        </Wrapper>
    );
};

const Wrapper = styled.main`
    display: grid;
    gap: 1rem;

    @media screen and (min-width: 992px) {
        grid-template-columns: 1fr 3fr;
        align-items: center;
    } 
`;

export default AdminPage;
