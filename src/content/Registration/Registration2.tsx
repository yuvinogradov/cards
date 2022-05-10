import React, {FormEvent} from 'react';
import SuperButton from '../../common/SuperButton/SuperButton';
import SuperInputText from '../../common/SuperInputText/SuperInputText';
import style from '../styles/Registration.module.css'
import appStyle from '../../common/styles/Common.module.css'
import {RegistrationFormStateType} from './RegistrationContainer';
import {RegistrationValidatorFieldType} from '../../common/registrationInputValidator';

type RegistrationPropsType = {
    registrationFormState: RegistrationFormStateType
    onChangeHandler(field: RegistrationValidatorFieldType): (value: string) => void
    onBlurHandler(field: RegistrationValidatorFieldType): (e: React.FocusEvent<HTMLInputElement>) => void
    onSubmitHandler(email: string, password: string): void
}

function Registration2({
                           registrationFormState,
                           onChangeHandler,
                           onBlurHandler,
                           onSubmitHandler
                       }: RegistrationPropsType) {
    const email = registrationFormState.email
    const password = registrationFormState.password
    const password2 = registrationFormState.password2
    const errorResponse = registrationFormState.errorResponse

    const submitForm = (e: FormEvent<HTMLFormElement>) => {
        e.stopPropagation()
        onSubmitHandler(email.value, password.value)
    }

    const disableSubmit = !!(email.error || password.error || password2.error || registrationFormState.globalFormError)

    return (
        <div className={style.pageContainer}>
            <h1 className={appStyle.defaultTitle}>Sign Up</h1>
            <div className={appStyle.infoWrapper}>
                <form className={style.form} onSubmit={submitForm}>
                    <div className={style.registrationErrorMessage}>
                        {errorResponse}
                    </div>
                    <div className={style.container}>
                        <SuperInputText
                            title={'Email'}
                            value={email.value}
                            error={email.error}
                            onChangeText={onChangeHandler('email')}
                            onBlur={onBlurHandler('email')}
                            type={'text'}
                        />

                        <SuperInputText
                            title={'Password'}
                            value={password.value}
                            error={password.error}
                            onChangeText={onChangeHandler('password')}
                            onBlur={onBlurHandler('password')}
                            type={'password'}
                        />

                        <SuperInputText
                            title={'Confirm password'}
                            value={password2.value}
                            error={password2.error}
                            onChangeText={onChangeHandler('password2')}
                            onBlur={onBlurHandler('password2')}
                            type={'password'}
                        />

                        <SuperButton
                            className={`${appStyle.defaultButton} ${style.submitButton}`}
                            disabled={disableSubmit}
                            type={'submit'}
                        >
                            Sign up
                        </SuperButton>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Registration2;
