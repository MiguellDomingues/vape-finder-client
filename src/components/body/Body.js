import './body.css'
import { useRef } from 'react'
import CardList from '.././cardList/CardList.js'
import SideBar from '.././sideBar/SideBar.js'
//import { SORT_TYPE } from '../../App.js';

function Body( {query, selected_filters_handlers} ) {

  //remember, to use refs on DOM elements, the ref needs to be at the begining of the element:
  // <select ref={ref name}
  //used for keeping track of pagination
  const last_product_id = useRef(null)

  const setLPID = (lpid) => last_product_id.current = lpid //update the ref with the id of the last item on the current page

  return(
    <main className="body"> 
      <SideBar selected_filters_handlers={selected_filters_handlers} setLPID={setLPID} />
      <CardList
        setLPID={setLPID}
        lpid={last_product_id}
        query={query}
        selected_filters_handlers={selected_filters_handlers}/>
    </main>
  );
}

export default Body;