import React, {useState} from 'react';
import SuperButton from '../common/SuperButton/SuperButton';
import SuperInputText from '../common/SuperInputText/SuperInputText';
import SuperCheckbox from '../common/SuperCheckbox/SuperCheckbox';
import s from './styles/Registration.module.css'
import SearchContainer from "../common/Search/SearchContainer";
import PaginationContainer from "../common/Pagination/PaginationContainer";
import ModalContainer from "../common/modals/ModalContainer";
import ModalQuestionContainer from '../common/modals/question/ModalQuestionContainer';

function SuperInputsDemo() {
    const [text, setText] = useState<string>("");
    const error = text ? "" : "Field can't be empty";

    const showAlert = () => {
        if (error) {
            alert("Введите текст");
        } else {
            alert(text);

        }
    };

    const [checked, setChecked] = useState<boolean>(false);

    return (
        <div className={s.demoContainer}>
            <h1>
                SuperInputs Demo
            </h1>
            <div>
                <SuperInputText
                    value={text}
                    onChangeText={setText}
                    onEnter={showAlert}
                    error={error}
                    className={s.green}
                />

                <SuperButton
                    red={text === ''}
                    onClick={showAlert}
                >
                    Button
                </SuperButton>

                <SuperCheckbox checked={checked} onChangeChecked={setChecked}>
                    CheckboxText
                </SuperCheckbox>
                <div>SearchComponent:
                    <div style={{'border': 'solid 1px black'}}><SearchContainer placeholder={'placeholder'}
                                                                                showOnlyMyPacksCheckbox/></div>
                </div>
                <div>Pagination:
                    <div style={{'border': 'solid 1px black'}}><PaginationContainer totalItems={50}/></div>
                </div>
                <ModalContainer modalText={'Simple Modal'} buttonText={'Close it!'}/>
                <ModalQuestionContainer isMine={true}/>
            </div>
        </div>
    )
}

export default SuperInputsDemo;
