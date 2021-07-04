import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { users as usersRef } from '../utils/firebase'
import UserCard from './UserCard';

const Users = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        usersRef.onSnapshot(snapshot => setUsers(snapshot.docs.map(doc => doc.data())))
    }, [])

    return (
        <Container >
            {users ?
                users.map(user => <UserCard user={user} />)
                :
                <CircularProgress />
            }
        </Container>
    )
}

export default Users

const Container = styled.div`
    background: lightgray ;
    min-height: 800px;
`;