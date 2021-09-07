import './App.css';
import { useData } from './api/api';
import { Gallery } from './Component/Gallery';
import {useState} from 'react';
import ReactPaginate from "react-paginate";
import { Error } from './Component/Error';

function App() {
  const [page,setPageNumber] = useState(0);
  const [sort,setSort] = useState("");
  const {data,error,loading}=useData(page);

  function handleChange(e){
        let value = e.target.value;
        setSort(value);
  }
  function handlePageClick({ selected: selectedPage }) {
    setPageNumber(selectedPage);
  }

  const actualContent = <div className="container">
  <label> Sort : 
  <select value={sort} onChange={handleChange} className="sorting">
     <option value="likes">Likes</option>
     <option value="date">Dates</option>
     <option value="shares">shares</option>
     <option value="views">views</option>
  </select>
  </label>
  <Gallery data={data} sort={sort}/>
  <ReactPaginate
   previousLabel={"← Previous"}
   nextLabel={"Next →"}
   pageCount={3}
   onPageChange={handlePageClick}
   containerClassName={"pagination"}
   previousLinkClassName={"pagination__link"}
   nextLinkClassName={"pagination__link"}
   disabledClassName={"pagination__link--disabled"}
   activeClassName={"pagination__link--active"}
 />
</div>;

 const Loading = <div className="centerLoader"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div>

 const load = error ? <Error/> : Loading

 const view = loading || data.length===0 ? load : actualContent;



  return view;
}

export default App;
