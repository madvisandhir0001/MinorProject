import React from 'react'
import styled from 'styled-components';

const ProductCard2 = ({ product, id }) => {

    return (
        <Container>
            <img src={product.image} alt={product.name} />
            <Info>
                <h1>{product.name}</h1>
                <div><h3>Company: </h3><span>{product.companyName}</span></div>
                <div><h3>Description: </h3><span>{product.description}</span></div>
                <div><h3>Email: </h3><span>{product.email}</span></div>
                <div><h3>Price: </h3><span>{product.price}</span></div>
                <div><h3>Added on: </h3><span>{product.timestamp?.toDate()?.toDateString()}</span></div>
            </Info>
        </Container>
    )
}

export default ProductCard2

const Container = styled.div`
    display: flex;
    padding:20px;
    align-items: center;
    border-bottom: 1px solid snow;
    >img{
        width: 350px;
        object-fit: contain;
    }
    .avatar{
        width:150px;
        height:150px;
    }
`;

const Info = styled.div`
    margin-left: 20px;
    flex:1;
    >div{
        display: flex;
        font-size: 20px;
        >h3{
            margin:0 ;
            font-size:20px;
            width: 150px;
        }
        >span{
            flex:1;
        }
    }
`;