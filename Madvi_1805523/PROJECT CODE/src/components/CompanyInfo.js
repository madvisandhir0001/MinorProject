import { Button, CircularProgress, IconButton } from '@material-ui/core'
import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import styled from 'styled-components'
import { auth, companies } from '../utils/firebase'
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useHistory } from 'react-router'
import { selectUserData, setCompanyData } from '../features/appSlice'
import { useDispatch, useSelector } from 'react-redux'
import AddCompanyImage from './AddCompanyImage'
let darkTheme;
const CompanyInfo = ({ companyData, show, toggle }) => {
    const [user] = useAuthState(auth);
    const [progress, setProgress] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch()

    const userData = useSelector(selectUserData);
    darkTheme = userData?.darkTheme;

    const removeCompany = () => {
        setProgress(true)
        companies.where('userEmail', '==', user.email)
            .get().then((res) => {
                res.docs.map(doc => {
                    if (doc.exists) {
                        companies.doc(doc.id).delete().then(() => {
                            dispatch(setCompanyData(null));
                            history.replace('/')
                        })
                    }
                })
            })
    }

    return (
        <Container>
            <div className="header" onClick={toggle}>
                <h2>Company Info</h2>
                <IconButton className="mui-icon">
                    {show === 0 ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
            </div>
            {show === 0 &&
                <>
                    <AddCompanyImage profilePic={companyData?.profilePic} companyData={companyData} />
                    <Info>
                        <div><h3>title:</h3> <p>{companyData.title}</p></div>
                        <div><h3>website:</h3> <p>{companyData.website}</p></div>
                        <div><h3>address:</h3> <p>{companyData.address}</p></div>
                        <div><h3>city:</h3> <p>{companyData.city}</p></div>
                        <div><h3>state:</h3> <p>{companyData.state}</p></div>
                        <div><h3>pincode:</h3> <p>{companyData.pincode}</p></div>
                        <div><h3>email:</h3> <p>{companyData.email}</p></div>
                        <div><h3>Category:</h3> <p>{companyData?.category}</p></div>
                        <div><h3>phoneNo:</h3> <p>{companyData.phoneNo}</p></div>
                    </Info>
                    {/* <RemoveCompany onClick={removeCompany} >{!progress ? 'Remove Company' : <CircularProgress size={16} />}</RemoveCompany> */}
                </>
            }
        </Container>
    )
}

export default CompanyInfo

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
const Info = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content:space-between; 
    padding:10px;
    >div{
        display: flex;
        align-items: center;
        width: 30%;
    }
    >div>p{
        margin:0 !important;
        padding:0 !important;
        text-transform: capitalize;
        font-size: 20px;
    }
    >div>h3{
        margin:0 !important;
        padding:0 !important;
        text-transform: capitalize;
        font-weight: 500;
        font-size:20px;
    }
    ${() => darkTheme && `
        
            color:rgb(171, 191, 213); 
        
    ` }
    ${() => window.innerWidth < 960 && `
        flex-direction:column;
        >div{
            width: 98%;
        }
    `}
`;
const RemoveCompany = styled(Button)`
    background-color:#B33A3A !important;
    color:white !important;
    margin: 20px !important;
`;