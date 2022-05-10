import React from 'react';
import {NavLink} from "react-router-dom";
import style from '../styles/Page404.module.css'

function Page404() {
    return (
        <div className={style.page404}>
            <h1>Page not found</h1>
            <NavLink to={'/'}><span>Back to homepage</span></NavLink>
        </div>
    );
}

export default Page404;

