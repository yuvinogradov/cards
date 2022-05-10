import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import SortDisplay from "./SortDisplay";
import {setCurrentPageAC, setItemsOnPageAC} from "../../redux/pagination-reducer";
import {RootStateType} from "../../redux/store";

type PaginationStateType = {
    page: number
    pageCount: number
}

function SortContainer() {
    const dispatch = useDispatch()
    const paginationState = useSelector((state: RootStateType): PaginationStateType => state.pagination)


    const getPage = (currentPage: number) => {
        dispatch(setCurrentPageAC(currentPage))
    }

    const getItemsOnPage = (itemsOnPage: number) => {
        dispatch(setItemsOnPageAC(itemsOnPage))
    }

    return (
        <div>
            <SortDisplay
                currentPage={paginationState.page}
                itemsOnPage={paginationState.pageCount}
                totalItems={54}
                getPage={getPage}
                getItemsOnPage={getItemsOnPage}
            />
        </div>
    );
}

export default SortContainer;
