import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { IconButton } from '@material-ui/core';
import { auth, products as productsRef } from '../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import ProductCard from './ProductCard';
import { useSelector } from 'react-redux';
import { selectUserData } from '../features/appSlice';
let darkTheme;
const CompanyProducts = ({ toggle, show }) => {
    const [products, setProducts] = useState([])
    const [companyProducts, setCompanyProducts] = useState([]);
    const [user] = useAuthState(auth);

    const userData = useSelector(selectUserData);
    darkTheme = userData?.darkTheme;
    useEffect(() => {
        productsRef.onSnapshot(snapshot => setProducts(snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() }))));

    }, []);

    useEffect(() => {
        if (products) {
            let arr = [];
            products.map(product => {
                if (product.data.email === user.email) {
                    arr.push(product);
                }
                setCompanyProducts(arr)
            })
        }
    }, [products]);

    return (
        <Container>
            <div className="header" onClick={toggle}>
                <h2>Company Products</h2>
                <IconButton className="mui-icon">
                    {show === 1 ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
            </div>
            {show === 1 &&

                <>
                    {companyProducts.length !== 0 ?
                        <Products>
                            {companyProducts.map(({ id, data }) => <ProductCard data={data} id={id} key={id} />)}
                        </Products>
                        :
                        <NoProducts>
                            <h4>No Products</h4>
                        </NoProducts>}
                </>

            }

        </Container>
    )
}

export default CompanyProducts

const Container = styled.div`
border: 1px solid lightgray;
    margin-bottom: 20px;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
    >.header{
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: lightgray;
        padding:0 10px;
        background: rgb(137,166,196);
        background: linear-gradient(90deg,rgba(137,166,196,1) 0% ,rgba(137,166,196,.5) 100% );
        cursor: pointer;
        :hover{
            opacity: 0.8;
        }
    }
    >.header>h2{
        text-transform: capitalize;
    }
`;
const Products = styled.div`
    display: flex;
    flex-direction:column;
    overflow-y: scroll;
    height: 500px;
    ::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;  
    scrollbar-width: none;
    ${() => darkTheme && `
        >h3{
            color:rgb(171, 191, 213); 
        }
    ` }
`;
const NoProducts = styled.div`
    padding:40px;
    /* display: flex;
    flex-direction:column; */
`;