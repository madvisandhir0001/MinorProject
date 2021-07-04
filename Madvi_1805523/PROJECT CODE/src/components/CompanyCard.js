import { Avatar } from '@material-ui/core';
import React from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components'

const CompanyCard = ({ company }) => {
    const history = useHistory();
    return (
        <Container onClick={() => history.push(`/company/${company.email}`)}>
            <Avatar a style={{ width: '150px', height: '150px' }} src={company?.profilePic} />
            <Info>
                <h1>{company.title}</h1>
                <div><h3>Website: </h3><span>{company.website}</span></div>
                <div><h3>Email: </h3><span>{company.email}</span></div>
                <div><h3>Category: </h3><span>{company?.category}</span></div>
                <div><h3>Phone No: </h3><span>{company.phoneNo}</span></div>
                <div><h3>Landline: </h3><span>{company.landline}</span></div>
                <div><h3>Address: </h3><span>{company.address}</span></div>
                <div><h3>City: </h3><span>{company.city}</span></div>
                <div><h3>State: </h3><span>{company.state}</span></div>
                <div><h3>Pincode: </h3><span>{company.pincode}</span></div>
            </Info>
        </Container>
    )
}

export default CompanyCard

const Container = styled.div`
    display: flex;
    padding:20px;
    border-bottom: 1px solid snow;
    cursor: pointer;
    :hover{
        opacity: .6;
    }
`;

const Info = styled.div`
    margin-left: 20px;
    flex:1;
    >div{
        display: flex;
        font-size: 20px;
        align-items: center;
        >h3{
            margin:0 ;
            font-size:20px;
            width: 120px;
        }
        >span{
            /* margin-left: 20px; */
        }
    }
`;