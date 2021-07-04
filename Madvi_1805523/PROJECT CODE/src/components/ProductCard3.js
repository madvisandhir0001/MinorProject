import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectUserData } from '../features/appSlice';

let darkTheme;
const ProductCard3 = ({ product, id }) => {
    const [show, setShow] = useState(false)

    const userData = useSelector(selectUserData);
    darkTheme = userData?.darkTheme;

    return (
        <Container onClick={() => setShow(!show)}>
            <img src={product.image} alt={product.name} />
            <Info>
                <h1>{product.name}</h1>
                {show &&
                    <>
                        <div><h3>Company: </h3><span>{product.companyName}</span></div>
                        <div><h3>Description: </h3><span>{product.description}</span></div>
                        <div><h3>Email: </h3><span>{product.email}</span></div>
                        {product.price && <div><h3>Price: </h3><span>{product.price}</span></div>}
                        <div><h3>Added on: </h3><span>{product.timestamp?.toDate()?.toDateString()}</span></div>
                    </>
                }
            </Info>
        </Container>
    )
}

export default ProductCard3

const Container = styled.div`
    display: flex;
    flex-direction:column;
    padding:20px;
    padding-top: 0;
    align-items: center;
    border-bottom: 1px solid snow;
    background-color: #fff;
    margin-bottom: 20px;
    max-width: 500px;
    cursor: pointer;
    border: 1px solid lightgray;
    >img{
        max-width: 500px;
        width: 100%;
        object-fit: contain;
    }
    /* width: fit-content; */
    .avatar{
        width:150px;
        height:150px;
        /* padding:20px; */
    }
    ${() => window.innerWidth < 960 && `
        padding:0;
    `}
    ${() => darkTheme && `
    background-color: rgba(50, 50,50, .5) !important;
        color:  rgb(171, 191, 213); !important;;
    ` }
`;

const Info = styled.div`
    margin-left: 20px;
    flex:1;
    border-top: 1px solid black;
    margin-top: 5px;
    >h1{
        font-size:25px;
    }
    >div{
        display: flex;
        font-size: 20px;
        /* align-items: center; */
        >h3{
            margin:0 ;
            font-size:20px;
            width: 120px;
        }
        >span{
            flex:1;
            /* margin-left: 20px; */
        }
    }
    ${() => darkTheme && `
        color: #BCB9B7;
    ` }
`;