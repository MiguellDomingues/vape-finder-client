
import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import Body from './components/body/Body'
import VertifyAge from './components/vertifyAge/vertifyAge'
import { useQuery, useApolloClient, } from '@apollo/client' 
import {useState} from 'react'

import { GET_PRODUCTS, GET_SORTED_PRODUCTS } from './queries/queries.js'

import './app.css'

export const SORT_TYPE = {
  NONE: "_ID_ASC",
  ASC: "PRICE_ASC",
  DESC: "PRICE_DESC"
}

const starting_filters = { category: "", brands: [], stores: [], sort_by : "NONE" }
export const PAGE_LIMIT = 20

function App( {SHOW_DOB_POPUP} ) {

  //const { SHOW_DOB_POPUP } = env_configs
  console.log("/////// APP RERENDER ///////")

  function buildAtlasGQLQuery(filters = {}, last_product_id = null){

    const query = {}
    if(last_product_id) query["_id_gt"] = last_product_id
    if(filters.category?.length > 0) query["categories_in"] = [filters.category]
    if(filters.stores?.length > 0)   query["source_in"] = [...filters.stores]
    if(filters.brands?.length > 0)   query["brand_in"] = [...filters.brands]

    // if the filters object contains the sort_by key, and the key is not an empty string, and the key is a valid string
    //  set sort_by to filter.sort_by
    //  otherwise, set sort_by to "NONE" (default value)
    const sort_by = filters.sort_by?.length > 0 && Object.keys(SORT_TYPE).includes(filters.sort_by) ? filters.sort_by : "NONE"
 
    return { 
      query: query, 
      limit: PAGE_LIMIT, 
      sortBy: SORT_TYPE[sort_by], 
    }
  }

  //const cardScroll = useRef(null); REFS ONLY WORK WITH CLASSES (BECAUSE THEY HAVE INSTANCES?) https://reactjs.org/docs/refs-and-the-dom.html

  
  //const query_2 = useQuery(GET_SORTED_PRODUCTS, { variables: { input: {} } } ) 

  //const { data, loading, error } = query_2

  //console.log("q2: ", data, loading, error)

  const [selected_filters, setFilters] = useState(starting_filters);
  
  const query = useQuery(GET_PRODUCTS, { variables: { ...starting_filters, ...buildAtlasGQLQuery()}, 
    notifyOnNetworkStatusChange: true, }, 
  {
    fetchPolicy: 'cache-first', 
    nextFetchPolicy: 'cache-first', 
  });

  const setAndRefetch = (selected_filters = starting_filters) => {

    console.log("SELECTED_FILTERS: ", selected_filters)
    //console.log("QUERY: ", {query: buildAtlasGQLQuery(selected_filters), limit: 11})
    setFilters(selected_filters) 
    
    //https://reactpatterns.js.org/docs/accessing-a-child-component
    //call a method on child to invoke this method
    document.getElementById('cardContainer').scroll({top:0});
   
/*
    result = client.refetchQueries({
      include: [GET_PRODUCTS],
      updateCache(cache) {
        console.log("update cache()")
      },
    
      onQueryUpdated(observableQuery, diff, lastDiff) {
        // Logging and/or debugger breakpoints can be useful in development to
        // understand what client.refetchQueries is doing.
        console.log(`Examining ObservableQuery `, observableQuery);
        console.log(`diff `, diff);
        console.log(`lastDiff `, lastDiff);

        const cache2 = client.readQuery({
      query: GET_PRODUCTS ,
      variables: {...selected_filters},
       });

        console.log("CACHE QUERY: ", cache2)
        
    
        // Proceed with the default refetching behavior, as if onQueryUpdated
        // was not provided.
        return true;
      },
    })
    */
    query.refetch( {...selected_filters, ...buildAtlasGQLQuery(selected_filters, null) } ) 
}

const selected_filters_handlers = {
    selected_filters,
    setAndRefetch,
    buildAtlasGQLQuery
}

console.log("///selected filters: ", selected_filters)

//const g = component => {cardScroll = component }
//ref={cardScroll}
  return (
      <div className="page">
          <VertifyAge enabled={SHOW_DOB_POPUP}/>
          <div className="app">     
            <Header refetch={selected_filters_handlers}/>
            <Body query={query} selected_filters_handlers={selected_filters_handlers}/> 
            <Footer refetch={selected_filters_handlers}/>
          </div>
      </div>
  );
}

export default App;

