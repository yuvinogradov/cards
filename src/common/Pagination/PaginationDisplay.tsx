import React from 'react';
import s from '../styles/PaginationDisplay.module.css';

type PaginationType = {
    currentPage: number
    totalItems: number
    itemsOnPage: number
    getPage(currentPage: number): void
    getItemsOnPage(itemsOnPage: number): void
}

function PaginationDisplay({currentPage, totalItems, itemsOnPage, getPage, getItemsOnPage}: PaginationType) {

    let pages: JSX.Element[] = []

    const lastPage = Math.ceil(totalItems / itemsOnPage)

    for (let i = 1; i <= lastPage; i++) pages.push((
        <button
            key={i}
            style={{
                background: currentPage === i ? '#4c4c4c' : undefined,
                color: currentPage === i ? 'white' : undefined,
                transition: currentPage === i ? '0.9s' : '0.0s'
            }}
            onClick={() => getPage(i)}
        >
            {i}
        </button>
    ));

    // 1 ... 4 5 (6) 7 8 ... 11
    const centralPartWidth = 1
    if ((currentPage + 2 + centralPartWidth) < lastPage) {
        pages[currentPage + centralPartWidth] = (
            <span key={currentPage + 1 + centralPartWidth} style={{}}>
                 ...
            </span>
        );
        pages = pages.filter((p, i) => i < (currentPage + 1 + centralPartWidth) || i === (lastPage - 1));
    }
    if (currentPage > 3 + centralPartWidth) {
        pages[1] = (
            <span key={2} style={{}}>
                 ...
            </span>
        );
        pages = pages.filter((p, i) => i < 2 || i > currentPage - (2 + centralPartWidth));
    }

    return (
        <div className={s.main}>
            {pages}
            <select value={itemsOnPage}
                    onChange={e => {
                        getItemsOnPage(Number(e.currentTarget.value))
                    }}
                    style={{marginLeft: '5px'}}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
            </select>
        </div>
    );
}

export default PaginationDisplay;
