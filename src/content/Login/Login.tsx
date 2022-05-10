import React, {FormEvent} from 'react';
import style from '../styles/Login.module.css'
import appStyle from '../../common/styles/Common.module.css'
import SuperInputText from '../../common/SuperInputText/SuperInputText';
import SuperCheckbox from '../../common/SuperCheckbox/SuperCheckbox';
import SuperButton from '../../common/SuperButton/SuperButton';
import {NavLink} from 'react-router-dom';
import {LoginFormStateType} from './LoginContainer';
import {ValidatorFieldType} from '../../common/inputValidator';
import {DEFAULT_EMAIL, DEFAULT_PASSWORD, DEV_MODE} from "../../App";

type LoginPropsType = {
    formState: LoginFormStateType
    onChangeHandler(field: ValidatorFieldType): (value: string) => void
    onBlurHandler(field: ValidatorFieldType): (e: React.FocusEvent<HTMLInputElement>) => void
    checkBoxHandler(rememberMe: boolean): void
    onSubmitHandler(email: string, password: string, rememberMe: boolean): void
}

function Login({formState, onChangeHandler, onBlurHandler, checkBoxHandler, onSubmitHandler}: LoginPropsType) {
    const email = formState.email
    const password = formState.password
    const rememberMe = formState.rememberMe

    const submitForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        onSubmitHandler(email.value, password.value, rememberMe)
    }

    const disableSubmit = !!(email.error || password.error || formState.globalFormError)

    return (
        <div className={style.pageContainer}>
            <h1 className={appStyle.defaultTitle}>Sign in</h1>
            <div className={appStyle.infoWrapper}>
                <form className={style.form} onSubmit={submitForm}>
                    <SuperInputText
                        value={email.value}
                        error={email.error}
                        onChangeText={onChangeHandler('email')}
                        onBlur={onBlurHandler('email')}
                        placeholder={'Email'}
                        type={'text'}
                    />
                    <SuperInputText
                        value={password.value}
                        error={password.error}
                        onChangeText={onChangeHandler('password')}
                        onBlur={onBlurHandler('password')}
                        placeholder={'Password'}
                        type={'password'}
                    />
                    <NavLink to={'/recover'}><span>Forgot password?</span></NavLink>
                    <div className={style.rememberMe}>
                        <SuperCheckbox onChangeChecked={checkBoxHandler} checked={rememberMe}/>
                        <span>Remember me</span>
                    </div>
                    <SuperButton className={appStyle.defaultButton}
                                 disabled={disableSubmit}
                                 type={'submit'}
                    >Sign in</SuperButton>
                </form>
            </div>
            {DEV_MODE ?
                <div className={style.messageDefault}>
                    <div>To sign in you can use test account credentials:</div>
                    <div className={style.credentialsContainer}>
                        <div className={style.credentialsString}>
                            <div className={style.credentialsTitle}>email:</div>
                            <div className={style.credentialsValue}>{`${DEFAULT_EMAIL}`}</div>
                        </div>
                        <div className={style.credentialsString}>
                            <div className={style.credentialsTitle}>password:</div>
                            <div className={style.credentialsValue}>{`${DEFAULT_PASSWORD}`}</div>
                        </div>
                    </div>
                </div>
                : ''
            }
        </div>
    )
}

export default Login;
