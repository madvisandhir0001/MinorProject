import { Button, CircularProgress, IconButton, InputAdornment } from "@material-ui/core";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { auth, users } from "../utils/firebase";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useHistory } from "react-router";
import TextField from '@material-ui/core/TextField';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

function RegisterScreen() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [error2, setError2] = useState(null);
    const [progress, setProgress] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
    const [authUser] = useAuthState(auth);

    const history = useHistory();

    useEffect(() => {
        authUser && history.replace('/');
    }, [authUser]);

    useEffect(() => {
        if (authUser) {
            const ref = email && users.doc(email)
            ref && ref.get().then(res => {
                if (!res.exists) {
                    setProgress(true);
                    ref.set({ name, email, phoneNo, companyName, emailVerified: false, phoneNoVerified: false, role: 'users' }).then(() => history.replace('/')).then(() => setProgress(true))
                }
            })
        }
    }, [authUser]);

    const handleClick = e => {
        e.preventDefault();
        setError2(null);
        if (name.length >= 3 && email.length > 0 && phoneNo.length === 10 && password.length >= 6 && confirmPassword.length >= 0) {
            if (confirmPassword === password) {
                createUserWithEmailAndPassword(email, password)
            } else {
                setError2({ type: 7, message: 'Password not Match' })
            }
        } else {
            password.length < 6 && setError2({ type: 5, message: 'Password must at least 6 characters' })
            phoneNo.length !== 10 && setError2({ type: 3, message: 'Phone Number must 10 characters' })
            name.length < 3 && setError2({ type: 1, message: 'Name must be at least 3 characters' })
            !confirmPassword && setError2({ type: 6, message: 'Confirm Password Required' })
            !password && setError2({ type: 5, message: 'Password Required' })
            !phoneNo && setError2({ type: 3, message: 'Phone No. Required' })
            !email && setError2({ type: 2, message: 'Email Required' })
            !name && setError2({ type: 1, message: 'Name Required' })
        }

    }
    return (
        <Container>
            <LoginContainer>
                <h1>Sign Up</h1>
                <Form>
                    {error && <Error>{error.message}</Error>}
                    <InputField
                        id="outlined-search"
                        variant="outlined"
                        value={name}
                        autoFocus
                        type="text"
                        name="name"
                        error={(error2?.type === 1 && true)}
                        helperText={error2?.type === 1 && error2?.message}
                        onChange={e => setName(e.target.value)}
                        label="Name"
                    />
                    <InputField
                        id="outlined-search"
                        variant="outlined"
                        value={email}
                        type="Email"
                        name="email"
                        label="Email"
                        error={error2?.type === 2 && true}
                        helperText={error2?.type === 2 && error2?.message}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <InputField
                        InputProps={{ startAdornment: <InputAdornment position="start">+91</InputAdornment>, }}
                        value={phoneNo}
                        variant="outlined"
                        type="number"
                        name="phone"
                        error={error2?.type === 3 && true}
                        helperText={error2?.type === 3 && error2?.message}
                        onChange={e => setPhoneNo(e.target.value)}
                        label="Phone Number"
                    />
                    <InputField
                        id="outlined-search"
                        variant="outlined"
                        value={companyName}
                        type="text"
                        onChange={e => setCompanyName(e.target.value)}
                        label="Company Name"
                    />
                    <InputField
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        label="Password" variant="outlined"
                        error={(error2?.type === 5 || error2?.type === 7) && true}
                        helperText={(error2?.type === 5 || error2?.type === 7) && error2?.message}
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
                    <InputField
                        value={confirmPassword}
                        type={showPassword ? "text" : "password"}
                        id="outlined-password-input"
                        variant='outlined'
                        onChange={e => setConfirmPassword(e.target.value)}
                        error={(error2?.type === 6 || error2?.type === 7) && true}
                        helperText={(error2?.type === 6 || error2?.type === 7) && error2?.message}
                        label="Confirm Password"
                        autoComplete="current-password"
                    />
                    <Button
                        style={{ width: 'fit-content', alignSelf: 'center' }}
                        onClick={handleClick}
                        type="submit"
                        variant='contained'
                        startIcon={(progress || loading) && <CircularProgress size={16} color="white" />}
                        color='primary'
                    >
                        SIGN UP
                    </Button>

                    <SignUp>
                        <p>Have Account ? </p>
                        <h6 onClick={() => history.push('/user/login')}>Sign In</h6>
                    </SignUp>
                </Form>
            </LoginContainer>
        </Container>
    )
}

export default RegisterScreen

const SignUp = styled.div`
    display: flex;
    justify-content: center;
    margin-top:20px;
    >h6{
        margin-left: 8px;
        color:blue;
        line-height:25px;
        cursor: pointer;
    }
`;
const Container = styled.div`
    min-height:100vh;
    height:100%;
    width:100vw;
    display:grid;
    place-items:center;
    background-color:whitesmoke;
    overflow-y:scroll;
`;

const LoginContainer = styled.div`
    display:flex;
    flex-direction:column;
    padding: 40px;
    border: 1px solid lightgrey;
    border-radius: 10px;
    width:90%;
    max-width:400px;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
    background-color:white;
    min-height:25vh;
    padding-bottom:100px;
    margin:40px;
    >h1{
        margin-bottom:20px;
    }
    ${() => window.innerWidth < 600 ? `height:fit-content;` : `min-height:25vh;`}
`;

const Form = styled.form`
    display:flex;
    flex-direction:column;
`;

const InputField = styled(TextField)`
    margin-bottom: 20px !important;
`;
const Error = styled.p`
    color:red;
    font-size:16px;
`;