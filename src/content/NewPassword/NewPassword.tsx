import React, {FormEvent} from 'react';
import style from '../styles/Password.module.css'
import appStyle from '../../common/styles/Common.module.css'
import SuperButton from '../../common/SuperButton/SuperButton';
import {NavLink} from 'react-router-dom';
import {NewPasswordFormStateType} from './NewPasswordContainer';
import SuperInputText from '../../common/SuperInputText/SuperInputText';

type RecoverPropsType = {
    formState: NewPasswordFormStateType
    onChangeHandler(field: 'password' | 'confirm'): (value: string) => void
    onBlurHandler(field: 'password' | 'confirm'): (e: React.FocusEvent<HTMLInputElement>) => void
    onSubmitHandler(password: string): void
}

const NewPassword = ({formState, onChangeHandler, onBlurHandler, onSubmitHandler,}: RecoverPropsType) => {

    const submitForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        onSubmitHandler(formState.password.value)
    }

    const formError = !!(formState.password.error || formState.confirm.error)

    return (
        <div className={style.wrapper}>
            <h1 className={appStyle.defaultTitle}>New password</h1>
            <div className={appStyle.infoWrapper}>
                <form className={style.form} onSubmit={submitForm}>
                    <SuperInputText
                        value={formState.password.value}
                        error={formState.password.error}
                        onChangeText={onChangeHandler('password')}
                        onBlur={onBlurHandler('password')}
                        placeholder={'Enter new password'}
                        type={'password'}
                    />
                    <SuperInputText
                        value={formState.confirm.value}
                        error={formState.confirm.error}
                        onChangeText={onChangeHandler('confirm')}
                        onBlur={onBlurHandler('confirm')}
                        placeholder={'Confirm'}
                        type={'password'}
                    />
                    <SuperButton className={appStyle.defaultButton}
                                 disabled={formError} type={'submit'}>
                        <span>Send</span>
                    </SuperButton>
                    <NavLink to={'/login'}><span>Login page</span></NavLink>
                </form>
            </div>
        </div>
    )
}

export default NewPassword