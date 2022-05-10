import React from 'react';
import style from './styles/Navbar.module.css'
import {NavbarItem} from './NavbarItem';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../redux/store';
import {logOutTC} from '../redux/auth-reducer';
import { NavLink } from 'react-router-dom';
import logo from './images/site_logo.png'

export function Navbar() {

    const dispatch = useDispatch()
    const isLoggedIn = useSelector((state: RootStateType) => state.auth.isLoggedIn)
    const logout = () => dispatch(logOutTC())

    return (
        <nav className={style.navbar}>
            <NavLink to='/packs'>
                <img src={logo} className={style.logo} alt="logo"/>
            </NavLink>
            <div className={style.menu}>
                {!isLoggedIn && <NavbarItem to='/registration2' title='Registration'/>}
                {isLoggedIn && <>
                    <NavbarItem to='/packs' title='Packs'/>
                    <NavbarItem to='/profile' title='Profile'/>
                    <NavbarItem to='/set-new-password' title='Password'/>
                    <NavbarItem to='/recover' title='Recover'/>
                </>}
                {isLoggedIn
                    ? <button className={style.logoutButton} onClick={logout}>Logout</button>
                    : <div className={style.loginButton}><NavbarItem to='/login' title='Login'/></div>
                }
            </div>
        </nav>
    )
}