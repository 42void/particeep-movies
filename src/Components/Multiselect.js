import React from 'react'

export const Multiselect = ({activeTags, text, menuToggled, deleteTag, handleChange, toggleMenu, autocompletion, inactiveTags, addTag}) => {
	
	const Categories = ({text, autocompletion, inactiveTags, addTag}) => {
		const dataSource = text !== "" ? autocompletion : inactiveTags 
		if(inactiveTags.length > 0) return dataSource.map(cat => <div key={cat} onClick={()=>addTag(cat)} className="category">{cat}</div>)
		return <div className="category">{"(no more categories)"}</div>
	}
	
	return (
		<>
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
						<Categories
							text={text} 
							autocompletion={autocompletion} 
							inactiveTags={inactiveTags} 
							addTag={addTag}
						/>
					</div> 
				}
			</div>
		</>
	)
}
        