import './body.css'
import { useRef } from 'react'
import CardList from '.././cardList/CardList.js'
import SearchBar from '.././searchBar/SearchBar.js'
import { SORT_TYPE } from '../../App.js';

function Body( {query, selected_filters_handlers} ) {

  let { loading, error, data,fetchMore } = query

  const {setAndRefetch, selected_filters} = selected_filters_handlers

  //remember, to use refs on DOM elements, the ref needs to be at the begining of the element:
  // <select ref={ref name}
  const last_product_id = useRef(null)

  console.log("data: ", data)
  console.log("loading: ", loading)

  const sortSelected = (e) => { 
    console.log(e.target.value)
    selected_filters.sort_by = e.target.value
    last_product_id.current = "" //
    setAndRefetch({...selected_filters})
  }

  const setLPID = (lpid) => last_product_id.current = lpid

  return(
    <main className="body">
      {////to be moved into a seperate component
      }
      <div className="filter_sidebar">

        <SearchBar selected_filters_handlers={selected_filters_handlers}/>
        <select className='dropdown' onChange={sortSelected} value={selected_filters.sort_by }>
            <option value={SORT_TYPE.NONE}>None</option>
            <option value={SORT_TYPE.DESC}>Price: High to Low</option>
            <option value={SORT_TYPE.ASC}>Price: Low to High</option>
        </select>

      </div>
      {error && <>Error! {error.message}</>}
      <CardList
        setLPID={setLPID}
        lpid={last_product_id}
        products={data ? data.getSortedProducts : []} 
        fetchMore={fetchMore} 
        loading={loading} 
        selected_filters_handlers={selected_filters_handlers}/>
    </main>
  );
}

export default Body;

