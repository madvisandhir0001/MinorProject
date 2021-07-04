import { Button, CircularProgress, Input, TextareaAutosize } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Rating from '@material-ui/lab/Rating';
import { companies } from '../utils/firebase';
import firebase from 'firebase'
import { useSelector } from 'react-redux';
import { selectUserData } from '../features/appSlice';
import Error from './Error';
let darkTheme;
const ReviewCompany = ({ companyData, reviews, setReviews }) => {
    const user = useSelector(selectUserData);
    const [id, setId] = useState(null);
    const [error, setError] = useState(null)

    const userData = useSelector(selectUserData);
    darkTheme = userData?.darkTheme;
    const [data, setData] = useState({
        name: '',
        review: '',
        rating: 3,
    })
    const [progress, setProgress] = useState(false);

    useEffect(() => {
        if (companyData) {
            if (companyData.email) {
                companies.where('userEmail', '==', companyData.userEmail).get().then(res => {
                    res.docs.map(doc => {
                        if (doc.exists) {
                            setId(doc.id);
                        }
                    })
                })
            }
        }
    }, [companyData])

    useEffect(() => {
        user && setData({ ...data, name: user.name })
    }, [user])

    useEffect(() => {
        if (id) {
            companies.doc(id).collection('reviews').orderBy('timestamp', 'desc').onSnapshot(snapshot =>
                setReviews(snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() }))))
        }
    }, [id])

    const postReview = (e) => {

        e.preventDefault();
        setError(null);
        if (
            data.name.length > 0 &&
            data.review.length > 0
        ) {
            companies.doc(id).collection('reviews').add({ ...data, timestamp: firebase.firestore.FieldValue.serverTimestamp() }).then(() => setProgress(false)).then(() => {
                setData({
                    name: '',
                    review: '',
                    rating: 3,
                })
            })
        } else {
            setError('Missing Data Field')
        }

    }

    return (
        <Container>

            <Reviews>
                {reviews && reviews.map(({ id, data }) =>
                    <Review>
                        <div>
                            <h3>{data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h3>
                            <Rating name="read-only" value={data.rating} readOnly />
                        </div>
                        <p>{data.review}</p>
                    </Review>
                )}
            </Reviews>

            <form>
                <h4>Post a review</h4>
                <Input value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} placeholder=" Name" />
                <br />
                <Box>
                    <p>Rate Company</p>
                    <Rating
                        name="simple-controlled"
                        value={data.rating}
                        onChange={(e, newValue) => {
                            setData({ ...data, rating: newValue });
                        }}
                    />
                </Box>
                <TextareaAutosize
                    value={data.review}
                    onChange={(e) => setData({ ...data, review: e.target.value })}
                    rowsMax={12}
                    rowsMin={4}
                    placeholder="Write Review"
                />
                <br />
                {error && <Error message={error} />}
                <Button onClick={postReview} type="submit" variant="contained" disabled={progress} startIcon={progress && <CircularProgress size={16} />} color="primary">Post</Button>
            </form>
        </Container>
    )
}

export default ReviewCompany

const Reviews = styled.div`
    max-width: 800px;
    width: 100%;
    margin:auto;
    padding:10px;
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    border-bottom: 3px solid lightgray;
    `;
const Review = styled.div`
    border-bottom: 1px solid lightgray;
    width: 100%;
    >div{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    ${() => darkTheme && `
        color:  rgb(171, 191, 213); !important;
    ` }
`;
const Container = styled.div`
    form{
        display: flex;
        flex-direction:column;
        justify-content: center;
        align-items: center;
        >*{
        max-width: 500px;
        width: 98%;
        margin:auto;
        padding:10px;
    }
    >textarea{
        padding:5px;
        }
    }
    ${() => darkTheme && `
        color: #BCB9B7;
        >form>.MuiInputBase-root>input{
            color:  rgb(171, 191, 213); !important;
        }
        >form>.MuiInputBase-root>input:placeholder{
            color:  rgb(171, 191, 213); !important;
        }
    ` }
`;

const Box = styled.div`
    display: flex;
    >p{
        margin-right: 20px;
    }

`;