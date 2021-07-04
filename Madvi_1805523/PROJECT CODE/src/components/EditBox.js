import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { Button, CircularProgress, IconButton, InputAdornment, TextField } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import { auth, users } from '../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import VerifyPhoneModal from './VerifyPhoneModal';

const EditBox = ({ userData, userId, id, type, name, title, value, immutable, setError, setSuccess, setPrimary }) => {

    const [user, loading, error2] = useAuthState(auth);
    const [disabled, setDisabled] = useState(true);
    const [progress, setProgress] = useState(false);
    const [progress2, setProgress2] = useState(false);
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');

    const handleChange = () => {
        if (input.length > 0) {
            setProgress(true);
            const handlePhoneVefier = id === "phoneNo" ? false : true
            users.doc(userId).set({ [id]: input, phoneNoVerified: handlePhoneVefier }, { merge: true }).then(() => {
                setSuccess(`${title} changed to ${input}`);
                setDisabled(true);
                setProgress(false);
            })
        } else {
            setError('Nothing to change...')
        }
    }

    useEffect(() => {
        userData.phoneNoVerified && setOpen(false);
    }, [userData.phoneNoVerified])

    useEffect(() => {
        if (auth.currentUser) {
            auth.currentUser.emailVerified && users.doc(user.email).set({ emailVerified: true }, { merge: true })
        }
    }, [auth])

    const handleCancel = () => {
        setInput('');
        setDisabled(true);
    }



    const verifyEmail = () => {
        user.sendEmailVerification();
        setSuccess(`Verification Link sent to ${userData.email}`);
        setTimeout(function () {
            setPrimary(`Click here when you done with verification`);
        }, 8000);
    }
    useEffect(() => {
        user?.emailVerified && users.doc(user.email).set({ emailVerified: true }, { merge: true })
            .then(() => setProgress2(false))
    }, [user])
    return (
        <Container>
            <h3>{title}</h3>
            <TextField
                // variant="Member"
                disabled={disabled}
                value={input.length === 0 ? value : input}
                onChange={e => setInput(e.target.value)}
                type={type}
                name={name}
                InputProps={{
                    endAdornment: (
                        (!immutable && id !== 'companyName') && <InputAdornment position="end">
                            {(value && !progress) ?
                                (disabled ?
                                    <IconButton onClick={() => setDisabled(false)} aria-label="toggle password visibility">
                                        <EditIcon className='mui-icon' />
                                    </IconButton>
                                    :

                                    <IconButton onClick={handleChange} aria-label="toggle password visibility">
                                        <DoneIcon style={{ color: 'green' }} />
                                    </IconButton>
                                )
                                :
                                <IconButton aria-label="toggle password visibility">
                                    < CircularProgress size={16} />
                                </IconButton>
                            }

                        </InputAdornment>
                    )
                }}
            />
            {!disabled && <CancelIcon onClick={handleCancel} />}
            {!userData.emailVerified && id === 'email' && <Verify onClick={verifyEmail} color={'primary'}>Verify</Verify>}
            {!userData.phoneNoVerified && id === 'phoneNo' && <Verify id='sign-in-button' onClick={() => setOpen(true)} color={'primary'}>Verify</Verify>}
            {progress2 && <CircularProgress />}
            {open && <VerifyPhoneModal open={open} setOpen={setOpen} userData={userData} />}
            {/* {error && <Error message={error} />}
            {success && <Success message={success} />} */}
        </Container>
    )
}

export default EditBox


// const Container = styled.div``;
const Container = styled.div`
    display: flex;
    /* align-items: center; */
    position: relative;
    background-color:rgba(232, 232, 235,1);
    border-radius:10px;
    padding:2px 10px;
    margin-bottom:10px;
    >h3{
        font-size:20px;
        font-weight:400;
        margin-right:15px;
        line-height:28px;
        flex:.3;
    }
    >.MuiFormControl-root{
        flex:.7;
    }
    >.Mui-disabled{
        color:black !important;
    }
    ${() => window.innerWidth < 960 && `
        flex-direction:column;
    `}
`;
const Verify = styled(Button)`
    position:absolute !important;
    right:-100px !important;
    cursor:pointer !important;
    >.MuiFormControl-root{
        text-transform: capitalize !important;
    }
`;
const CancelIcon = styled(ClearIcon)`
    color:red;
    font-size:30px !important;
    position:absolute;
    right:-27px;
    top:5px;
    cursor:pointer;
`;
