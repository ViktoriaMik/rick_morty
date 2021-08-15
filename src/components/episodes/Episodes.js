import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    loadEpisodes, loadFilterEpisodes,
    setCurrentPageEpisodes
} from "../../redux/action-creator/episodes-action-creator";

import styles from "../styles.module.css";


import {toggleEpisodeInWatchList} from "../../redux/action-creator/watch-list-action-creator";


const Episodes = () => {
        const dispatch = useDispatch()
        const episodes = useSelector(({episodes: {episodes}}) => episodes);
        const currentPage = useSelector(({episodes: {currentPage}}) => currentPage)

        const watchList = useSelector(({watchList: {watchList}}) => watchList)
        console.log(watchList)

        const [value, setValue] = useState('')
        const [searchValue, setSearchValue] = useState('');

        let searchEpisode = episodes.filter(episode => {
            return !!searchValue ? episode.name.toLowerCase().includes(searchValue.toLowerCase()) : episode.name.toLowerCase().includes(value.toLowerCase())
        })

        const pages = []
        for (let i = 1; i < 3; i++) {
            pages.push(i)
        }
        useEffect(() => {
            dispatch(loadEpisodes(currentPage))
            dispatch(loadFilterEpisodes(value))
        }, [currentPage, value])

        return (
            <>
                <div className={styles.searchHolder}>
                    <select className={styles.select} onChange={({target: {value}}) => setValue(value)}>
                        <option value={'episode'}>Episode</option>
                        {episodes.map(episode => (
                            <option value={episode.name}>{episode.name}</option>
                        ))}
                    </select>
                    <form className={styles.inputHolder}>
                        <input style={styles.inpt} type='text' placeholder='Search episode'
                               onChange={({target: {value}}) => setSearchValue(value)}/>
                    </form>
                </div>
                <div className={styles.container_episode}>
                    {


                        searchEpisode.map(episode => (
                            <>
                                <div className={styles.episode}>
                                    <div onClick={() => {
                                        console.log(watchList.includes(episode))
                                        dispatch(toggleEpisodeInWatchList(episode))
                                    }}>{watchList.includes(episode) ?
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                             fill="currentColor" className="bi bi-bookmark-plus-fill"
                                             viewBox="0 0 16 16">
                                            <path fill-rule="evenodd"
                                                  d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zm6.5-11a.5.5 0 0 0-1 0V6H6a.5.5 0 0 0 0 1h1.5v1.5a.5.5 0 0 0 1 0V7H10a.5.5 0 0 0 0-1H8.5V4.5z"/>
                                        </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                      fill="currentColor" className="bi bi-bookmark-plus"
                                                      viewBox="0 0 16 16">
                                            <path
                                                d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
                                            <path
                                                d="M8 4a.5.5 0 0 1 .5.5V6H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V7H6a.5.5 0 0 1 0-1h1.5V4.5A.5.5 0 0 1 8 4z"/>
                                        </svg>}</div>

                                    <div>{episode.episode}</div>
                                    <img className={styles.image}
                                         src={`https://rickandmortyapi.com/api/character/avatar/${episode.id}.jpeg`}/>
                                    <div>
                                        {episode.name}
                                    </div>

                                </div>
                            </>
                        ))}
                </div>
                <div className={styles.bottom}>
                    {pages.map(page => (
                        <span
                            onClick={() => dispatch(setCurrentPageEpisodes(page))}
                            className={currentPage === page ? styles.pages : styles.page}>
                            {page}</span>
                    ))}
                </div>
            </>
        );
    }
;

export default Episodes;