import './Categories.css';

export const Categories = ({text, autocompletion, inactiveTags, addTag}) => {
	const dataSource = text !== "" ? autocompletion : inactiveTags 
	if(inactiveTags.length > 0) return dataSource.map(cat => <div key={cat} onClick={()=>addTag(cat)} className="category">{cat}</div>)
	return <div className="category">{"(no more categories)"}</div>
}
