import { CircularProgress } from '@material-ui/core';
import React from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectCompanies } from '../features/appSlice';
import CompanyCard from './CompanyCard';

const Companies = () => {
    const companies = useSelector(selectCompanies);

    return (
        <Container>
            {companies ?
                companies.map(company =>
                    <CompanyCard company={company} />
                )
                :
                <CircularProgress />
            }
        </Container>
    )
}

export default Companies

const Container = styled.div`
    background: lightgray ;
    min-height: 800px;
`;