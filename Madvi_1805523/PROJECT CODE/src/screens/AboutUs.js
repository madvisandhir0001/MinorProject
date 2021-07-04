import React from 'react'
import styled from 'styled-components'

const AboutUs = () => {
    return (
        <Container>
            <About>
                <InnerContainer>
                    <h1>About Us</h1>
                    <p>Our Platform mainly focuses on small scale industries. In this world of fierce competition, it is very important for the businesses to prompt themselves so that people can get to know about the products. But some of the existing platforms require them to pay high amount of money in order to present their products. In this way, small scale industries struggle to promote their products.</p>
                    <p>Our site ‘s prime focus is SMALL SCALE BUSINESS. We provide them a platform to freely promote their products without any additional cost. In this, all the buyers and sellers come together to support each other and grow altogether. </p>
                    <p>Our site also provides the people to share their reviews about the particular service or products and in this way, you can easily select what’s best for you.</p>
                    <p>Our main Objective:</p>
                    <p>•	THE GROWTH OF SMALL SCALE INDUSTRIES</p>
                    <p> •	COMPANIES GET FAMILIARIZED WITH OTHERS</p>
                    <p> •	BEST SERVICES TO CHOOSE FROM</p>
                    <p> •	KNOWING WHAT’S AVAILABLE IN THE MARKET.</p>
                </InnerContainer>
            </About>
        </Container>
    )
}

export default AboutUs

const Container = styled.div`
    background-image: url("https://wallpaperaccess.com/full/3124512.jpg");
    background-color: #cccccc;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 95vh;
`;

const About = styled.div`
    background-color:rgba(20,20,20,.4);
    width:100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: scroll;
    padding-bottom: 50px;
    ::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;  
    scrollbar-width: none;
`;
const InnerContainer = styled.div`
    width: 100%;
    max-width:1000px;
    padding:10px;
    color:white !important;
    >h1{
        margin: 50px 0;
        font-size: 60px;
        ${() => window.innerWidth < 600 && `
            font-size:40px;
        `}
    }
    >p{
        text-align: justify;
        ${() => window.innerWidth < 600 && `
            font-size:16px;
        `}
    }
`;