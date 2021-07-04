import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import styled from 'styled-components';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import AOS from 'aos';
import 'aos/dist/aos.css';
import { admin, products as productsRef } from '../utils/firebase';

AOS.init();

const Slideshow2 = ({ companyProducts }) => {
    const [products, setProducts] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const unsubscribe = productsRef.onSnapshot(snapshot => setProducts(snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() }))))

        return () => {
            unsubscribe()
        }
    }, []);

    useEffect(() => {
        if (companyProducts) {
            setProducts(companyProducts)
        }
    }, [companyProducts]);

    return (
        <Container >
            {products.length !== 0 && <Carousel interval={5000} infiniteLoop={true} autoPlay={true} showIndicators={false} showStatus={false} showThumbs={false}>
                {
                    products.map((product, index) =>
                        <Card key={product.data.companyName, index} onClick={() => history.push(`/company/${product.data.email}`)} >
                            <img src={product.data.image} />

                        </Card>
                    )
                }
            </Carousel>}
        </Container>
    )
}

export default Slideshow2

const Container = styled.div`
flex:.5;
    margin:10px;
    background-color:white;
    border-radius: 10px;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
`;
const Card = styled.div`
    >img{
        max-height:350px;
        object-fit: contain;
    }
    
`;