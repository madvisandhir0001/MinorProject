import { IconButton } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'

const SocialLink = ({ icon, link, name }) => {
    return (
        <Container>
            <Icon className="mui-icon" onClick={() => window.open(link, '_blank')}>
                {icon}
            </Icon>
            {name && <p>{name}</p>}
        </Container>
    )
}

export default SocialLink

const Container = styled.div`
    display: flex;
    align-items: center;
    >p{
        font-size: 20px;
        margin-top:10px;
    }
`;

const Icon = styled(IconButton)`
    color:#fff !important;
    font-size:50px !important;
`;