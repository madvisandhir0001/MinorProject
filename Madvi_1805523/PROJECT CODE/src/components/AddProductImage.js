
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectUserData } from '../features/appSlice';
let darkTheme;
const AddProductImage = ({ file, setFile, setError }) => {
    const [fileData, setFileData] = useState(null);

    const userData = useSelector(selectUserData);
    darkTheme = userData?.darkTheme;
    const handleFile = e => {
        setError(null);
        const file = e.target.files[0];
        if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png') {
            setFile(file);
            var reader = new FileReader();
            reader.onload = (e) => {
                setFileData(e.target.result);
            }
            reader.readAsDataURL(file);
        } else {
            setError("Only Image Allowed")
        }
    }

    return (
        <Container>
            {fileData ?
                <ProductImage src={fileData} />
                : <h6>Image Preview</h6>}
            <div className="input-group mb-3">
                <div className="custom-file">
                    <input style={{ width: '15px !important', overflow: "hidden" }} onChange={handleFile} type="file" className="custom-file-input" id="inputGroupFile02" />
                    <label className="custom-file-label" htmlFor="inputGroupFile02" aria-describedby="inputGroupFileAddon02">{!file ? 'Choose Product Image' : file.name}</label>
                </div>
            </div>
        </Container>
    )
}

export default AddProductImage

const Container = styled.div`
    display: flex;  
    flex-direction:column;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    width: 100%;
    >*{
        margin-bottom: 10px;
    }
    >h6{
        padding:20px 10px;
        border:1px solid lightgrey;
    }
    ${() => darkTheme && `
    >h6{
        color:rgb(171, 191, 213); !important;
    }

    
    ` }
`;

const ProductImage = styled.img`
    width:100% !important;
    height:160px !important;
    object-fit: contain;
`;