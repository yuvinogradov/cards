import React, {useState} from 'react';
import inputValidator from '../../common/inputValidator';
import NewPassword from './NewPassword';
import {useDispatch} from 'react-redux';
import {setNewPasswordTC} from '../../redux/auth-reducer';
import {useParams} from 'react-router-dom';

export type NewPasswordFormStateType = {
    password: InputType
    confirm: InputType
}

type InputType = {
    value: string
    error: string
    touched: boolean
}

type ParamsType = {
    token: string | undefined
}

function NewPasswordContainer() {

    const dispatch = useDispatch()
    const params: ParamsType = useParams()
    const token = params.token ? params.token : ''
    window.history.replaceState(null, '', '/#/set-new-password')

    let [formState, setFormState] = useState<NewPasswordFormStateType>(
        {
            password: {value: '', error: '', touched: false},
            confirm: {value: '', error: '', touched: false}
        })

    const onChangeHandler = (field: 'password' | 'confirm') => (value: string) => {
        setFormState({
            ...formState, [field]:
                {
                    ...formState[field],
                    value: value.trim(),
                    error: formState[field].touched ? inputValidator(value, 'password') : ''
                }
        })
    }

    const onBlurHandler = (field: 'password' | 'confirm') => (e: React.FocusEvent<HTMLInputElement>) => {
        setFormState({
            ...formState, [field]:
                {
                    ...formState[field],
                    error: formState[field].value ?
                        inputValidator(e.target.value, 'password') : 'Required field',
                    touched: true
                }
        })
    }

    const onSubmitHandler = (password: string) => {
        const error = !formState.password.value
            ? 'Please enter new password'
            : formState.password.value !== formState.confirm.value
            ? 'Passwords do not match'
            : ''
        if (error) {
            setFormState({
                ...formState,
                password: {...formState.password, error: ' ', touched: true},
                confirm: {...formState.confirm, error, touched: true}
            })
        } else {
            dispatch(setNewPasswordTC(password, token))
        }
    }

    return (
        <NewPassword
            formState={formState}
            onChangeHandler={onChangeHandler}
            onBlurHandler={onBlurHandler}
            onSubmitHandler={onSubmitHandler}
        />
    )
}

export default NewPasswordContainer;
