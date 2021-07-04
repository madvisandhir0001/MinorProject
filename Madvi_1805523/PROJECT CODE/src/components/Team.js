import React from 'react'
import styled from 'styled-components';
import TeamMemberCard from './TeamMemberCard';

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useSelector } from 'react-redux';
import { selectUserData } from '../features/appSlice';
AOS.init();
let darkTheme;
const Team = () => {

    const userData = useSelector(selectUserData);
    darkTheme = userData?.darkTheme;
    return (
        <Container>
            <h1>Team</h1>
            <Cards
            //  data-aos="fade-up"
            >

                <TeamMemberCard key="Madvi Sandhir" name='Madvi Sandhir' profilePic={'https://firebasestorage.googleapis.com/v0/b/waytosuccess-india.appspot.com/o/assests%2Fteam%2FWhatsApp%20Image%202021-05-25%20at%2011.05.03%20PM.jpeg?alt=media&token=83dc2d6b-b75b-441f-8653-3bd7d7b33c7e'}
                    about="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry." />
                <TeamMemberCard key="Amisha Bagri" name='Amisha Bagri' profilePic={'https://firebasestorage.googleapis.com/v0/b/waytosuccess-india.appspot.com/o/assests%2Fteam%2FWhatsApp%20Image%202021-05-25%20at%2011.04.59%20PM.jpeg?alt=media&token=fffcc4d0-ebf4-4486-a906-b7f5855e3124'}
                    about="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry." />
                <TeamMemberCard key="Arsh Matharoo" name='Arsh Matharoo' profilePic={'https://firebasestorage.googleapis.com/v0/b/waytosuccess-india.appspot.com/o/assests%2Fteam%2FWhatsApp%20Image%202021-05-25%20at%2011.05.01%20PM%20(1).jpeg?alt=media&token=77c47606-36a3-43fd-b4f9-59ca02e3bd9f'}
                    about="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry." />

            </Cards>
        </Container>
    )
}

export default Team

const Container = styled.div`
    margin:10px;
    /* background-color:white; */
    border-radius:10px;
    >h1{
        border-top-right-radius:10px;
        border-top-left-radius:10px;
        background-color:#ADB3C8;
        font-size: 25px;
        background: rgb(137,166,196);
        background: linear-gradient(0deg, rgba(137,166,196,0) 0%, rgba(137,166,196,1) 100%);
        padding:5px 10px;
    }
    ${() => darkTheme && `
        background-color: rgba(50, 50,50, .5) !important;
        >h1{
            color:green;  
            background: rgb(137,166,196);
            background: linear-gradient(0deg, rgba(137,166,196,0) 0%, rgba(14, 19, 65, .5) 100%);
        }
    ` }
`;
const Cards = styled.div`
    display: flex;
    margin:auto;
    width: 60vw;
    ${() => window.innerWidth < 1000 && `
        width:100vw;
        flex-direction:column;
        align-items: center;
    `}
    /* justify-contsent: space-evenly; */
`;