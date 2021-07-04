import { Button, CircularProgress, TextareaAutosize } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Error from '../components/Error';
import InputField from '../components/InputField';
import { selectUserData } from '../features/appSlice';
import { admin } from '../utils/firebase';
let darkTheme;
const ContactUs = () => {
    const userData = useSelector(selectUserData);
    darkTheme = userData?.darkTheme;
    const [error, setError] = useState(null);
    const [sent, setSent] = useState(false);
    const [progress, setProgress] = useState(false);
    const [data, setData] = useState({
        name: '',
        email: '',
        phoneNo: '',
        subject: '',
        description: '',
    });

    useEffect(() => {
        if (userData) {
            setData({ ...data, name: userData.name, email: userData.email, phoneNo: userData.phoneNo })
        }

        return () => {
            setSent(false);
        }
    }, [userData])

    const handleClick = e => {
        e.preventDefault();
        setError(null);

        if (
            data.name.length > 0 &&
            data.email.length > 0 &&
            data.phoneNo.length > 0 &&
            data.subject.length > 0 &&
            data.description.length > 0
        ) {
            setProgress(true);
            admin.doc('data').collection('contactUs').add(data).then(() => {
                setProgress(false);
                setSent(true);
            })
        } else {
            setError("Missing Data")
        }

    }

    return (
        <Container>
            <Form>
                {!sent ?
                    <>
                        <h1>Contact Us</h1>
                        <InputField value={data.name} Data={data} setData={setData} id={'name'} key={'name'} label={'Name'} />
                        <InputField value={data.email} Data={data} setData={setData} id={'email'} key={'email'} label={'Email'} />
                        <InputField value={data.phoneNo} Data={data} setData={setData} id={'phoneNo'} key={'phoneNo'} label={'Phone Number'} />
                        <InputField value={data.subject} Data={data} setData={setData} id={'subject'} key={'subject'} label={'Subject'} />
                        <TextareaAutosize
                            className="textArea"
                            value={data.description}
                            onChange={e => setData({ ...data, description: e.target.value })}
                            rowsMax={4}
                            rows={4}
                            aria-label=""
                            placeholder="Description"
                        />
                        {error && <Error message={error} />}
                        <Button type="submit" onClick={handleClick} variant="contained" color="primary" >{!progress ? "Send" : <CircularProgress color="inherit" size={20} />}</Button>
                    </>
                    :
                    <Sent>
                        <h3>Message Sent</h3>
                        <Link to="/"><Button>Home</Button></Link>
                    </Sent>
                }
            </Form>
        </Container>
    )
}

export default ContactUs

const Container = styled.div`
    background-image: url("https://wallpaperaccess.com/full/3124512.jpg");
    background-color: #cccccc;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 95vh;
    display: grid;
    place-items:center;
`;
const Form = styled.form`
    display:flex;
    flex-direction:column;
    width: 98vw;
    margin:auto;
    max-width:450px;
    background-color:rgba(256,256,256,.5);
    padding:40px;
    border-radius: 20px;
    color:#000;
    border: 1px solid black;
    >h1{
        margin-bottom: 20px;
    }
    >.textArea{
        padding:10px;
        background-color:transparent;
    }
    >button{
        margin-top: 20px;
    }
    ${() => darkTheme && `
        background-color: rgba(50, 50,50, .8) !important;
        >h1{
            color:rgb(171, 191, 213); 
        }
    ` }
`;

const Sent = styled.div`
    color:green;
    display: flex;
    flex-direction:column;
    align-items: center;
`;