import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import styled from 'styled-components';
import ProductCard3 from '../components/ProductCard3';
import Slideshow from '../components/Slideshow';
import Rating from '@material-ui/lab/Rating';

import { companies, products as productsRef } from '../utils/firebase';
import ReviewCompany from '../components/ReviewCompany';
import { selectUserData } from '../features/appSlice';
import { useSelector } from 'react-redux';
let darkTheme;
const Company = () => {
    const [companyData, setCompanyData] = useState({});
    const [reviews, setReviews] = useState([]);
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [avgRating, setAvgRating] = useState(1);

    const userData = useSelector(selectUserData);
    darkTheme = userData?.darkTheme;

    const average = (array) => array.reduce((a, b) => a + b) / array.length;

    useEffect(() => {
        if (reviews.length !== 0) {
            let arr = [];
            reviews.map(({ data }) => arr.push(parseInt(data.rating)));
            setAvgRating(average(arr));
        }
    }, [reviews])

    useEffect(() => {
        productsRef.where('email', '==', id)
            .onSnapshot(snapshot => setProducts(snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() }))))
    }, [id]);

    useEffect(() => {
        if (id) {
            companies.where('userEmail', '==', id)
                .onSnapshot(snapshot => setCompanyData(snapshot.docs.map(doc => doc.data())))
        }
    }, [id]);

    return (
        <Container>
            <h1>{companyData[0]?.title}</h1>
            <RatingBox>
                <Rating name="half-rating-read" defaultValue={2.5} precision={avgRating} readOnly />
                {/* <Rating name="read-only" value={5} readOnly /> */}
            </RatingBox>
            <hr className="style-hr" />
            <Slideshow companyProducts={products} />
            <br />
            <br />
            <hr className="style-hr" />
            <h2>Products</h2>
            <Products>
                {products.map(({ id, data }) =>
                    <ProductCard3 product={data} id={id} key={id} />
                )}
            </Products>
            <br />
            <br />
            <hr className="style-hr" />
            <h2>Reviews</h2>
            <ReviewCompany reviews={reviews} setReviews={setReviews} companyData={companyData[0] && companyData[0]} />
            <Address>
                <div>
                    <h3>Address</h3>
                    <p>{companyData[0]?.address},{companyData[0]?.city},{companyData[0]?.state},{companyData[0]?.pincode}</p>
                </div>
            </Address>
        </Container>
    )
}

export default Company

const RatingBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin:15px;
`;

const Container = styled.div`
    overflow-y: scroll;
    height: 95vh;
    >h1{    
        padding-top:50px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    >.style-hr {
        overflow: visible; /* For IE */
        height: 30px;
        width: 95vw;
        margin:auto;
        border-style: solid;
        border-color: black;
        border-width: 1px 0 0 0;
        border-radius: 20px;
    }
    >.style-hr:before { /* Not really supposed to work, but does */
        display: block;
        content: "";
        height: 30px;
        margin-top: -31px;
        border-style: solid;
        border-color: black;
        border-width: 0 0 1px 0;
        border-radius: 20px;
    }
    >h2{
        color:#383B51;
        font-size: 25px;
        border-top-right-radius:10px;
        border-top-left-radius:10px;
        font-size: 25px;
        background: rgb(137,166,196);
        background: linear-gradient(0deg, rgba(137,166,196,0) 0%, rgba(137,166,196,1) 100%);
        padding:5px 10px;
    }
    ${() => darkTheme && `
        background-color: #1F2125 !important;
        >h1{
            color:rgb(171, 191, 213); !important;
        }
        >h2{
            color:green;  
            background: rgb(137,166,196);
            background: linear-gradient(0deg, rgba(137,166,196,0) 0%, rgba(14, 19, 65, .5) 100%);
    
        }
    ` }
`;

const Products = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-evenly;
    
    /* flex-wrap: wrap; */
    ${() => window.innerWidth < 960 && `
    flex-direction:column;
    flex-wrap: no-wrap;
    align-items: center;
    `}
`;
const Address = styled.div`
    background-color:#000;
    margin-top:50px;
    color:#fff;
    padding:50px 0;
    display: flex;
    justify-content: center;
    >div{
        >p{
            font-size: 20px;
        }
    }
`;