
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import InputField from './InputField'
import TitleIcon from '@material-ui/icons/Title';
import LanguageIcon from '@material-ui/icons/Language';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import MailIcon from '@material-ui/icons/Mail';
import PinDropIcon from '@material-ui/icons/PinDrop';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import { Button, CircularProgress } from '@material-ui/core';
import { auth, companies, users } from '../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Error from './Error';
import { useHistory } from 'react-router';
import AddCompanyImage from './AddCompanyImage';
import { useSelector } from 'react-redux';
import { selectCompanyData, selectUserData } from '../features/appSlice';
import CategoryIcon from '@material-ui/icons/Category';
let darkTheme;
const RegisterCompany = () => {
    const [user] = useAuthState(auth);
    const existCompanyData = useSelector(selectCompanyData);

    const userData = useSelector(selectUserData);
    darkTheme = userData?.darkTheme;
    const [companyData, setCompanyData] = useState({
        title: '',
        website: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        email: '',
        landline: '',
        phoneNo: '',
        category: '',
        userEmail: user.email
    });

    const [progress, setProgress] = useState(false);
    const [error, setError] = useState(null);
    const history = useHistory();

    useEffect(() => {
        if (existCompanyData) {
            history.push(`/user/dashboard/company`)
        }
    }, [existCompanyData])

    const handleClick = (e) => {
        e.preventDefault();
        if (
            companyData.title.length > 0 &&
            companyData.address.length > 0 &&
            companyData.city.length > 0 &&
            companyData.state.length > 0 &&
            companyData.pincode.length > 0 &&
            companyData.email.length > 0 &&
            companyData.phoneNo.length > 0 &&
            companyData.category.length > 0
        ) {
            register();
        } else {
            setError('Field values missing')
        }
    }

    const register = () => {
        setProgress(true);
        companies.add(companyData, { merge: true })
            .then(() => {
                history.replace(`/user/dashboard/company`);
            })
    };

    return (
        <Container>
            {userData.emailVerified && userData.phoneNoVerified ?
                <>
                    <h1>Register Your Company</h1>
                    <h2>Enter Company Details</h2>
                    <Form>
                        <InputField Data={companyData} setData={setCompanyData} value={companyData.title} id={'title'} label="Title" icon={<TitleIcon />} />
                        <InputField Data={companyData} setData={setCompanyData} value={companyData.website} id={'website'} label="Website" icon={<LanguageIcon />} optional />
                        <InputField Data={companyData} setData={setCompanyData} value={companyData.category} id={'category'} label="Category" icon={<CategoryIcon />} selectType />
                        <InputField Data={companyData} setData={setCompanyData} value={companyData.address} id={'address'} label="Address" icon={<LocationOnIcon />} />
                        <InputField Data={companyData} setData={setCompanyData} value={companyData.city} id={'city'} label="City" icon={<LocationOnIcon />} />
                        <InputField Data={companyData} setData={setCompanyData} value={companyData.state} id={'state'} label="State" icon={<AccountBalanceIcon />} />
                        <InputField Data={companyData} setData={setCompanyData} value={companyData.pincode} id={'pincode'} label="Pincode" icon={<PinDropIcon />} />
                        <InputField Data={companyData} setData={setCompanyData} value={companyData.email} id={'email'} label="E-Mail" icon={<MailIcon />} />
                        <InputField Data={companyData} setData={setCompanyData} value={companyData.landline} id={'landline'} label="Landline" icon={<PhoneIcon />} optional />
                        <InputField Data={companyData} setData={setCompanyData} value={companyData.phoneNo} id={'phoneNo'} label="Phone No." icon={<PhoneAndroidIcon />} />
                        <button onClick={handleClick} type="submit" hidden>Register</button>
                    </Form>
                    {error && <Error message={error} />}
                    <Button onClick={handleClick} startIcon={progress && <CircularProgress size={16} color="white" />} type="submit" variant='contained' color="primary"> Register</Button>
                </>
                :
                <VerifyFirst>
                    <h1>Register Your Company</h1>
                    <h3>
                        You need to verify Email and Phone Number to Register Your Company
                        <Button onClick={() => history.push('/user/dashboard/profile')}>Verify Now</Button>
                    </h3>
                </VerifyFirst>
            }
        </Container>
    )
}

export default RegisterCompany

const Container = styled.div`
    width:100%;
    display: flex;
    flex-direction:column;
    
    ${() => window.innerWidth < 960 && `
        padding-bottom: 100px;
        overflow: scroll;
    `}
    >h1{
        background:#B1A7B2;
        border-top-right-radius:15px;
        border-top-right-radius:15px;
        padding:5px 10px;
        font-size: 30px;
        background: rgb(137,196,175);
        background: linear-gradient(90deg, rgba(137,196,175,1) 0%, rgba(137,166,196,1) 100%);
    }
    >h2{
        margin: auto;
        text-decoration: underline;
        ${() => window.innerWidth < 960 && `
        font-size: 25px;
    `}
    }
    >button{
        align-self:center;
        margin-top:20px;
    }
    ${() => darkTheme && `
        >h2{
            color:rgb(171, 191, 213); 
        }
    ` }
`;
const Form = styled.form`
    width:100%;
    max-width:600px;
    max-height:400px;
    /* flex:1; */
    height:500px;
    margin:auto;
    margin-top:50px;
    padding:5px;
    display: flex;
    flex-wrap:wrap;
    justify-content: space-evenly;
    overflow-y:scroll;
    overflow-x:hidden;
    position:relative;
    /* ::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;  
    scrollbar-width: none;  */
     ::-webkit-scrollbar {
        width: 5px;
    }
    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }
    ::-webkit-scrollbar-thumb {
        background-color: darkgrey;
        outline: 1px solid slategrey;
    } 
    >.MuiFormControl-root{
            /* width:45% ; */
    }
    
`;
const VerifyFirst = styled.div`
    >h1{
        background:#B1A7B2;
        border-top-right-radius:15px;
    }
    >h3{
        font-size:20px;
        font-weight:400;
        width: 100%;
        margin: 10px auto;
        max-width: 350px;
        text-align: justify;
        color:#B33A3A;
    >button{
        align-items: center;
    } 
}`;
