import React, { useState } from 'react'
import styled from 'styled-components';
import CompanyAddProducts from './CompanyAddProducts';
import CompanyInfo from './CompanyInfo'
import CompanyProducts from './CompanyProducts';

const CompanyCP = ({ companyData }) => {
    const [show, setShow] = useState(-1);
    const toggle = (i) => (show === i) ? setShow(-1) : setShow(i);

    return (
        <Container>
            <h1>{companyData?.title.toUpperCase()}</h1>
            <CompanyInfo companyData={companyData} show={show} toggle={() => toggle(0)} />
            <CompanyProducts companyData={companyData} show={show} toggle={() => toggle(1)} />
            <CompanyAddProducts companyData={companyData} show={show} toggleFn={toggle} toggle={() => toggle(2)} />
        </Container>
    )
}

export default CompanyCP

const Container = styled.div`
    width:100%;
    display: flex;
    flex-direction:column;
    overflow-y: scroll;
    overflow-x:hidden;
    height: 100%;
    ${() => window.innerWidth < 960 && `
        padding-bottom: 100px;
        overflow: scroll;
    `}
    ::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;  
    scrollbar-width: none;
    >h1{
        background:#B1A7B2;
        border-top-right-radius:15px;
        padding:5px 10px;
        font-size: 30px;
        background: rgb(137,196,175);
        background: linear-gradient(90deg, rgba(137,196,175,1) 0%, rgba(137,166,196,1) 100%);
    }
    >h2{
        margin: auto;
        text-decoration: underline;
    }
    >button{
        align-self:center;
        margin-top:20px;
    }
`;
