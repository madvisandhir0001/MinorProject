import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectUserData } from '../features/appSlice';
import { auth, companies as companiesRef } from '../utils/firebase';
import CompanyCard2 from './CompanyCard2';
let darkTheme;
const BriefProfile = () => {
    const [user] = useAuthState(auth);
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        companiesRef.limit(3).onSnapshot(snapshot => setCompanies(snapshot.docs.map(doc => doc.data())))
    }, []);


    const userData = useSelector(selectUserData);
    darkTheme = userData?.darkTheme;

    return (
        <Container id='brief-profile'>
            <h1>Brief Profile</h1>
            <Cards>
                {companies && companies.map((company, index) => <CompanyCard2 key={user, index} companyData={company} user={user} />)}
                {/* <img src="https://firebasestorage.googleapis.com/v0/b/org-ldh.appspot.com/o/assests%2FhomeScreen__rightLogo.png?alt=media&token=e6b2f0e2-346f-4f22-b052-999115dd350a" alt="1_logo" />
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p> */}

            </Cards>
        </Container>
    )
}

export default BriefProfile

const Container = styled.div`
    margin:10px;
    background-color:white;
    border-radius:10px;
    >h1{
        border-top-right-radius:10px;
        font-size: 25px;
        border-top-left-radius:10px; padding:5px 10px;
        background-color:#ADB3C8;background: rgb(137,166,196);
        background: linear-gradient(0deg, rgba(137,166,196,0) 0%, rgba(137,166,196,1) 100%);
    }
    ${() => darkTheme && `
        background-color: rgba(50, 50,50, .5) !important;
        >h1{
            color:green;  
            background: rgb(137,166,196);
            background: linear-gradient(0deg, rgba(137,166,196,0) 0%, rgba(14, 19, 65, .5) 100%);
        }
    ` }
`;

const Cards = styled.div`
    width: 60vw;
    margin:auto;
    display: flex;
    padding:40px 0;
    justify-content: space-between;
    align-items: center;
    flex-direction:column;
    >img{
        height:350px;
        object-fit: contain;
    }
    >p{
        font-size: 25px;
        text-align: justify;
        width:400px;
    }
    ${() => window.innerWidth < 960 && `  
        width:90vw;
        flex-direction:column;
        >img{
            width: 70vw;
        }
        >p{
                width:80vw;
                font-size:18px;
        }
    `}
`;
