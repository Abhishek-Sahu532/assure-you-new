import React from 'react'
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth'
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { google } from '../actions/userAction';


const OAuth = () => {
    const dispatch = useDispatch()
    const handleSubmit = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider)

            const userData = JSON.stringify({
                name: result.user.displayName,
                email: result.user.email,
                avatar: result.user.photoURL
            })
            // console.log(userData)
            dispatch(google(userData))
        } catch (error) {
            return error
        }
    }

    return (
        <div>
            <button type='button' onClick={handleSubmit} className='googleBtn'>Continue with Google</button>
        </div>
    )
}

export default OAuth