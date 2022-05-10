import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../../redux/store';
import {Redirect} from 'react-router-dom';
import style from '../styles/Profile.module.css'
import appStyle from '../../common/styles/Common.module.css'
import defaultAvatar from '../../common/images/default_avatar.png';
import {AuthProfileType, logOutTC} from '../../redux/auth-reducer';

function Profile() {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector((state: RootStateType): boolean => state.auth.isLoggedIn)
    const profileData = useSelector((state: RootStateType): AuthProfileType | null => state.auth.profile)

    const logoutHandler = () => dispatch(logOutTC())

    return (
        <div>
            <h1 className={`${appStyle.defaultTitle} ${style.title}`}>
                Profile
            </h1>
            {
                isLoggedIn && profileData
                    ? <div className={style.profileData}>
                        {profileData.avatar ?
                            <div>
                                <img className={style.avatar}
                                     src={profileData.avatar}
                                     alt=""
                                     width="100"
                                     height=""/>
                            </div>
                            : <img src={defaultAvatar} alt="" width="100" height="100"/>
                        }
                        <div className={appStyle.infoWrapper}>
                            <div className={style.info}>
                                <div className={style.name}>Name: {profileData.name}</div>
                                <div className={style.email}>Email: {profileData.email}</div>
                                <div className={style.packsCount}>Public card packs
                                    count: {profileData.publicCardPacksCount}</div>
                            </div>
                        </div>

                        <button className={appStyle.defaultButton} onClick={logoutHandler}>Log out</button>
                    </div>
                    : <Redirect to={'/login'}/>
            }
        </div>
    )
}

export default Profile;
