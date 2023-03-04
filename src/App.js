
import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import Body from './components/body/Body'
import VertifyAge from './components/vertifyAge/vertifyAge'
import { useQuery, useApolloClient, } from '@apollo/client' 
import {useState} from 'react'

import { GET_PRODUCTS } from './queries/queries.js'

import './app.css'

const starting_filters = { category: "", brands: [], stores: [] }
export const PAGE_LIMIT = 20

function App( {SHOW_DOB_POPUP} ) {

  //const { SHOW_DOB_POPUP } = env_configs
  console.log("/////// APP RERENDER ///////")

  function buildAtlasGQLQuery(filters = {}, last_product_id = null, sort_by = "_ID_ASC"){

    const query = {}
    if(last_product_id) query["_id_gt"] = last_product_id
    if(filters.category?.length > 0) query["categories_in"] = [filters.category]
    if(filters.stores?.length > 0)   query["source_in"] = [...filters.stores]
    if(filters.brands?.length > 0){
      const brand_in = { brand_in: [...filters.brands]}
      query["product_info"] = brand_in
    }   

    return { query, limit: PAGE_LIMIT, sortBy: sort_by }
  }

  //const cardScroll = useRef(null); REFS ONLY WORK WITH CLASSES (BECAUSE THEY HAVE INSTANCES?) https://reactjs.org/docs/refs-and-the-dom.html

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
    query.refetch( {...selected_filters, ...buildAtlasGQLQuery(selected_filters) } ) 
}

const selected_filters_handlers = {
    selected_filters,
    setAndRefetch,
    buildAtlasGQLQuery
}

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

