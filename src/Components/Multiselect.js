import { Categories } from './Categories'

export const Multiselect = ({activeTags, text, menuToggled, deleteTag, handleInputChange, toggleMenu, autocompletion, inactiveTags, addTag}) => {
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
					<input className="multiselect-input" value={text} onChange={(e) => handleInputChange(e)}/>
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
        