import React from 'react'
import styled from 'styled-components'
import Slideshow from '../components/Slideshow';
import Categories from '../components/Categories';
import PinnedProfiles from '../components/PinnedProfiles';
import BriefProfile from '../components/BriefProfile';
import AboutSite from '../components/AboutSite';
import Team from '../components/Team';
import Footer from '../components/Footer';
import Header from '../components/Header';
import AlertBox from '../components/AlertBox';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { selectUserData } from '../features/appSlice';

import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

let darkTheme;

const HomeScreen = () => {
    const history = useHistory();
    const userData = useSelector(selectUserData);
    darkTheme = userData?.darkTheme

    return (
        <Container>
            {userData &&
                (!userData.emailVerified &&
                    <AlertBox type="info" message="" messageStrong="Complete your Profile" action={() => history.push('/user/dashboard/profile')} />
                )
            }
            <Body>
                {/* {window.innerWidth > 1100 &&  */}
                <Left >
                    <Slideshow />
                </Left>
                {/* } */}
                <Right data-aos="fade-up" data-aos-duration="1000">
                    <Categories />
                    <PinnedProfiles />
                </Right>
            </Body>
            <BriefProfile />
            <AboutSite />
            <Team />
            <Footer />
        </Container>
    )
}

export default HomeScreen

const Container = styled.div`
    -ms-overfle-style:none;
    scrollbar-width:none;
    background-color:whitesmoke;
    height:100vh;
    z-index:150 !important;
    overflow: scroll;
    ${() => darkTheme && `
        background: #1F2125;
    ` }
`;
const Body = styled.div`
    display: flex;
    width:98vw;
    position:relative;
    overflow:hidden;
    margin-top:20px;
    margin:auto;
    justify-content:space-between;
    ${() => window.innerWidth < 1100 && `
        flex-direction:column;
    `}
`;
const Left = styled.div`
    flex:.65;
    height:90vh;
    width:100%;
    padding:70px;
    transform:scale(1.2);
    ${() => window.innerWidth < 960 && `
    padding:0px;
    margin:10px 0px;
    `}
`;
const Right = styled.div`
    flex:.3;
    height:100%;
    width:100%;
    overflow:hidden !important;
    >img{
        height:450px;
        object-fit:contain;
        padding-right:50px;
        padding-top:50px;
    }
`;
