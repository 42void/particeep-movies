import './App.css';
import React, { useState, useEffect } from 'react';
import { movies$ } from "../movies.js"
import { Pagination } from './Pagination';
import { Cards } from './Cards';
import { MultiselectAndTags } from './MultiselectAndTags';

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
      const categoriesSet = Array.from(new Set(categories));
      setAllCategories(categoriesSet)
      setActiveTags(categoriesSet)
      setInactiveTags([])
    }
    fetchMovies()
  }, [paginationLimit])

  const setTags = (moviesNotDeleted) => {
    const cat = moviesNotDeleted.map(movie => movie.category)
    const res = Array.from(new Set(cat));
    setActiveTags(res)
    const diff = allCategories.filter(cat => !res.includes(cat));
    setInactiveTags(diff)
  }

  const deleteCard = (id) => {
    const moviesNotDeleted = filteredData.filter(movie => movie.id !== id);
    setFilteredData(moviesNotDeleted)
    setTags(moviesNotDeleted)
    paginationDatasCalculation(paginationLimit, moviesNotDeleted)
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
    if(pageNumber < Math.ceil(filteredData.length / paginationLimit - 1)){
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

  return (
    <>
      <h1 className="title">PARTICEEP MOVIES</h1>
      <MultiselectAndTags
        autocompletion={autocompletion} 
        inactiveTags={inactiveTags} 
        menuToggled={menuToggled} 
        activeTags={activeTags} 
        text={text} 
        handleChange={handleChange} 
        toggleMenu={toggleMenu}
        deleteTag={deleteTag} 
        addTag={addTag}
      />
      <Cards 
        filteredDataPagination={filteredDataPagination}
        likedMovies={likedMovies} 
        toggleThumb={toggleThumb} 
        deleteCard={deleteCard}
      />
      <Pagination 
        paginationLimit={paginationLimit}
        numberOfPages={numberOfPages}
        pageNumber={pageNumber} 
        handleLimitChange={handleLimitChange}
        previousPage={previousPage}
        nextPage={nextPage}
      />
    </>
  );
}

export default App;
