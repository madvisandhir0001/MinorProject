import { Avatar, Button } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import styled from 'styled-components'
import { selectCompanies, selectUserData } from '../features/appSlice'
import { companies, users } from '../utils/firebase'

const UserCard = ({ user }) => {
    const [companyData, setCompanyData] = useState([]);
    const history = useHistory()
    const userData = useSelector(selectUserData);
    const admin = userData && (userData.role === 'admin' ? true : false)

    useEffect(() => {
        if (user) {
            companies.where('userEmail', '==', user.email).onSnapshot(snapshot => setCompanyData(snapshot.docs.map(doc => doc.data())))
        }
    }, [user]);

    const makeAdmin = () => {
        users.doc(user.email).set({ role: 'admin' }, { merge: true })
    }

    const removeAdmin = () => {
        users.doc(user.email).set({ role: 'users' }, { merge: true })
    }

    return (
        <Container>
            <Avatar className="avatar" src={user.profilePic} />
            <Info>
                <h3>{user.name.charAt(0).toUpperCase() + user.name.slice(1)}</h3>
                <h4>{user.email}</h4>
                <h4>{user.phoneNo}</h4>
                <h4>
                    {user.role === 'admin' ? "Admin" : "User"}{admin && (user.role === 'users' ?
                        <Button color="secondary" onClick={makeAdmin}>Make Admin</Button>
                        :
                        <Button color="primary" onClick={removeAdmin}>Remove Admin</Button>)}
                </h4>
                {companyData.length !== 0 ? <Button variant="outlined" onClick={() => history.push(`/company/${user.email}`)}>  {companyData[0].title}</Button>
                    :
                    <h4>No company Registered</h4>
                }
            </Info>
        </Container>
    )
}

export default UserCard

const Container = styled.div`
    display: flex;
    padding:20px;
    align-items: center;
    border-bottom: 1px solid snow;
    .avatar{
        width:150px;
        height:150px;
        /* padding:20px; */
    }
`;

const Info = styled.div`
    margin-left: 20px;
    flex:1;
    >h4{
        font-weight:400;
    }
`;