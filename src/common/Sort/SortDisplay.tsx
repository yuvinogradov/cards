import React from 'react';
import s from './SortDisplay.module.css';

type PaginationType = {
    currentPage: number
    totalItems: number
    itemsOnPage: number
    getPage(currentPage: number): void
    getItemsOnPage(itemsOnPage: number): void
}

function SortDisplay({currentPage, totalItems, itemsOnPage, getPage, getItemsOnPage}: PaginationType) {

    let pages: JSX.Element[] = []

    const lastPage = Math.ceil(totalItems / itemsOnPage)

    for (let i = 1; i <= lastPage; i++) pages.push((
        <button
            key={i}
            style={{background: currentPage === i ? 'lightblue' : undefined}}
            onClick={() => getPage(i)}
        >
            {i}
        </button>
    ));

    return (
        <div className={s.main}>
            <select value={itemsOnPage}
                    onChange={e => {
                        getItemsOnPage(Number(e.currentTarget.value))
                    }}
                    style={{}}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
            </select>
            {pages}
        </div>
    );
}

export default SortDisplay;
