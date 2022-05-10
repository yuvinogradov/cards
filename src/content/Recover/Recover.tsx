import React, {FormEvent} from 'react';
import style from '../styles/Recover.module.css'
import appStyle from '../../common/styles/Common.module.css'
import SuperInputText from '../../common/SuperInputText/SuperInputText';
import {NavLink} from 'react-router-dom';
import SuperButton from '../../common/SuperButton/SuperButton';
import {RecoverFormStateType} from './RecoverContainer';
import RecoverTimer from './RecoverTimer';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../../redux/store';
import {toggleTimerAC} from '../../redux/recover-reducer';

type RecoverPropsType = {
    formState: RecoverFormStateType
    onChangeHandler(value: string): void
    onBlurHandler(e: React.FocusEvent<HTMLInputElement>): void
    onSubmitHandler(email: string): void
}

const Recover = ({formState, onChangeHandler, onBlurHandler, onSubmitHandler}: RecoverPropsType) => {

    const dispatch = useDispatch()

    const timerValueMs = 11000
    const getTime = () => (Number(localStorage.timerData) + timerValueMs - Date.now())
    dispatch(toggleTimerAC(getTime() > 0))
    const timerIsOn = useSelector((state: RootStateType) => state.pageRecover.timerIsOn)

    const hideTimer = () => {
        dispatch(toggleTimerAC(false))
    }

    const submitForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        onSubmitHandler(formState.value)
    }

    return (
        <div className={style.wrapper}>
            <h1 className={appStyle.defaultTitle}>Recover password</h1>
            <div className={appStyle.infoWrapper}>
                <form className={style.form} onSubmit={submitForm}>
                    <SuperInputText
                        value={formState.value}
                        error={formState.error}
                        onChangeText={onChangeHandler}
                        onBlur={onBlurHandler}
                        placeholder={'Email'}
                    />
                    <div className={style.timerContainer}>
                        {timerIsOn
                            ? <RecoverTimer getTime={getTime} hideTimer={hideTimer}/>
                            : <SuperButton className={appStyle.defaultButton}
                                           disabled={!!formState.error}
                                           type={'submit'}>Send</SuperButton>
                        }
                    </div>
                    <NavLink to={'/login'}><span>Login page</span></NavLink>
                </form>
            </div>
        </div>
    )
}

export default Recover;
