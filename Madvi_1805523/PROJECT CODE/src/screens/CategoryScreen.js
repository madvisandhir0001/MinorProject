import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import styled from 'styled-components'
import CompanyCard2 from '../components/CompanyCard2';
import { selectUserData } from '../features/appSlice';
import { auth, companies as companiesRef } from '../utils/firebase';
let darkTheme;
const CategoryScreen = () => {
    const { id } = useParams();
    const user = useAuthState(auth);
    const [id2, setId2] = useState(id)
    const [companies, setCompanies] = useState([]);

    const location = useLocation();
    const pathName = location.pathname;
    const userData = useSelector(selectUserData);
    darkTheme = userData?.darkTheme;

    useEffect(() => {
        if (id2) {
            companiesRef.where('category', '==', id2).get().then(res => setCompanies(res.docs.map(doc => doc.data())))
        }
        if (!id) {

            setId2('Steel & Iron Industries');
        }
    }, [id2])


    return (
        <Container>
            <h1>{id2}</h1>
            <Nav>
                <p className={id2 === 'Steel & Iron Industries' ? 'header-nav-active' : ''} onClick={(e) => setId2(e.target.innerText)}>Steel & Iron Industries</p>
                <p className={id2 === 'Automobile Industries' ? 'header-nav-active' : ''} onClick={(e) => setId2(e.target.innerText)}>Automobile Industries</p>
                <p className={id2 === 'Cycle parts Industries' ? 'header-nav-active' : ''} onClick={(e) => setId2(e.target.innerText)}>Cycle parts Industries</p>
                <p className={id2 === 'Food & Beverages Industries' ? 'header-nav-active' : ''} onClick={(e) => setId2(e.target.innerText)}>Food & Beverages Industries</p>
                <p className={id2 === 'Plastic Industries' ? 'header-nav-active' : ''} onClick={(e) => setId2(e.target.innerText)}>Plastic Industries</p>
            </Nav>
            {companies.length !== 0 ?
                companies.map(company => <CompanyCard2 companyData={company} user={user} />)
                :
                <>
                    <h3> No Data Available</h3>
                </>
            }
        </Container>
    )
}

export default CategoryScreen

const Container = styled.div`
    min-height:100vh;
    padding:20px;
    ${() => darkTheme && `
    
        background-color: #1F2125 !important;
        color: #BCB9B7;
    ` }
`;

const Nav = styled.div`
    display: flex;
    justify-content: space-around;
    >p{
        cursor: pointer;   
        transition:all .25s ease-in-out; 
        background-color: #28292B;
        padding:10px 15px;
        border-radius: 15px ;
        color:white;
        :hover{
            transform: scale(1.02);
        }
        ${() => darkTheme && `
        background-color: white;
            color: #1F2125;
    ` }
    }
    ${() => window.innerWidth < 960 && `
        display:none;
    `}
`;