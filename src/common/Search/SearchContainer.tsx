import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import NameFilterComponent from "./NameFilterComponent";
import {setFiltersAC} from "../../redux/search-reducer";
import s from '../styles/SearchContainer.module.css';

export type SearchStateType = {
    nameFilter: string
    onlyMyPacks: boolean
}
export type SearchContainerPropsType = {
    placeholder: string
    showOnlyMyPacksCheckbox: boolean
}

function SearchContainer({placeholder, showOnlyMyPacksCheckbox}: SearchContainerPropsType) {
    const dispatch = useDispatch()
    const [searchState, setSearchState] = useState<SearchStateType>(
        {
            nameFilter: "",
            onlyMyPacks: true
        }
    )

    const onChangeHandler = (searchValue: string) => {
        setSearchState({
            ...searchState,
            nameFilter: searchValue,
        })
    }

    const myPacksHandler = () => {
        setSearchState({
            ...searchState,
            onlyMyPacks: !searchState.onlyMyPacks
        })
        dispatch(setFiltersAC(searchState))
    }
    const setFiltersHandler = () => {
        dispatch(setFiltersAC(searchState))
    }

    const onClearHandler = () => {
        setSearchState({
            ...searchState,
            nameFilter: ''
        })
        dispatch(setFiltersAC({
            ...searchState,
            nameFilter: ''
        }))
    }

    return (
        <div>
            {showOnlyMyPacksCheckbox ?
                <>
                    <input type="checkbox"
                           id="showOnlyMyPacks"
                           name="interest"
                           checked={!searchState.onlyMyPacks}
                           onChange={myPacksHandler}
                    />
                    <label htmlFor="showOnlyMyPacks"
                           style={{fontSize: '12px', color: '#777'}}
                    >
                        Only my packs
                    </label>
                </> : ''}
            <div className={s.searchContainer}>
                <NameFilterComponent
                    value={searchState.nameFilter}
                    onChangeHandler={onChangeHandler}
                    onClearHandler={onClearHandler}
                    setFiltersHandler={setFiltersHandler}
                    placeholder={placeholder}
                />
                <button onClick={setFiltersHandler}
                        style={{marginLeft: '5px', borderRadius: '4px'}}>Search
                </button>
            </div>
        </div>
    );
}

export default SearchContainer;