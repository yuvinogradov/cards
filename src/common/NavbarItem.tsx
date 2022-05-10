import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './styles/NavbarItem.module.css'

type NavbarItemPropsType = {
    to: string
    title: string
}

export function NavbarItem(props: NavbarItemPropsType) {
    return (
        <div className={style.item}>
            <NavLink to={props.to} activeClassName={style.activeLink}>
                {props.title}
            </NavLink>
        </div>
    )
}