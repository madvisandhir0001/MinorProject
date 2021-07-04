import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Route, useHistory, useLocation } from 'react-router'
import styled from 'styled-components'
import Companies from '../components/Companies'
import Messages from '../components/Messages'
import Products from '../components/Products'
import Users from '../components/Users'
import { selectUserData } from '../features/appSlice'

const AdminBlock = () => {
    const history = useHistory();
    const location = useLocation();
    const pathName = location.pathname;

    const userData = useSelector(selectUserData);
    useEffect(() => {
        pathName === '/admin' && history.replace(`/admin/users`)
    }, [])

    useEffect(() => {
        if (userData) {
            if (userData.role !== 'admin') {
                history.replace(`/`)
            }
        }
    }, [userData])

    return (
        <Container>
            <Nav>
                <h3
                    className={pathName === '/admin/users' ? "admin-nav-active" : "admin-nav-inactive"}
                    onClick={() => history.push('/admin/users')}
                >
                    Users
                 </h3>
                <h3
                    className={pathName === '/admin/companies' ? "admin-nav-active" : "admin-nav-inactive"}
                    onClick={() => history.push('/admin/companies')}>Companies
                </h3>
                <h3
                    className={pathName === '/admin/products' ? "admin-nav-active" : "admin-nav-inactive"}
                    onClick={() => history.push('/admin/products')}>Products
                </h3>
                <h3
                    className={pathName === '/admin/messages' ? "admin-nav-active" : "admin-nav-inactive"}
                    onClick={() => history.push('/admin/messages')}>Messages
                </h3>
            </Nav>

            <Route path="/admin/users"><Users /></Route>
            <Route path="/admin/companies"><Companies /></Route>
            <Route path="/admin/products"><Products /></Route>
            <Route path="/admin/messages"><Messages /></Route>
        </Container>
    )
}

export default AdminBlock

const Container = styled.div`
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
    height:95vh;
    overflow-y:scroll ;
    `;

const Nav = styled.div`
    display: flex;
    background-color:snow;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
    >h3{
        font-size:20px;
        padding:10px 10px;
        font-weight:400;
        cursor: pointer;
        margin:0;
        :hover{
            color:gray;
        }
    }

`;