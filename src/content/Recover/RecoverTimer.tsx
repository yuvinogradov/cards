import React, {useEffect, useState} from 'react';
import style from '../styles/Recover.module.css'

type RecoverTimerPropsType = {
    getTime(): number
    hideTimer(show: boolean): void
}

function RecoverTimer({getTime, hideTimer}: RecoverTimerPropsType) {

    const [timeMs, setTimeMs] = useState(getTime())

    const convertMsToTime = (ms: number) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = ((ms % 60000) / 1000);
        return minutes + ':' + (seconds < 10 ? '0' : '') + Math.floor(seconds)
    }

    useEffect(() => {
        const tick = () => {
            setTimeMs(getTime())
            if (getTime() < 0) hideTimer(false)
        }
        const timerID = setInterval(() => tick(), 1000);
        return () => clearInterval(timerID);
    }, )

    return (
        <span className={style.timer}>
                {`Time till next link: ${convertMsToTime(timeMs)}`}
            </span>
    )
}

export default RecoverTimer;