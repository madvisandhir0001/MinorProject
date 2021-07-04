import React, { useEffect, useState } from 'react'
import { Avatar, CircularProgress } from '@material-ui/core'
import styled from 'styled-components'
import { companies as companiesRef } from '../utils/firebase'
import { useHistory, useLocation } from 'react-router'
import { selectUserData } from '../features/appSlice'
import { useSelector } from 'react-redux'
let darkTheme;

const PinnedProfiles = () => {
    const [companies, setCompanies] = useState([]);
    const [highlight, setHighlight] = useState(false);
    const location = useLocation();
    const search = location.search;
    const query = search.split('category=')[1];
    const history = useHistory();

    const userData = useSelector(selectUserData);
    darkTheme = userData?.darkTheme;
    useEffect(() => {
        query ?
            companiesRef.where('category', '==', query).get().then(res => setCompanies(res.docs.map(doc => doc.data())))
            :
            companiesRef.limit(5).get().then(res => setCompanies(res.docs.map(doc => doc.data())))
    }, [query])

    useEffect(() => {
        setHighlight(true);
        const timeout = setTimeout(() => setHighlight(false), 1000);

        return () => {
            clearTimeout(timeout)
        }
    }, [query])

    return (
        <Container id="pinned-profiles" style={{ boxShadow: highlight ? ` 0px 0px 35px rgb(0, 128, 120)` : '' }}>
            <h1>Pinned Profiles{query && <span>({query.replace(/%20/g, " ")})</span>}</h1>
            {companies ?
                companies.map(company =>
                    <Company key={company.userEmail} onClick={() => history.push(`/company/${company.userEmail}`)}>
                        <Avatar style={{ width: '40px', height: '40px' }} src={company.profilePic} />
                        <h3>{company.title.charAt(0).toUpperCase() + company.title.slice(1)}</h3>
                    </Company>
                )
                :
                <CircularProgress />
            }
        </Container>
    )
}

export default PinnedProfiles

const Container = styled.div`
    margin:10px;
    background-color:white;
    border-radius:10px;                                         
    min-height:40vh;
    max-height:45vh;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
    overflow-y: scroll;

    ::-webkit-scrollbar {
        display: none;
    }

    -ms-overflow-style: none;  
    scrollbar-width: none;
    -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  outline: none;
    >h1{
        color:#383B51;
        border-top-right-radius:10px;
        border-top-left-radius:10px;
        font-size: 25px;
        background: rgb(137,166,196);
        background: linear-gradient(0deg, rgba(137,166,196,0) 0%, rgba(137,166,196,1) 100%);
        padding:5px 10px;
        display: flex;
        flex-direction:column;
        >span{
            font-size:18px;
        }
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

const Company = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    margin: 15px 10px;
    padding:5px;
    transition: all .25s ease-in-out;
    :hover{
        transform: scale(1.01);
    }
    > h3{
    margin-left: 10px;
        font-size: 22px;
    font-weight: 400;
    }
    ${() => darkTheme && `
        >h3{
            color:rgb(171, 191, 213); 
        }
    ` }
`;