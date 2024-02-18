import React, { Fragment, useEffect, useState } from 'react'
import './ResetPassword.css'
import Loader from '../Loader/Loader'
import { useDispatch, useSelector } from 'react-redux'
import {clearErrors, resetPassword } from '../../actions/userAction'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import Metadata from '../Metadata'
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { useParams } from "react-router-dom";



const ResetPassword = () => {
    const { token } = useParams();
    const dispatch = useDispatch()
    const alert = useAlert();
    const navigate = useNavigate()

    const { error, success, loading } = useSelector((state) => state.forgetPassword);

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")



    const resetPasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set('password', password);
        myForm.set('confirmPassword', confirmPassword);
        dispatch(resetPassword(token,myForm))
    }


    useEffect(() => {
            if (error) {
            alert.error(error);
            dispatch(clearErrors())  
        };
        if (success) {
            alert.success('Password Change Successfully');
            navigate('/login')
        }
    }, [dispatch, error, alert, navigate, success])



    return (
        <Fragment>
            {loading ? <Loader /> :

                <Fragment>
                    <Metadata title='Change Password' />
                    <div className="resetPasswordContainer">
                        <div className="resetPasswordBox">
                            <h2 className='resetPasswordHeading'>Update Profile</h2>
                            <form className='resetPasswordForm'
                                onSubmit={resetPasswordSubmit} >

                                <div >
                                    <VpnKeyIcon />
                                    <input type='password' placeholder='Password' required value={password} onChange={(e) => { setPassword(e.target.value) }} />
                                </div>

                                <div >
                                    <VpnKeyIcon />
                                    <input type='password' placeholder='Confirm Password' required value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} />
                                </div>

                                <input type="submit" value='Update Password' className='resetPasswordBtn' />
                            </form>
                        </div></div>
                </Fragment>}
        </Fragment>)
}


export default ResetPassword