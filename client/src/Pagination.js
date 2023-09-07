


export default function  Pagination({ currentPage, setCurrentPage ,totalPost}) {
    return (
      <div className="pagination">
        { currentPage > 1 && <button onClick={()=>setCurrentPage(currentPage-1)}>⬅️</button>}
        { totalPost ===10 && <button onClick={()=>setCurrentPage(currentPage+1)}>➡️</button>}
      </div>
    );
  }
  