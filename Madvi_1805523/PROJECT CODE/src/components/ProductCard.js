import React, { useState } from 'react'
import styled from 'styled-components'
import EuroIcon from '@material-ui/icons/Euro';
import { Button, CircularProgress } from '@material-ui/core';
import { auth, products } from '../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { selectUserData } from '../features/appSlice';
import { useSelector } from 'react-redux';
let darkTheme;
const ProductCard = ({ id, data }) => {
    const [progress, setProgress] = useState(true);
    const [user] = useAuthState(auth);
    const deleteProduct = () => {
        products.doc(id).delete();
        // window.location.reload();
    }

    const userData = useSelector(selectUserData);
    darkTheme = userData?.darkTheme;
    return (
        <Container>
            <Info>
                {progress && <CircularProgress />}
                <img onLoad={() => setProgress(false)} src={data.image} alt={data.name} />
                <h2>{data.name}</h2>
                {data.price && <h3><EuroIcon />{data.price}</h3>}
                <p>{data.description}</p>
            </Info>
            <Actions>
                {/* <Button variant="contained" color="Primary">Add Image</Button> */}
                {/* <Button variant="contained" color="primary" disabled>Change Name</Button>
                <Button variant="contained" color="primary" disabled>Change Price</Button>
                <Button variant="contained" color="primary" disabled>Change Description</Button> */}
                <Button variant="contained" color="secondary" onClick={deleteProduct}>Delete Product</Button>
            </Actions>
        </Container>
    )
}

export default ProductCard

const Container = styled.div`
    /* width: 400px; */
    
    border: 1px solid lightgray;
    padding:8px;
    width: 100%;
`;
const Info = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    >img{
        width:100% !important;
        height:160px !important;
        object-fit: contain;
    }
    >h2{}
    >h3{
        font-weight: 400;
        font-size:20px;
        display: flex;
        align-items: center;
    }
    >p{
        text-align: justify;
    }
    ${() => darkTheme && `
        
            color:rgb(171, 191, 213); 
        
    ` }
`;

const Actions = styled.div`
    display: flex;
    justify-content: space-around;
`;