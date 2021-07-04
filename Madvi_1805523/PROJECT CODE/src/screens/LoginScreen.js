import { Button, CircularProgress, IconButton, InputAdornment, TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { auth } from "../utils/firebase";
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useHistory } from "react-router";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error2, setError2] = useState(null);
    const [error3, setError3] = useState(null);
    const [success, setSuccess] = useState(null);
    const [progress, setProgress] = useState(false);
    const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth, email, password);
    const [authUser, authLoading, authError] = useAuthState(auth);

    const history = useHistory();

    useEffect(() => {
        authUser && history.replace('/');
    }, [authUser]);


    const handleClick = e => {
        e.preventDefault();
        setError2(null);
        setError3(null)
        if (password.length > 0 && email.length > 0) {
            setProgress(true);
            signInWithEmailAndPassword(email, password);
        } else {
            !password && setError2({ type: '5', message: 'Password Required' })
            !email && setError2({ type: '2', message: 'Email Required' })
        }

    }

    const handleForgetPassword = () => {
        setError3(null)
        if (email.length > 0) {
            auth.sendPasswordResetEmail(email).then(function () {
                setSuccess(`Password Reset Link Sent to ${email}`);
            }).catch(function (error) {
                setError3(error.message)
            })
        } else {
            setError3("Type email to reset password")

        }
    }
    useEffect(() => {
        if (error) {
            error.code === 'auth/user-not-found' && setError3("No user Found");
            error.code === 'auth/wrong-password' && setError3("Incorrect Password");
        }
    }, [error])

    return (
        <Container>
            <LoginContainer>
                <h1>Sign In</h1>
                <Form>
                    {(error && !error3) && <Error>{error.message}</Error>}
                    {error3 && <Error>{error3}</Error>}
                    <InputField id="outlined-search"
                        variant="outlined"
                        value={email}
                        type="Email"
                        name="email"
                        label="Email"
                        error={error2?.type == 2 && true}
                        helperText={error2?.type == 2 && error2?.message}
                        onChange={e => setEmail(e.target.value)}
                        autoFocus
                    />
                    <InputField
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        label="Password" variant="outlined"
                        error={(error2?.type == 5 || error2?.type == 7) && true}
                        helperText={(error2?.type == 5 || error2?.type == 7) && error2?.message}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton aria-label="toggle password visibility" onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                    <ForgetPassword onClick={handleForgetPassword} >Forget password?</ForgetPassword>
                                </InputAdornment>
                            )
                        }}
                    />
                    {success && <Success>{success}</Success>}
                    <Button
                        style={{ width: 'fit-content', alignSelf: 'center', marginTop: "15px" }}
                        onClick={handleClick}
                        type="submit"
                        variant='contained'
                        startIcon={((progress || loading) && !error) && <CircularProgress size={16} color="white" />}
                        color='primary'>
                        Sign In
                    </Button>
                    <SignUp>
                        <p>New User? </p>
                        <h6 onClick={() => history.push('/user/register')}>Sign Up</h6>
                    </SignUp>
                </Form>
            </LoginContainer>
        </Container>
    )
}

export default LoginScreen

const Success = styled.p`
    color:green;
    font-size:16px;
    
    `;
const ForgetPassword = styled.p`
    position:absolute;
    color:blue;
    bottom:-36px;
    right:0;
    cursor:pointer;
    font-size:12px;
`;
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
    height:100vh;
    width:100vw;
    display:grid;
    place-items:center;
    background-color:whitesmoke;
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
    /* align-self:left; */
`;