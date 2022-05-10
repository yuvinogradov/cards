import React, {useState} from 'react';
import inputValidator from '../../common/inputValidator';
import Recover from './Recover';
import {useDispatch} from 'react-redux';
import {recoverPasswordTC} from '../../redux/recover-reducer';

export type RecoverFormStateType = {
    value: string
    error: string
    touched: boolean
}

!localStorage.timerData && localStorage.setItem('timerData', '0')

function RecoverContainer() {

    const dispatch = useDispatch()
    let [formState, setFormState] =
        useState<RecoverFormStateType>({value: '', error: '', touched: false})
    const baseUrl = `${window.location.origin}/#/set-new-password`

    const onChangeHandler = (value: string) => {
        setFormState({
            ...formState,
            value: value.trim(),
            error: formState.touched ? inputValidator(value, 'email') : ''
        })
    }

    const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
        setFormState({
            ...formState,
            error: formState.value ? inputValidator(e.target.value, 'email') : 'Required field',
            touched: true
        })
    }

    const onSubmitHandler = (email: string) => {
        setFormState({
            ...formState,
            error: formState.value ? inputValidator(email, 'email') : 'Required field',
            touched: true
        })
        if (!inputValidator(formState.value, 'email')) {
            dispatch(recoverPasswordTC(email, baseUrl))
        }
    }

    return (
        <Recover
            formState={formState}
            onChangeHandler={onChangeHandler}
            onBlurHandler={onBlurHandler}
            onSubmitHandler={onSubmitHandler}
        />
    )
}

export default RecoverContainer;
