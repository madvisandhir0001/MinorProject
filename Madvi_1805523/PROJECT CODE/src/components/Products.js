import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { products as productsRef } from '../utils/firebase';
import ProductCard2 from './ProductCard2';

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        productsRef.onSnapshot(snapshot => setProducts(snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() }))))
    }, []);

    return (
        <Container>
            {products ?
                products.map(({ id, data }) => <ProductCard2 product={data} id={id} key={id} />)
                :
                <CircularProgress />
            }
        </Container>
    )
}

export default Products

const Container = styled.div`
    background: lightgray ;
    min-height: 800px;
`;