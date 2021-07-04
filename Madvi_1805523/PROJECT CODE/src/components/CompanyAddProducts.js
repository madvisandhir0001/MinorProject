import React, { useState } from 'react'
import styled from 'styled-components'
import InputField from './InputField'
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button, CircularProgress, IconButton } from '@material-ui/core';
import AddProductImage from './AddProductImage';
import { auth, products, storage } from '../utils/firebase';
import Error from './Error';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase';

const CompanyAddProducts = ({ toggle, companyData, toggleFn, show }) => {
    const [user] = useAuthState(auth);
    const [productData, setProductData] = useState({
        name: "",
        image: "",
        description: "",
        price: "",
    })

    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [progress, setProgress] = useState(false);

    const handleClick = () => {
        if (
            productData.name.length > 0 &&
            productData.description.length > 0
        ) {
            const uploadTask = storage.ref(`users/${user.email}/company/products/${productData.name}/${'image'}`).put(file);
            uploadTask.on("state_changed", snapshot => {
                setProgress(true);
            }, (error) => {
                alert(error.message);
            }, () => {
                storage
                    .ref(`users/${user.email}/company/products/${productData.name}/${'image'}`)
                    .getDownloadURL()
                    .then(url => {
                        products.add({
                            name: productData.name,
                            description: productData.description,
                            price: productData.price,
                            companyName: companyData.title,
                            image: url,
                            email: user.email,
                            timestamp: firebase.firestore.FieldValue.serverTimestamp()
                        },
                            { merge: true }
                        ).then(() => {
                            setProgress(false);
                            setFile('');
                            setProductData({ name: "", image: "", description: "", price: "" });
                            toggleFn(1);
                        })
                    }).catch(err => console.log(err.message));
            })
        } else {
            setError("Missing Values")
        }
    }

    return (
        <Container>
            <div className="header" onClick={toggle}>
                <h2>Add Product</h2>
                <IconButton className="mui-icon">
                    {show === 2 ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
            </div>
            {show === 2 &&
                <FormContainer>
                    <Form>
                        <Left>
                            <AddProductImage file={file} setFile={setFile} setError={setError} />
                        </Left>
                        <Right>
                            <InputField Data={productData} setData={setProductData} value={productData.name} id={'name'} label="Name" icon={''} />
                            <InputField Data={productData} setData={setProductData} value={productData.description} id={'description'} label="Description" icon={''} />
                            <InputField Data={productData} setData={setProductData} value={productData.price} id={'price'} label="Price" icon={''} optional />
                        </Right>
                    </Form>
                    {error && <Error message={error} />}
                    <Button onClick={handleClick} startIcon={progress && <CircularProgress size={16} color="white" />} type="submit" variant='contained' color="primary"> Add </Button>
                </FormContainer>
            }
        </Container>
    )
}

export default CompanyAddProducts

const Container = styled.div`
    border: 1px solid lightgray;
    margin-bottom: 20px;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
    >.header{
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: lightgray;
        padding:0 10px;
        background: rgb(137,166,196);
        background: linear-gradient(90deg,rgba(137,166,196,1) 0% ,rgba(137,166,196,.5) 100% );
        cursor: pointer;
        :hover{
            opacity: 0.8;
        }
    }
    >.header>h2{
        text-transform: capitalize;
    }
`;
const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin:20px 0;
    >button{
        width: 150px;
    }
`;
const Form = styled.form`
    width:100%;
    display: flex;
    justify-content: space-between;
    overflow-y:scroll;
    overflow-x:hidden;
    position:relative;
    ::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;  
    scrollbar-width: none;
    ${() => window.innerWidth < 960 && `
        flex-direction:column;
    `}
`;
const Left = styled.div`
    flex:.5;
    display: flex;
    justify-content: center;
    align-items: center;
    padding:8px;
`;
const Right = styled.div`
    flex:.5;
    padding:8px;
    >.MuiFormControl-root{
        width:100%;
    }
    /* display: flex; */
`;