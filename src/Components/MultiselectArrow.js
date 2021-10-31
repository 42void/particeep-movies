import './MultiselectArrow.css';

export const MultiselectArrow = ({toggleMenu, menuToggled}) => {
	const style = {
		width: '0.7rem',
		cursor: 'pointer',
		transform: menuToggled ? 'scale(-1)' : 'none'
	}
	return (
		<span className="multiselect-toggle" onClick={()=>toggleMenu(!menuToggled)}>
			<img alt="multiselect-arrow-down" style={style} src="https://img.icons8.com/ios-glyphs/30/000000/expand-arrow--v1.png"/>
		</span>
	)
}
	