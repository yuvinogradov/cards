import React from 'react';
import style from '../styles/PacksPage.module.css'
import {GetPacksResponseType} from '../../api/API';
import PackItem from './PackItem';
import PaginationContainer from '../../common/Pagination/PaginationContainer';
import SearchContainer from '../../common/Search/SearchContainer';
import ModalInputContainer2 from '../../common/modals/input2/ModalInputContainer2';
import {RootStateType} from '../../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import {getPacksTC, setSortPacksAC} from '../../redux/packs-reducer';
import {AnswersType} from '../../common/modals/input2/ModalInput2';

type PacksPagePropsType = {
    packs: Array<GetPacksResponseType>
    totalPacksCount: number
    createPack(name: string): void
    deletePack(id: string): void
    updatePack(id: string, name: string): void
}

export type AddPackFormStateType = {
    value: string
    error: string
    hide: boolean
    touched: boolean
}

function PacksPage(props: PacksPagePropsType) {

    const dispatch = useDispatch()
    const filter = useSelector((state: RootStateType): string => state.filterState.nameFilter)
    const sort = useSelector((state: RootStateType) => state.packsPage.params.sortPacks)
    const crSorting = sort.slice(1) === 'created'

    let packs = props.packs.filter(p => filter ? p.name.includes(filter) : true)
    let packsRender = packs.map(p =>
        <PackItem {...p}
                  key={p._id}
                  deleteCallback={() => props.deletePack(p._id)}
                  updateCallback={(name: string) => props.updatePack(p._id, name)}
        />)

    const setSort = (type: 'created' | 'updated') => {
        dispatch(setSortPacksAC(type))
        dispatch(getPacksTC())
    }

    const onModalSubmitHandler2 = (value: AnswersType) => {
            props.createPack('' + value.field1.value)

        if (value.field2) {
            alert(value.field2.value)
        }
    }

    return (
        <div className={style.packsPageWrapper}>
            <h1 className={style.pageTitle}>Packs</h1>
            <div className={style.controlsContainer}>
                <div style={{alignSelf: 'flex-start', marginBottom: '5px'}}>
                    <SearchContainer
                        placeholder={'Search packs'}
                        showOnlyMyPacksCheckbox={false}
                    />
                </div>
                <div style={{alignSelf: 'flex-end', marginBottom: '5px'}}>
                    <PaginationContainer totalItems={props.totalPacksCount}/>
                </div>
            </div>
            <div className={style.table}>
                <div className={style.tableHeader}>
                    <div style={{width: '250px'}}>Packs</div>
                    <div style={{width: '65px'}}>Cards</div>
                    <div>
                        <span className={`${style.sortSettings} ${!crSorting ? style.activeSetting : ''}`}
                              onClick={() => setSort('updated')}>
                            {`Updated ${sort === '1updated' ? '↑' : '↓'}`}
                        </span>
                    </div>
                    <div>
                        <span className={`${style.sortSettings} ${crSorting ? style.activeSetting : ''}`}
                              onClick={() => setSort('created')}>
                            {`Created ${sort === '1created' ? '↑' : '↓'}`}
                        </span>
                    </div>
                    <div style={{marginLeft: 'auto'}}>
                            <ModalInputContainer2 buttonTitle={'Add Pack'}
                                                  modalText={'Enter new pack name'}
                                                  isMine={true}
                                                  defaultAnswers={{
                                                      field1: {title: 'Pack name'},
                                                  }}
                                                  answerCallback={onModalSubmitHandler2}
                            />
                    </div>
                </div>
                <ul>
                    {packsRender}
                </ul>
            </div>
        </div>
    )
}

export default PacksPage;
