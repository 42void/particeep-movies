export  const Gauge = ({likes, dislikes}) => {
    const calc = likes/(likes+dislikes) * 100
    const width = calc.toString() + "%"
    return <div style={{height:"1rem", backgroundColor:"#90EE90", width}}/>
}