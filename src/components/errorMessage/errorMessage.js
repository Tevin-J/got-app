import React from 'react'
import error from '../../assets/img/error.jpg'
import styled from "styled-components";
const IMG = styled.img`
    width: 100%;
`
const SPAN = styled.span`
    color: white;
    display: flex;
    justify-content: center;
`
const ErrorMessage = () => {
    return (
        <>
            <SPAN>Something is wrong</SPAN>
            <IMG src={error}/>
        </>
    )
}
export default ErrorMessage