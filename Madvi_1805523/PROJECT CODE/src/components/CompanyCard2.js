import { Avatar, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import styled from 'styled-components';
import Slideshow2 from './Slideshow2';
import { products as productsRef } from '../utils/firebase';
import { selectUserData } from '../features/appSlice';
import { useSelector } from 'react-redux';
let darkTheme;
const CompanyCard2 = ({ companyData, user }) => {
    const history = useHistory();
    const [products, setProducts] = useState([]);
    const handleClick = () => {
        user ? history.push(`/company/${companyData.userEmail}`) : history.push(`/user/register`)
    }

    const userData = useSelector(selectUserData);
    darkTheme = userData?.darkTheme;

    useEffect(() => {
        productsRef.where('email', '==', companyData.userEmail)
            .onSnapshot(snapshot => setProducts(snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() }))))
    }, []);

    return (
        <Container>
            <Slideshow2 companyProducts={products} />
            <Info>
                <div>
                    {companyData?.profilePic &&
                        <Avatar
                            style={{ width: !window.innerWidth > 960 ? '90px' : '45px', height: !window.innerWidth > 960 ? '90px' : '45px' }}
                            src={companyData?.profilePic}
                        />
                    }
                    <h2>{companyData.title}</h2>
                </div>
                <h2>{companyData?.category}</h2>
                <Button variant="outlined" color={darkTheme ? "primary" : ""} onClick={handleClick}>More..</Button>
            </Info>
        </Container>
    )
}

export default CompanyCard2

const Container = styled.div`
    display: flex;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
    margin: 20px 0;
    background: white;
    max-width:800px;
    width: 100%;
    
    ${() => window.innerWidth < 960 && `
        flex-direction:column;
    `}
    ${() => darkTheme && `
        background-color: rgba(50, 50,50, .5) !important;
        
    ` }
`;

const Info = styled.div`
    flex: .5;
    display: flex;
    justify-content: center;
    flex-direction:column;
    padding:10px;
    margin-left:40px;

    >div{
        display: flex;
        align-items: center;
        margin-bottom:25px;
        >h2{
            margin-left: 20px;
        }
    }

    >button{
        width: 100px;
    }

    ${() => window.innerWidth < 960 && `
        align-items: center;
        
        >h2{
            font-size: 25px;
        }

        >div{
            >h2{
                margin-left: 10px;
                font-size: 25px;
            }
        }

        >button{
            width: 100px;
            margin-top: 10px;
        }

    `}
    ${() => darkTheme && `
        
          color:rgb(171, 191, 213); 

    ` }
`;