import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import styled from 'styled-components';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import AOS from 'aos';
import 'aos/dist/aos.css';
import { admin, products as productsRef } from '../utils/firebase';

AOS.init();

const Slideshow = ({ companyProducts }) => {
    const [products, setProducts] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const unsubscribe = productsRef.onSnapshot(snapshot => setProducts(snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() }))))

        return () => {
            unsubscribe()
        }
    }, []);
    // if (products.length !== 0) {
    //     let arr = []
    //     admin.doc('data').get().then(doc => arr = (doc.data().slideshow));
    //     setProducts(arr.map(product => ({ id: null, data: product })))
    // }

    useEffect(() => {
        if (companyProducts) {
            setProducts(companyProducts)
        }
    }, [companyProducts]);

    return (
        <Container
        // data-aos="fade-up" data-aos-duration="1000"
        >
            {products.length !== 0 && <Carousel interval={5000} infiniteLoop={true} autoPlay={true} showIndicators={false} showStatus={false} showThumbs={false}>
                {
                    products.map((product, index) =>
                        <Card key={product.data.companyName, index} onClick={() => history.push(`/company/${product.data.email}`)} >
                            <img src={product.data.image} />
                            <div className="legend">
                                <h2>{product.data.name}</h2>
                                {/* <h6>{product.companyName}</h6> */}
                                {window.innerWidth > 960 && <p >{product.data.description}</p>}
                            </div>
                        </Card>
                    )
                }
            </Carousel>}
        </Container>
    )
}

export default Slideshow

const Container = styled.div`
    margin:10px;
    background-color:white;
    border-radius: 10px;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
`;
const Card = styled.div`
    >img{
        max-height:70vh;
        object-fit: contain;
    }
    ${() => window.innerWidth < 960 && `
        >img{
            width: 50vw;
        }
    `}
`;