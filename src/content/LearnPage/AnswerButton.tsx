import React from 'react';
import style from '../styles/LearnPage.module.css'

type AnswerButtonPropsType = {
    buttonId: number
    answerId: number
    color: string
    answerHandler(id: number): void
}

function AnswerButton({buttonId, answerId, color, answerHandler}: AnswerButtonPropsType) {

    const picked = buttonId === answerId
    const styling = `${style.answerButton} ${picked ? style.highlightAnswer : ''}`
    const highlight = {
        border: picked? `2px solid ${color}` : 'default',
        color: picked? `#555` : 'default',
    }

    return (
        <button disabled={!!answerId}
                className={styling}
                style={highlight}
                onClick={() => answerHandler(buttonId)}>
            {buttonId}
        </button>
    )
}

export default AnswerButton;
