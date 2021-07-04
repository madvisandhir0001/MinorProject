import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import styled from 'styled-components'
import UserCard from '../components/UserCard';
import { users } from '../utils/firebase';

const AppUser = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (id) {
            users.doc(id).get().then(doc => setUser(doc.data()))
        }
    }, [id])

    return (
        <Container>
            {user && <UserCard user={user} />}
        </Container>
    )
}

export default AppUser

const Container = styled.div``;

