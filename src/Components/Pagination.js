export const Pagination = ({paginationLimit, pageNumber, numberOfPages, previousPage, handleLimitChange, nextPage}) => {
	return (
		<>
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
	)
}
    