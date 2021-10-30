export const ThumbDown = ({id, dislikedMovies}) => {
    const style = {
      backgroundColor: dislikedMovies.includes(Number(id)) ? '#fc3939' : 'transparent',
      cursor: 'pointer',
      display: 'block',
      margin: "-0.5rem 0.5rem 0 0.7rem",
      borderRadius: "1rem",
      padding: "0.3rem",
      transform: "scale(-1, -1)"
    }
    return <img alt="thumb-up" style={style} src="https://img.icons8.com/material-outlined/24/000000/facebook-like--v1.png"/>
}