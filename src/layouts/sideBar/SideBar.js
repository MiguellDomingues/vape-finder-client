
import { SORT_TYPE } from '../../App.js';
import SearchBar from '.././searchBar/SearchBar.js'

import './sideBar.css'

function SideBar({selected_filters_handlers, setLPID}){

    return(<div className="sidebar">
      <SearchBar selected_filters_handlers={selected_filters_handlers}/>
      <SortByDropDown selected_filters_handlers={selected_filters_handlers} setLPID={setLPID}/>
    </div>)
}

export default SideBar
  
function SortByDropDown({selected_filters_handlers, setLPID})  {
  
const {setAndRefetch, selected_filters} = selected_filters_handlers
  
    const sortSelected = (e) => { 
      console.log(e.target.value)
      selected_filters.sort_by = e.target.value
      setLPID(null)
      setAndRefetch({...selected_filters})
    }
  
    return(<div>
      Sort By:
      <select className='dropdown' onChange={sortSelected} value={selected_filters.sort_by} >
              <option value={SORT_TYPE.NONE}>None</option>
              <option value={SORT_TYPE.DESC}>Price: High to Low</option>
              <option value={SORT_TYPE.ASC}>Price: Low to High</option>
      </select>
    </div>)
}
  