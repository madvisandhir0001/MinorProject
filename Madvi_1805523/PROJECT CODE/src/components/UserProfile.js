import { Button } from '@material-ui/core';
import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useHistory } from 'react-router';
import styled from 'styled-components'
import { auth, users } from '../utils/firebase';
import EditBox from './EditBox';
import firebase from 'firebase'
import AddProfileImage from './AddProfileImage';
import AlertBox from './AlertBox';
import { selectCompanyData } from '../features/appSlice';
import { useSelector } from 'react-redux';

const UserProfile = ({ userData }) => {
    const [user] = useAuthState(auth);
    const companyData = useSelector(selectCompanyData);
    const history = useHistory();
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [primary, setPrimary] = useState(null);

    const deleteUser = () => {
        var user = firebase.auth().currentUser;
        const email = user.email
        const password = prompt("Enter Password ", '');
        firebase.auth().currentUser.reauthenticateWithCredential(firebase.auth.EmailAuthProvider.credential(userData.email, password))
        user.delete().then(function () {
            auth.currentUser && auth.signOut()
            users.doc(email).delete().then(() => {
                history.replace('/');
            })
        }).catch(function (error) {
            console.log(error)
        });
    }

    return (
        <Container>
            <h1>Profile</h1>
            <Alerts>
                {success && <AlertBox type={'success'} message={success} messageStrong={""} />}
                {error && <AlertBox type={'warn'} message={error} messageStrong={""} />}
                {primary && <AlertBox type={'primary'} message={primary} messageStrong={""} action={() => window.location.reload()} />}
            </Alerts>
            <EditBoxs>
                <AddProfileImage userData={userData} />
                <EditBox
                    key={'email'}
                    userData={userData}
                    error={error}
                    setError={setError}
                    success={success}
                    setSuccess={setSuccess}
                    userId={userData.email}
                    type={'email'}
                    name={'email'}
                    title={'Email'}
                    value={userData.email}
                    id={'email'}
                    immutable //Can`t change email
                    setPrimary={setPrimary}
                />
                <EditBox
                    key={'name'}
                    userData={userData}
                    error={error}
                    setError={setError}
                    success={success}
                    setSuccess={setSuccess}
                    userId={userData.email}
                    type={'text'}
                    name={'name'}
                    title={'Name'}
                    value={userData.name}
                    id={'name'}
                    setPrimary={setPrimary}
                />
                <EditBox
                    key={'phoneNo'}
                    userData={userData}
                    error={error}
                    setError={setError}
                    success={success}
                    setSuccess={setSuccess}
                    userId={userData.email}
                    type={'number'}
                    name={'phone'}
                    title={'Phone Number'}
                    value={userData.phoneNo}
                    id={'phoneNo'}
                    setPrimary={setPrimary}
                />
                <EditBox
                    key={'companyName'}
                    userData={userData}
                    error={error}
                    setError={setError}
                    success={success}
                    setSuccess={setSuccess}
                    userId={userData.email}
                    type={'text'}
                    name={'company'}
                    title={'Company'}
                    value={companyData?.title}
                    id={'companyName'}
                    setPrimary={setPrimary}
                />
                <Buttons>
                    <DeleteUser variant="contained" onClick={deleteUser}>Delete Account</DeleteUser>
                    <LogoutButton color="primary" variant="contained" onClick={() => auth.signOut()}>LogOut</LogoutButton>
                </Buttons>
            </EditBoxs>
        </Container>
    )
}

export default UserProfile

const Container = styled.div`
    /* overflow: scroll; */
    >h1{
        border-top-right-radius:15px;
        background:#B1A7B2;
        padding:5px 10px;
        font-size: 30px;
        background: rgb(137,196,175);
        background: linear-gradient(90deg, rgba(137,196,175,1) 0%, rgba(137,166,196,1) 100%);
    }
    ${() => window.innerWidth < 960 && `
        padding-bottom: 100px;
        overflow: scroll;
    `}
`;
const Alerts = styled.div`
    max-width: 500px;
    margin:10px auto;
    width: 100%;
    ${() => window.innerWidth < 960 && `
        flex-direction:column;
    `}
`;
const Buttons = styled.div`
    display: flex;
    justify-content:space-evenly;
`;

const DeleteUser = styled(Button)`
    background-color:#B33A3A !important;
    color:white !important;
    /* width: 150px !important; */
`;
const LogoutButton = styled(Button)`
    /* background-color:whitesmoke !important; */
    /* color:#000 !important; */
    /* width:150px !important; */
`;
const EditBoxs = styled.div`
    width:500px;
    margin:auto;
    ${() => window.innerWidth < 960 && `
    width:100%;
        flex-direction:column;
    `}
`;
