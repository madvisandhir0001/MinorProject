import React from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import styled from 'styled-components'
import { selectUserData } from '../features/appSlice';
let darkTheme;
const Categories = () => {
    const history = useHistory();
    const handleClick = (e) => {
        const id = e.target.outerText
        history.push(`/categories/${id}`)
    }

    const userData = useSelector(selectUserData);
    darkTheme = userData?.darkTheme;


    return (
        <Container style={{ backgroundColor: userData?.darkTheme && '#fbfdff' }}>
            <h1>Categories</h1>
            <InnerContainer>
                <h3 onClick={handleClick}>Steel & Iron Industries</h3>
                <h3 onClick={handleClick}>Automobile Industries</h3>
                <h3 onClick={handleClick}>Cycle parts Industries</h3>
                <h3 onClick={handleClick}>Food & Beverages Industries</h3>
                <h3 onClick={handleClick}>Plastic Industries</h3>
            </InnerContainer>
        </Container>
    )
}

export default Categories

const Container = styled.div`
    margin:10px;
    background-color:white;
    border-radius:10px;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
   
    min-height:40vh;
    max-height:45vh;
    >h1{
        color:#383B51;
        font-size: 25px;
        border-top-right-radius:10px;
        border-top-left-radius:10px;
        font-size: 25px;
        background: rgb(137,166,196);
        background: linear-gradient(0deg, rgba(137,166,196,0) 0%, rgba(137,166,196,1) 100%);
        padding:5px 10px;
    }
    ${() => darkTheme && `
        background-color: rgba(50, 50,50, .5) !important;
        >h1{
            color:green; 
            background: rgb(137,166,196);
            background: linear-gradient(0deg, rgba(137,166,196,0) 0%, rgba(14, 19, 65, .5) 100%);
        }
    ` }

`;

const InnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    cursor: pointer;
    margin: 15px 10px;
    padding:5px;
    > h3{
        margin-left: 10px;
        font-weight: 400;
        font-size: 22px;
        transition: all .25s ease-in-out;
        :hover{
            transform: scale(1.01);
        }
    }
    ${() => darkTheme && `
        >h3{
            color:rgb(171, 191, 213); 
        }
    ` }
`;