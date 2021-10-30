import { Gauge } from './Gauge'
import { ThumbDown } from './ThumbDown'
import { ThumbUp } from './ThumbUp'

export const Cards = ({filteredDataPagination, likedMovies, dislikedMovies, clickThumbUp, clickThumbDown, deleteCard}) => {
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
							<div onClick={()=>clickThumbUp(Number(id))}>
								<ThumbUp id={id} likedMovies={likedMovies}/>
							</div>
							<div className="gauge-container">
								<Gauge likes={likes} dislikes={dislikes}/>
							</div>
							<div onClick={()=>clickThumbDown(Number(id))}>
								<ThumbDown id={id} dislikedMovies={dislikedMovies}/>
							</div>
						</div>
					</div>
			))}
			</div>
		</>
	)
}
        