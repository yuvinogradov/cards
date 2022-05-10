import React from 'react';
import s from './NameFilterComponent.module.css';

type searchFieldType = {
    value: string
    onChangeHandler(value: string): void
    onClearHandler(): void
    setFiltersHandler(): void
    placeholder?: string
}


function NameFilterComponent({value, onChangeHandler, setFiltersHandler, onClearHandler, placeholder= 'Filter by name'}: searchFieldType) {
    const handleKeyPress = (e: any) => {
        if (e.key === 'Enter') {
            setFiltersHandler()
        }
    }

    return (
        <div className={s.searchComponent}>
            <input
                type='text' className={s.input} value={value}
                onChange={(e) => onChangeHandler(e.currentTarget.value)}
                onKeyPress={handleKeyPress}
                placeholder={placeholder}
            />
            {/*<button onClick={onClearHandler}>x</button>*/}
        </div>
    );
}

export default NameFilterComponent;