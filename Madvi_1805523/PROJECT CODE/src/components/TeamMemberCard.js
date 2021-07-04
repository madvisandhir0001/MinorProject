import { Avatar } from '@material-ui/core';
import React from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectUserData } from '../features/appSlice';
let darkTheme;

const TeamMemberCard = ({ name, profilePic, about }) => {

    const userData = useSelector(selectUserData);
    darkTheme = userData?.darkTheme;

    return (
        <Container>
            <Space />
            <UserAvatar src={profilePic} />
            <Info>
                <h1>{name}</h1>
                {/* <p>{about}</p> */}
            </Info>
        </Container>
    )
}

export default TeamMemberCard

const Container = styled.div`
    margin:10px;
    background-color:whitesmoke;
    border-radius:10px;
    display: flex;
    align-items: center;
    flex-direction:column;
    position:relative;
    width:350px;
    ${() => darkTheme && `
        background-color: #28292B !important;
        >h1{
            color:green;  
            background: rgb(137,166,196);
            background: linear-gradient(0deg, rgba(137,166,196,0) 0%, rgba(14, 19, 65, .5) 100%);
        }
    ` }
`;
const UserAvatar = styled(Avatar)`
    width: 150px !important;
    height: 150px !important;
    position:absolute !important;
    top:65px;
`;
const Info = styled.div`
    background-color: white;
    border-radius:10px;
    display: flex;
    align-items: center;
    flex-direction:column;
    padding:30px;
    padding-top:85px;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
    >h1{
        font-size:25px;
    }
    >p{
        text-align:justify;
    }
    ${() => darkTheme && `
            background-color: rgba(50, 50,50, .5) !important;
            color:rgb(171, 191, 213); 
    ` }
`;
const Space = styled.div`
    height: 150px !important;
`;