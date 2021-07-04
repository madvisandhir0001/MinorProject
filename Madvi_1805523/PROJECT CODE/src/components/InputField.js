import React from 'react'
import { IconButton, InputAdornment, TextField } from '@material-ui/core'
import styled from 'styled-components'
import { selectUserData } from '../features/appSlice';
import { useSelector } from 'react-redux';
let darkTheme;
const InputField = ({ label, value, id, icon, Data, setData, error, helperText, optional, color, selectType }) => {

    const userData = useSelector(selectUserData);
    darkTheme = userData?.darkTheme;
    return (
        !selectType ?
            <Input
                type='text'
                label={label}
                variant="outlined"
                error={error}
                helperText={helperText}
                required={!optional}
                value={value}
                // color='secondary'
                onChange={e => setData({ ...Data, [id]: e.target.value })}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            {/* <IconButton */}
                            {/* aria-label="toggle password visibility"> */}
                            {icon}
                            {/* </IconButton> */}
                        </InputAdornment>
                    )
                }}
            />
            :
            <Input
                type='text'
                select
                label={label}
                error={error}
                value={value}
                helperText={helperText}
                required={!optional}
                onChange={e => setData({ ...Data, [id]: e.target.value })}
                variant="outlined"
                // defaultValue={Sele}
                className="select-input"
            >
                <option className="select-input-option" key={"Steel & Iron Industries"} value={"Steel & Iron Industries"}>Steel & Iron Industries</option>
                <option className="select-input-option" key={"Automobile Industries"} value={"Automobile Industries"}>Automobile Industries</option>
                <option className="select-input-option" key={"Cycle parts Industries"} value={"Cycle parts Industries"}>Cycle parts Industries</option>
                <option className="select-input-option" key={"Food & Beverages Industries"} value={"Food & Beverages Industries"}>Food & Beverages Industries</option>
                <option className="select-input-option" key={"Plastic Industries"} value={"Plastic Industries"}>Plastic Industries</option>
                <option className="select-input-option" key={"Other"} value={"Other"}>Other</option>
            </Input>
    )
}

export default InputField

const Input = styled(TextField)`
    margin-bottom: 20px !important;
    ${() => darkTheme && `
    >.MuiInputBase-root >input{
        color:rgb(171, 191, 213); !important;
    }

    >.MuiFormLabel-root {
        color:rgb(171, 191, 213); !important;
    }  
    ` }
`;