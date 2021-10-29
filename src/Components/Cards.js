import React from 'react'
import { Gauge } from './Gauge'
import { ThumbUp } from './ThumbUp'

export const Cards = ({filteredDataPagination, likedMovies, toggleThumb, deleteCard}) => {
    return (
        <>
            <div className="cards-container">
            {filteredDataPagination?.map(({id, title, category, likes, dislikes}) => (
                <div key={id} className="movie-card">
                    <div className="close-btn-container">
                        <button onClick={()=>deleteCard(id)} className="close-btn">X</button>
                    </div>
                    <div className='movie-title'>
                        {title}
                    </div>
                    <div className='movie-category'>
                        {category}
                    </div>
                    <div className="thumb-gauge-container">
                        <div onClick={()=>toggleThumb(Number(id))}>
                            <ThumbUp id={id} likedMovies={likedMovies}/>
                        </div>
                        <div className="gauge-container">
                            <Gauge likes={likes} dislikes={dislikes}/>
                        </div>
                    </div>
                </div>
            ))}
            </div>
        </>
    )
}
        