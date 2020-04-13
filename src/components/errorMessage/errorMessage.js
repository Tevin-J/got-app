import React from 'react'
import error from '../../assets/img/error.jpg'
import errorMessage from './errorMessage.css'

const ErrorMessage = () => {
    return (
        <>
            <img src={error}/>
            <span>Something is wrong</span>
        </>
    )
}
export default ErrorMessage