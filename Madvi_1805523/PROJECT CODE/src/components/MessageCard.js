import React from 'react'
import styled from 'styled-components'

const MessageCard = ({ message, id }) => {
    const { name, email, phoneNo, subject, description } = message
    return (
        <Container>
            <h1>{name}</h1>
            <h4>{email}</h4>
            <h4>{phoneNo}</h4>
            <h4>Subject: {subject}</h4>
            <h4>Message: <p>{description}</p></h4>
        </Container>
    )
}

export default MessageCard

const Container = styled.div`
padding: 20px;
border-bottom: 1px solid snow;
>h4{
    text-align: justify;
    >p{
        font-weight: 400;
    }
}
`;
