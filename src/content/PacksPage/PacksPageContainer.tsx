import React, {useEffect} from 'react';
import PacksPage from './PacksPage';
import {useDispatch, useSelector} from 'react-redux';
import {createPackTC, deletePackTC, getPacksTC, updatePackTC} from '../../redux/packs-reducer';
import {RootStateType} from '../../redux/store';
import {Redirect} from 'react-router-dom';


function PacksPageContainer() {

    const dispatch = useDispatch()
    const isLoggedIn = useSelector((state: RootStateType): boolean => state.auth.isLoggedIn)
    const appStatus = useSelector((state: RootStateType): string => state.appState.status)
    const page = useSelector((state: RootStateType): number => state.pagination.page)
    const pageCount = useSelector((state: RootStateType): number => state.pagination.pageCount)
    const packNameFilter = useSelector((state: RootStateType) => state.filterState)

    useEffect(() => {
        dispatch(getPacksTC())
    }, [dispatch, page, pageCount, packNameFilter.onlyMyPacks])

    let packs = useSelector((state: RootStateType) => state.packsPage.packs)
    const totalPacksCount = useSelector((state: RootStateType) => state.packsPage.totalPacksCount)
    const itemsOnPage = useSelector((state: RootStateType) => state.pagination.pageCount)
    const filter = useSelector((state: RootStateType) => state.packsPage.params.sortPacks)
    if (filter === '1updated') {
        packs.sort((a, b) =>
            (new Date(b.updated).getTime()) - (new Date(a.updated)).getTime())
    } else if (filter === '0updated') {
        packs.sort((a, b) =>
            (new Date(a.updated).getTime()) - (new Date(b.updated)).getTime())
    }

    const pagesCount = Math.ceil(totalPacksCount / itemsOnPage)
    const pages = [];
    for (let i = 1; i <= pagesCount; i++) pages.push(i)

    const createPack = (name: string) => {
        dispatch(createPackTC(name))
    }

    const deletePack = (id: string) => {
        dispatch(deletePackTC(id))
    }

    const updatePack = (id: string, name: string) => {
        dispatch(updatePackTC(id, name))
    }

    return (
        appStatus === 'idle' && !isLoggedIn
            ? <Redirect to={'/login'}/>
            : <PacksPage
                packs={packs}
                createPack={createPack}
                deletePack={deletePack}
                updatePack={updatePack}
                totalPacksCount={totalPacksCount}
            />
    )
}

export default PacksPageContainer;
