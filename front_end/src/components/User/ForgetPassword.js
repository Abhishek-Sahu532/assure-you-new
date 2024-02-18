import React, { Fragment, useEffect, useState } from 'react'
import './ForgetPassword.css'
import Loader from '../Loader/Loader'
import { useDispatch, useSelector } from 'react-redux'
import {clearErrors, forgetPassword} from '../../actions/userAction'
import { useAlert } from 'react-alert'
import Metadata from '../Metadata'
import MailOutline from "@material-ui/icons/MailOutline"


const ForgetPassword = ()=>{
    const dispatch = useDispatch()
    const alert = useAlert();
    //RECEIVING FROM DATABASE
const {error, message, loading} = useSelector((state)=> state.forgetPassword);

const [email, setEmail] = useState('')
    
const forgetPasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set('email', email);
    dispatch(forgetPassword(myForm))
}


useEffect(() => {
    if (error) {
        alert.error(error);
        dispatch(clearErrors())  
    };
    if (message) { 
       alert.success(message);
    }
}, [dispatch, error, alert, message])


    return(
        <Fragment>
        {loading ? <Loader /> :

            <Fragment>
                <Metadata title='Forget Password' />
                <div className="forgetPasswordContainer">
                    <div className="forgetPasswordBox">
                        <h2 className='forgetPasswordHeading'>Forget Password</h2>
                        <form className='forgetPasswordForm' onSubmit={forgetPasswordSubmit} >
                            <div className="loginPassword">
                                <MailOutline />
                                <input type='email' placeholder='E-mail' required value={email} onChange={(e) => { setEmail(e.target.value) }} />
                            </div>
                            <input type="submit" value='Send' className='forgetPasswordBtn' />
                        </form>
                    </div></div>
            </Fragment>}
    </Fragment>
    )
}


export default ForgetPassword