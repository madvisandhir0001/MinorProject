import React from 'react'
import styled from 'styled-components'

const AlertBox = ({ type, message, messageStrong, action }) => {
    return (
        <Container>
            <div className={`alert alert-${type}`}>
                <div onClick={action}>
                    {messageStrong && <strong>{messageStrong}</strong>}
                    {" "}
                    {message && message}
                </div>
                <Close type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </Close>
            </div>
        </Container>
    )
}

export default AlertBox

const Container = styled.div`
    position:relative;
    >div{
        padding:0 !important;
        margin:0 !important;
        display: flex;
    }
    >div>div{
        padding: 0 10px;
        flex:1;
        cursor: pointer;
        :hover {
            opacity:0.8;
        }
    }
    
`;
const Close = styled.button`
    background: none;
    outline: none;
    border: none;
    right:10px;
    font-size:28px;
`;