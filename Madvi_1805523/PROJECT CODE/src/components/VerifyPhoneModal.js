import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, CircularProgress, IconButton, InputAdornment, makeStyles, Modal, TextField } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import firebase from 'firebase'
import { auth, users } from '../utils/firebase';

function getModalStyle() {
    const top = 50;
    const left = 50;
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: "100%",
        maxWidth: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));


const VerifyPhoneModal = ({ open, setOpen, userData }) => {

    const [modalStyle] = useState(getModalStyle);
    const classes = useStyles();


    const [error, setError] = useState(null);
    const [progress, setProgress] = useState(null);
    const [code, setCode] = useState(null);
    const [password, setPassword] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [callback, setCallback] = useState(null);

    const verifyPhoneNumber = () => {
        const recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha-container');
        setShowForm(true);
        const phoneNumber = `+91${userData.phoneNo}`;
        auth.signInWithPhoneNumber(phoneNumber, recaptcha).then(async (e) =>
            setCallback(e)
        ).catch((err) => console.log(err))
    }

    const verify = () => {
        const email = userData.email;
        if (password.length > 0 && code.length >= 6) {
            callback.confirm(code).then((user) => {
                setProgress(true)
                auth.signInWithEmailAndPassword(email, password).then(() => {
                    users.doc(email).set({ phoneNoVerified: true }, { merge: true })
                        .then(() => setOpen(false));
                })
            }).catch((err) => console.log(err))
        } else {
            password.length === 0 && setError("Password Missing");
            code.length !== 0 && setError("OTP Invalid");
        }
    }

    return (
        <Modal open={open} onClose={() => setOpen(false)} >
            <Container style={modalStyle} className={classes.paper}>
                <h4>Phone Verification Pending</h4>
                <Recaptcha id="recaptcha-container"></Recaptcha>
                {!showForm ?
                    <Button variant="contained" color="primary" onClick={verifyPhoneNumber}>Send OTP</Button>
                    :
                    <Form>
                        <p>Verify Captcha To Get OTP</p>
                        <TextField value={code} onChange={e => setCode(e.target.value)} label="Enter OTP" />
                        <TextField
                            type={showPassword ? "text" : "password"}
                            autoComplete="current-password"
                            label="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                        <Button startIcon={progress && <CircularProgress size={16} color="inherit" />} variant="contained" color="primary" onClick={verify}>Verify</Button>
                    </Form>}
            </Container>
        </Modal>
    )
}

export default VerifyPhoneModal

const Container = styled.div`
    display: flex;
    flex-direction:column;
`;

const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction:column;
    align-items: center;
    width: 300px;
    margin:auto;
    >.MuiFormControl-root {
        width: 100%;
        margin-bottom: 15px;
    }
`;

const Recaptcha = styled.div`

`;