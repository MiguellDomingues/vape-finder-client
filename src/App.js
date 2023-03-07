
import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import Body from './components/body/Body'
import VertifyAge from './components/vertifyAge/vertifyAge'
import { useQuery, useApolloClient, } from '@apollo/client' 
import {useState} from 'react'
import { GET_SORTED_PRODUCTS } from './queries/queries.js'

import './app.css'

//CONSTANTS///////////////////////////////////////////////////////////
export const SORT_TYPE = {
  NONE: "NONE",
  ASC: "ASC",
  DESC: "DESC"
}

export const FILTER_KEYS = {
  CATEGORIES: "category",
  BRANDS: "brands",
  STORES: "stores"
}

export function buildAtlasGQLQuery(filters = {}, sorting = {} ){
    console.log("SELECTED_FILTERS in BUILD_QUERY: ", filters)

    const input = {}

    if(filters.category?.length > 0) input["categories"] = [...filters.category]
    if(filters.brands?.length > 0)   input["brands"] = [...filters.brands]
    if(filters.stores?.length > 0)   input["stores"] = [...filters.stores]
    if(filters.sort_by)              input["sort_by"] = filters.sort_by

    if(sorting.last_product_ids?.length > 0) input["last_product_ids"] = sorting.last_product_ids  
    if(sorting.last_product_price)           input["last_product_price"] = sorting.last_product_price

    input["limit"] = PAGE_LIMIT

    console.log("QUERY: ", {input: input})

    return {input}
  }

export const PAGE_LIMIT = 5
///////////////////////////////////////////////////////////////
const starting_filters = { category: [], brands: [], stores: [], sort_by : "NONE" }
const starting_query = { input: {limit: PAGE_LIMIT } }


function App( {SHOW_DOB_POPUP} ) {

  //const { SHOW_DOB_POPUP } = env_configs
  console.log("/////// APP RERENDER ///////")

  //const cardScroll = useRef(null); REFS ONLY WORK WITH CLASSES (BECAUSE THEY HAVE INSTANCES?) https://reactjs.org/docs/refs-and-the-dom.html

  const [selected_filters, setFilters] = useState(starting_filters);
  
  const query = useQuery(GET_SORTED_PRODUCTS, { variables: { ...starting_filters, ...starting_query}, 
    notifyOnNetworkStatusChange: true, }, 
  {
    fetchPolicy: 'cache-first', 
    nextFetchPolicy: 'cache-first', 
  });

  const setAndRefetch = (selected_filters = starting_filters) => {

    console.log("SELECTED_FILTERS: ", selected_filters)
    setFilters(selected_filters) 
    
    //https://reactpatterns.js.org/docs/accessing-a-child-component
    //call a method on child to invoke this method
    document.getElementById('cardContainer').scroll({top:0});
    query.refetch( {...selected_filters, ...buildAtlasGQLQuery(selected_filters) } ) 
}

const selected_filters_handlers = {
    selected_filters,
    setAndRefetch,
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

