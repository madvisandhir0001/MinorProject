import React from 'react'
import styled from 'styled-components';

const Success = ({ message }) => {
    return (
        <Container>{message}</Container>
    )
}

export default Success

const Container = styled.p`
    color:green;
    font-size:16px;
`;