import React, { Fragment, useEffect } from 'react'
import Metadata from "../Metadata.js";
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loader from '../Loader/Loader'
import { useNavigate } from 'react-router-dom'
import './Profile.css'




const Profile = () => {

    const { loading, isAuthenticated, user } = useSelector((state) => state.user);
    const navigate = useNavigate()
    // console.log('user from profile', user, isAuthenticated   )
    useEffect(() => {

        if (isAuthenticated === false) {
            navigate('/login')
        }

    }, [navigate, isAuthenticated])
    return (
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <Metadata title={`${user.name}`} />
                    <div className="profileContainer">
                        <div>
                            <h1>My Profile</h1>
                            {/* <img  src={user.avatar.url ? user.avatar.url : './Profile.png'} alt={user.name} /> */}
                            <img src='/Profile.png' alt={user.name} />
                            <Link to='/me/update'>Edit Profile</Link>
                        </div>
                        <div>
                            <div>
                                <h4>Full Name</h4>
                                <p>{user.name}</p>
                            </div>
                            <div>
                                <h4>Email</h4>
                                <p>{user.email}</p>
                            </div>
                            <div>
                                <h4>Joined On</h4>
                                <p>{String(user.createdAt).substr(0, 10)}</p>
                            </div>
                            <div>
                                <Link to='/orders'> My Orders</Link>
                                <Link to='/password/update'>Change Password</Link>
                            </div>

                        </div>
                    </div>

                </Fragment>}

        </Fragment>
    )
}




export default Profile;
