import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../../redux/store';
import Registration2 from './Registration2';
import registrationInputValidator from '../../common/registrationInputValidator';
import {registrationTC, setSuccessfullyRegisteredAC} from '../../redux/registration-reducer';
import {Redirect} from 'react-router-dom';

export type RegistrationFormStateType = {
    email: InputStateType
    password: InputStateType
    password2: InputStateType
    errorResponse: string
    successfullyRegistered: boolean
    globalFormError: string

}

export type InputStateType = {
    value: string
    error: string
    touched: boolean
}

const initialState: RegistrationFormStateType = {
    email: {value: '', error: '', touched: false},
    password: {value: '', error: '', touched: false},
    password2: {value: '', error: '', touched: false},
    errorResponse: '',
    successfullyRegistered: false,
    globalFormError: ''
}


function RegistrationContainer() {

    const dispatch = useDispatch()
    const isSuccessfullyRegistered = useSelector((state: RootStateType): boolean => state.pageRegistration.isSuccessfullyRegistered)

    const [registrationFormState, setRegistrationFormState] = useState<RegistrationFormStateType>(initialState);

    useEffect(() => {
        if (isSuccessfullyRegistered) {
            dispatch(setSuccessfullyRegisteredAC(false))
        }
    })

    const onRegistrationInputsChangeHandler = (field: 'email' | 'password' | 'password2') =>
        (value: string) => {
            setRegistrationFormState({
                ...registrationFormState,
                [field]:
                    {
                        ...registrationFormState[field],
                        value: value.trim(),
                        error: registrationFormState[field].touched ?
                            registrationInputValidator(field, value, registrationFormState.password.value)
                            : ''
                    },
            })
        }

    const onBlurHandler = (field: 'email' | 'password') => (e: React.FocusEvent<HTMLInputElement>) => {
        setRegistrationFormState({
            ...registrationFormState, [field]:
                {
                    ...registrationFormState[field],
                    error: registrationFormState[field].value ?
                        registrationInputValidator(field, e.target.value, registrationFormState.password.value)
                        : 'Required field',
                    touched: true
                }
        })
    }

    const onSubmitHandler = (email: string, password: string) => {
        dispatch(registrationTC(email, password))
    }

    return (
        isSuccessfullyRegistered
            ? <Redirect to={'profile'}/>
            : <Registration2
                registrationFormState={registrationFormState}
                onChangeHandler={onRegistrationInputsChangeHandler}
                onBlurHandler={onBlurHandler}
                onSubmitHandler={onSubmitHandler}
            />

    )
}

export default RegistrationContainer;
