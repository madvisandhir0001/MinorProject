import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { admin } from '../utils/firebase';
import MessageCard from './MessageCard';

const Messages = () => {

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        admin.doc('data').collection('contactUs').onSnapshot(snapshot =>
            setMessages(snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() })))
        )
    }, [])

    return (
        <Container>
            {messages.length !== 0 ?
                messages.map(message => <MessageCard message={message.data} id={message.id} key={message.id} />)
                : <></>
            }
        </Container>
    )
}

export default Messages

const Container = styled.div`
    background: lightgray ;
    min-height: 800px;
`;