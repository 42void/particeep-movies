import './App.css';
import React, { useState, useEffect } from 'react';
import { movies$ } from "./movies.js"
import './App.css';

const App = () => {

  const [allCategories, setAllCategories] = useState([])
  const [inactiveTags, setInactiveTags] = useState([])
  const [activeTags, setActiveTags] = useState([])
  const [autocompletion, setAutocompletion] = useState([])

  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  
  const [menuToggled, toggleMenu] = useState(false)
  const [text, setText] = useState("")

  const [paginationLimit, setPaginationLimit] = useState(4)
  const [filteredDataPagination, setFilteredDataPagination] = useState([])
  const [chunks, setChunks] = useState([])
  const [pageNumber, setPageNumber] = useState(0)
  const [numberOfPages, setNumberOfPages] = useState(0)

  const [likedMovies, setLikedMovies] = useState([])

  useEffect(() => {
    async function fetchMovies() {
      const response = await movies$
      setData(response)
      setFilteredData(response)
      setFilteredDataPagination(response)
      paginationDatasCalculation(paginationLimit, response)
      const categories = response.map(movie => movie.category)
      const categoriesWithoutDuplicata = Array.from(new Set(categories));
      setAllCategories(categoriesWithoutDuplicata)
      updateCategoriesAndTags(response)
    }
    fetchMovies()
  }, [])

  const updateCategoriesAndTags = (filteredMovies) => {
    const cat = filteredMovies.map(movie => movie.category)
    const res = Array.from(new Set(cat));
    setActiveTags(res)
    const diff = allCategories.filter(cat => !res.includes(cat));
    setInactiveTags(diff)
  }

  const deleteCard = (id) => {
    const filteredMovies = filteredData.filter(movie => movie.id !== id);
    setFilteredData(filteredMovies)
    updateCategoriesAndTags(filteredMovies)
    paginationDatasCalculation(paginationLimit, filteredMovies)
  }

  const deleteTag = (tag) => {
    const result = filteredData.filter(movie => movie.category !== tag);
    setFilteredData(result)
    const newActiveTag = activeTags.filter(x => x !== tag);
    setActiveTags(newActiveTag)
    setInactiveTags([...inactiveTags, tag])
    paginationDatasCalculation(paginationLimit, result)
  }

  const addTag = (tag) => {
    setActiveTags([...activeTags, tag])
    const newInactiveTag = inactiveTags.filter(x => x !== tag);
    setInactiveTags(newInactiveTag)
    const newAutocompletion = autocompletion.filter(x => x !== tag);
    setAutocompletion(newAutocompletion)
    const newActiveTag = data.filter(d => d.category === tag)
    setFilteredData([...newActiveTag, ...filteredData])
    paginationDatasCalculation(paginationLimit, [...newActiveTag, ...filteredData])
  }

  const handleChange = (e) => {
    toggleMenu(true)
    const txt = e.target.value
    setText(txt); 
    const filteredInactiveTags = inactiveTags.filter(it => it.toLowerCase().includes(txt.toLowerCase()))
    setAutocompletion(filteredInactiveTags)
  }

  const Multiselect = () => {
    const dataSource = text !== "" ? autocompletion : inactiveTags 
    if(inactiveTags.length > 0) return dataSource.map(cat => <div key={cat} onClick={()=>addTag(cat)} className="category">{cat}</div>)
    return <div className="category">{"(no more categories)"}</div>
  }

  const handleLimitChange = (e) => {
    const limit = Number(e.target.value)
    setPaginationLimit(limit);
    paginationDatasCalculation(limit, filteredData)
  }

  const paginationDatasCalculation = (limit, updatedDatas) => {
    const numberOfLoops = Math.ceil(updatedDatas.length / limit)
    const chunks=[]
    let chunk=[]
    let start = 0
    let i = 0
    
    while(i<numberOfLoops){     
      chunk = updatedDatas.slice(start, start + limit);
      start += limit
      chunks.push(chunk)
      i++;
    }
    setChunks(chunks)
    setPageNumber(0)
    setNumberOfPages(chunks.length)
    setFilteredDataPagination(chunks[0])
  }

  const previousPage = () => {
    if(pageNumber > 0){
      setPageNumber(pageNumber - 1)
      setFilteredDataPagination(chunks[pageNumber - 1])
    }
  }

  const nextPage = () => {
    if(pageNumber < Math.floor(filteredData.length / paginationLimit)){
      setPageNumber(pageNumber + 1)
      setFilteredDataPagination(chunks[pageNumber + 1])
    }
  }

  const updateNumberOfLikes = (movieId, up) => {
    const updatedMovie = filteredDataPagination.map((movie) => {
      if(Number(movie.id) === movieId){
        const likes = up ? movie.likes + 1 : movie.likes - 1
        return {...movie, likes}
      }
      return movie
    })
    setFilteredDataPagination(updatedMovie)
  }

  const toggleThumb = (movieId) => {
    if(likedMovies.includes(movieId)){
      const filteredLikes = likedMovies.filter((likedMovie) => likedMovie !== movieId)
      setLikedMovies(filteredLikes)
      updateNumberOfLikes(movieId, 0)
    }else{
      setLikedMovies([...likedMovies, movieId])    
      updateNumberOfLikes(movieId, 1)
    }
  }

  const Gauge = ({likes, dislikes}) => {
    const calc = likes/(likes+dislikes) * 100
    const width = calc.toString() + "%"
    return <div style={{height:"1rem", backgroundColor:"#90EE90", width}}/>
  }

  const ThumbUp = ({id}) => {
    const style = {
      backgroundColor: likedMovies.includes(Number(id))?'#90EE90':'none',
      cursor: 'pointer',
      display: 'block',
      margin: "-0.5rem 0.5rem 0 0.7rem",
      borderRadius: "1rem",
      padding: "0.3rem"
    }
    return <img alt="thumb-up" style={style} src="https://img.icons8.com/material-outlined/24/000000/facebook-like--v1.png"/>
  }

  return (
    <>
      <h1 className="title">PARTICEEP MOVIES</h1>
      <div className="multiselect-container">
        <div className="tags-container">
          {activeTags.map((tag) => 
              <div key={tag} className="tag">
                <span className="tag-text">{tag}</span>
                <span className="tag-close" onClick={()=>deleteTag(tag)}>X</span>
              </div>
          )}
        </div>
        <div className="multiselect-input-container">
          <input className="multiselect-input" value={text} onChange={(e) => handleChange(e)}/>
          <span className="multiselect-toggle" onClick={()=>toggleMenu(!menuToggled)}>
            <img alt="multiselect-arrow-down" className="multiselect-arrow-down" src="https://img.icons8.com/ios-glyphs/30/000000/expand-arrow--v1.png"/>
          </span>
        </div>
        {menuToggled && 
          <div className="multiselect-categories-container">  
              <Multiselect/>
          </div> 
        }
      </div>
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
                <ThumbUp id={id}/>
              </div>
              <div className="gauge-container">
                <Gauge likes={likes} dislikes={dislikes}/>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination-container">
        <div className="pagination-navigation">
          <div className="pagination-previous" onClick={()=>previousPage()}>{"<"} Précédent</div>
          <select value={paginationLimit} onChange={(e)=>handleLimitChange(e)}>
            <option defaultValue="4">4</option>
            <option value="8">8</option>
            <option value="12">12</option>
          </select>
          <div className="pagination-next" onClick={()=>nextPage()}>Suivant {">"}</div>
        </div>
        <div className="pagination-page-number">Page {pageNumber + 1}/{numberOfPages}</div>
      </div>
    </>
  );
}

export default App;
