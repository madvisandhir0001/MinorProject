import React from 'react'
import styled from 'styled-components';

const Error = ({ message }) => {
    return (
        <Container>{message}</Container>
    )
}

export default Error

const Container = styled.p`
    color:red;
    font-size:16px;
    margin:10px auto;
`;