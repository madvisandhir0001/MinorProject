import React, { useEffect, useRef, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, users } from '../utils/firebase';
import { Avatar, Button, CircularProgress, IconButton } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router';
import { Link as ATag } from 'react-router-dom';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { useSelector } from 'react-redux';
import { selectCompanyData, selectUserData } from '../features/appSlice';
import styled from 'styled-components';
import MenuIcon from '@material-ui/icons/Menu';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import LocalParkingIcon from '@material-ui/icons/LocalParking';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import AOS from 'aos';
import DarkModeToggle from "react-dark-mode-toggle";
import 'aos/dist/aos.css';
AOS.init();
let darkTheme;
const HeaderMobile = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => false);
    const [user, loading] = useAuthState(auth);
    const history = useHistory();

    const userData = useSelector(selectUserData);
    darkTheme = userData?.darkTheme;
    const companyData = useSelector(selectCompanyData);
    const [showSettings, setShowSettings] = useState(false);
    const [showNav, setShowNav] = useState(false)
    const settingsRef = useRef();
    const navRef = useRef();
    const location = useLocation();
    const pathName = location.pathname;
    const hideAuthButtons = pathName === "/user/register" || pathName === "/user/login";


    const useOutsideAlerter = ref => {
        useEffect(() => {
            const handleClickOutside = event => {
                if (ref.current && !ref.current.contains(event.target)) {
                    setShowSettings(false);
                    setShowNav(false);
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside)
        }, [ref]);
    }

    useEffect(() => {
        setIsDarkMode(userData?.darkTheme)
    }, [userData])

    useOutsideAlerter(settingsRef);
    useOutsideAlerter(navRef);

    useEffect(() => {
        setTimeout(() => {
            const header = document.getElementById('header')
            header.classList.remove("animate__animated")
            header.classList.remove("animate__zoomInDown")
        }, 2000)
    }, [])
    const handleDarkToggle = () => {
        users.doc(user.email).set({ darkTheme: !isDarkMode }, { merge: true })
    }

    return (
        <Container
            id="header"
            className="animate__animated animate__zoomInDown"
        >
            <Hamburger className="mui-icon" onClick={() => setShowNav(!showNav)} >
                <MenuIcon color="primary" />
            </Hamburger>
            {showNav && <Nav className="no-select" ref={navRef}>
                <Space></Space>
                <div className="dropdown" onClick={() => setShowNav(false)}>
                    <Link to="/" className={pathName === '/' && "header-nav-active"}>Home</Link>
                </div>
                <Space></Space>
                <div className="dropdown">
                    <Link id="dropdownMenuButton" data-toggle={"dropdown"} aria-haspopup="true" aria-expanded="false" className={pathName.includes('/categories') && "header-nav-active"}>Categories</Link>
                    <div className="dropdown-menu  dropdown-menu-custom" aria-labelledby="dropdownMenuButton" >
                        <p className="dropdown-item dropdown-item-custom" onClick={() => {
                            history.push('/');
                            history.push('?category=Steel & Iron Industries')
                        }}>
                            <GroupWorkIcon className="dropdown-menu-custom-icon" />
                            Steel & Iron Industries
                        </p><div className="dropdown-divider"></div>

                        <p className="dropdown-item dropdown-item-custom" onClick={() => {
                            history.push('/');
                            history.push('?category=Automobile Industries')
                        }
                        }>
                            <DirectionsCarIcon className="dropdown-menu-custom-icon" />
                        Automobile Industries</p><div className="dropdown-divider"></div>

                        <p className="dropdown-item dropdown-item-custom" onClick={() => {
                            history.push('/');
                            history.push('?category=Cycle parts Industries')
                        }
                        }>
                            <DirectionsBikeIcon className="dropdown-menu-custom-icon" />
                        Cycle parts Industries</p><div className="dropdown-divider"></div>

                        <p className="dropdown-item dropdown-item-custom" onClick={() => {
                            history.push('/');
                            history.push('?category=Food & Beverages Industries')
                        }
                        }>
                            <FastfoodIcon className="dropdown-menu-custom-icon" />
                        Food & Beverages Industries</p><div className="dropdown-divider"></div>

                        <p className="dropdown-item dropdown-item-custom" onClick={() => {
                            history.push('/');
                            history.push('?category=Plastic Industries')
                        }
                        }>
                            <LocalParkingIcon className="dropdown-menu-custom-icon" />
                            Plastic Industries</p>

                    </div>
                </div>
                <Space></Space>
                <div className="dropdown" onClick={() => setShowNav(false)}>
                    <Link to="/about" className={pathName === '/about' && "header-nav-active"}>About Us</Link>
                </div>
                <Space></Space>
                <div className="dropdown" onClick={() => setShowNav(false)}>
                    <Link to="/contact" className={pathName === '/contact' && "header-nav-active"}>Contact Us</Link>
                </div>
                <Space></Space>
                {/* <div className="dropdown">
                    {user && <Link to="/user/dashboard/profile" className={pathName === '/user/dashboard/profile' && "header-nav-active"}>Profile</Link>}
                </div> */}
            </Nav>}

            <Brand onClick={() => history.push('/')} style={{ filter: isDarkMode && "invert(1)" }}>
                <img src="https://firebasestorage.googleapis.com/v0/b/waytosuccess-india.appspot.com/o/assests%2Flogo.png?alt=media&token=2c88bef2-01a6-4d91-8cc0-fbe6f16e52f6" alt="app__logo" />
                {/* <h1>Way to Success</h1> */}
            </Brand>

            {(!hideAuthButtons && user) && <Toggler>
                <DarkModeToggle
                    onChange={handleDarkToggle}
                    checked={isDarkMode}
                    speed={1.5}
                    size={40}
                />
            </Toggler>}

            {
                !loading ?
                    (!user ?
                        (!hideAuthButtons &&
                            <Auth>
                                <Button onClick={() => history.push('/user/login')} variant="outlined" color="primary">Sign In</Button>
                                {/* <Button style={{ marginLeft: '10px' }} onClick={() => history.push('/user/register')} variant="contained" color="primary"
                                // endIcon={<ArrowForwardIcon />}
                                >Get Started</Button> */}
                            </Auth>
                        )
                        :
                        <User onClick={() => setShowSettings(!showSettings)}>
                            <Avatar style={{ width: '30px', height: '30px' }} src={userData?.profilePic} />
                            <ArrowDropDownIcon style={{ color: 'gray' }} />
                        </User>)
                    :
                    <CircularProgress size={20} />
            }

            {showSettings &&
                <Settings onClick={() => setShowSettings(false)} ref={settingsRef}>
                    {userData?.role === 'admin' && <p onClick={() => history.push('/admin')}>Admin Block</p>}
                    <p onClick={() => history.push('/user/dashboard/profile')}>Dashboard</p>
                    <p onClick={() => history.push('/user/dashboard/profile')}>Edit Profile</p>
                    {/* <p onClick={() => history.push('/user/dashboard/account')}>Account Settings</p> */}
                    {!companyData && <p onClick={() => history.push('/user/dashboard/register company')}>Add Company</p>}
                    {companyData && <p onClick={() => history.push('/user/dashboard/company')}>{companyData?.title}</p>}
                    <p onClick={() => history.push('/contact')}>Help</p>
                    <p onClick={() => auth.signOut().then(() => history.replace('/'))}>Logout</p>
                </Settings>
            }
        </Container>
    )
}

export default HeaderMobile

const Container = styled.div`
    display: flex;
    justify-content:space-between;
    padding:5px ;
    align-items: center;
    background-color:white;
    border-bottom: 1px solid lightgray;
    z-index:1 !important;
    position:relative;
    /* ::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;  
    scrollbar-width: none; */
    ${() => darkTheme && `
        background: black;
    ` }
`;
const Brand = styled.div`
    display: flex;
    align-items: center;
    cursor:pointer;
    >img{
        height:40px;
        object-fit:contain;
    }
    >h1{
        font-size:20px;
        margin-left:20px;
    }
`;
const Space = styled.div`
    height:8px;
`;
const Toggler = styled.div`
    position: absolute;
    right:75px;
`;
const Nav = styled.div`
    flex:1;
    display: flex;
    /* max-width:500px; */
    flex-direction: column;
    align-items: flex-start;
    background: rgba(256,256,256,1);
    border-radius:10px;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
    width: fit-content;
    /* max-width:100vw; */
    padding:0 !important;
    position:absolute;
    bottom:-160px;
    >div{
        padding:0 10px !important;
        margin:0;
    }
`;
const Link = styled(ATag)`
    color:black;
    font-size:20px;
    font-weight:400;
    transition:all .25s ease-in-out;
    padding:5px !important;
    :hover{
        transform:scale(1.07);
    }
    ${() => darkTheme && `
        color: #BCB9B7;
    ` }
`;
const User = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
`;

const Auth = styled.div``;

const Settings = styled.div`
    position:absolute;
    background-color:#323941;
    color:#ADBAC7;
    right:15px;
    top:46px;
    border-radius:10px;
    z-index:1 !important;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
    >p{
        padding:0;
        margin:0;
        padding:5px 10px;
        border-bottom:1px solid #ADBAC7;
        transition:all .25s ease-in-out;
        cursor: pointer;
    }
    p:last-of-type{
        border:none !important;
    }
    >p:hover{
        /* transform:scale(1.06); */
        background:#316DCA;
    }
`;
const Hamburger = styled(IconButton)`

`;