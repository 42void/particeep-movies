import { Categories } from './Categories'
import './Multiselect.css';
import { MultiselectArrow } from './MultiselectArrow';

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
				<div>
					<input className="multiselect-input" value={text} onChange={(e) => handleInputChange(e)}/>
					<MultiselectArrow toggleMenu={toggleMenu} menuToggled={menuToggled}/>
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
        