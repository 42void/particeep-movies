export const ThumbUp = ({id, likedMovies}) => {
    const style = {
      backgroundColor: likedMovies.includes(Number(id)) ? '#90EE90' : 'transparent',
      cursor: 'pointer',
      display: 'block',
      margin: "-0.5rem 0.5rem 0 0.7rem",
      borderRadius: "1rem",
      padding: "0.3rem"
    }
    return <img alt="thumb-up" style={style} src="https://img.icons8.com/material-outlined/24/000000/facebook-like--v1.png"/>
}