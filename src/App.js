
import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import Body from './components/body/Body'
import PillContainer from './components/pillContainer/PillContainer'
import VertifyAge from './components/vertifyAge/vertifyAge'
import { useApolloClient, useLazyQuery } from '@apollo/client' 
import {useState, useRef, useEffect } from 'react'
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
    //console.log("SELECTED_FILTERS in BUILD_QUERY: ", filters)

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

export const PAGE_LIMIT = 10
export const TIMEOUT = 3000

///////////////////////////////////////////////////////////////
export const starting_filters = { category: [], brands: [], stores: [], sort_by : "NONE" }
const starting_query = { input: {limit: PAGE_LIMIT, sort_by:"NONE" } }


function App( {SHOW_DOB_POPUP} ) {

 const client = useApolloClient()

 const [getProducts, { loading, error, data,fetchMore }] = useLazyQuery(GET_SORTED_PRODUCTS);

 //run once upon app load
 useEffect(() => {
  getProducts({ 
    variables: {  ...starting_query  } , 
    notifyOnNetworkStatusChange: true, }, 
    {fetchPolicy: 'cache-first', nextFetchPolicy: 'cache-first', })
  },[] );

  //const { SHOW_DOB_POPUP } = env_configs
  console.log("/////// APP RERENDER ///////")

  //const cardScroll = useRef(null); REFS ONLY WORK WITH CLASSES (BECAUSE THEY HAVE INSTANCES?) https://reactjs.org/docs/refs-and-the-dom.html

  const [selected_filters, setFilters] = useState(starting_filters);

  const timer = useRef(null)

  const setAndRefetch = (selected_filters = starting_filters, timeout = TIMEOUT) => {

    console.log("SELECTED_FILTERS: ", selected_filters)
    setFilters(selected_filters)
    
    if(timer.current && (Date.now() - timer.current.time <= TIMEOUT)) 
      clearTimeout(timer.current.time_out)

      timer.current = {time: Date.now(), time_out: setTimeout(() =>{
      console.log("EXECUTING TIMEOUT SELECTED_FILTERS: ", selected_filters)  
    //https://reactpatterns.js.org/docs/accessing-a-child-component
    //call a method on child to invoke this method
      document.getElementById('cardContainer').scroll({top:0});

      getProducts({ 
        variables: {  ...buildAtlasGQLQuery(selected_filters) } , 
        notifyOnNetworkStatusChange: true, }, 
        {fetchPolicy: 'cache-first', nextFetchPolicy: 'cache-first', })

      timer.current = null
    }, timeout)}
}

const selected_filters_handlers = {
    selected_filters,
    setAndRefetch,
}

const query ={
  fetchMore,
  loading, 
  error, 
  data
}





//const g = component => {cardScroll = component }
//ref={cardScroll}
  return (
      <div className="page">
          <VertifyAge enabled={SHOW_DOB_POPUP}/>
          <div className="app">     
            <Header refetch={selected_filters_handlers}/>
            <div>
              <PillContainer selected_filters_handlers={selected_filters_handlers} />
            </div>      
            <Body query={query} selected_filters_handlers={selected_filters_handlers}/> 
            <Footer refetch={selected_filters_handlers}/>
          </div>
      </div>
  );
}

export default App;




  /*

  function handleRemove(filter_key){ //this closure returns a function with the selected_category key already set by the parent Footer component
  return pill_str =>
  setAndRefetch({ 
    ...selected_filters,
    [filter_key]: selected_filters[filter_key].filter( str => str !== pill_str)})}

   <PillList pills={category} handleRemove={handleRemove(FILTER_KEYS.CATEGORIES)} dec_str={""}/>
            <PillList pills={brands} handleRemove={handleRemove(FILTER_KEYS.BRANDS)} dec_str={""} />
            <PillList pills={stores} handleRemove={handleRemove(FILTER_KEYS.STORES)} dec_str={""} />

function PillList( {pills, handleRemove, dec_str} ) {
  const insertWhitespace = num => new Array(num).fill('\u00A0', 0, num).join('')
  return (<div>
    {//pills?.length > 0 && <>{dec_str}: {insertWhitespace(2)}</>
    } 
        {pills.map( (str, idx)=> <Pill key={idx} str={str} removePill={handleRemove}/>)}
        </div>);
}

function Pill( {str, removePill} ) { 
  return (<div className="pill"> {str}&nbsp;
      <span className="pill_close_container" onClick={ e => removePill(str) }>
        &#x00d7;
      </span>
  </div>); }

  const cachedData = useApolloClient().readQuery({
    query: GET_SORTED_PRODUCTS,
    variables: { ...starting_filters, ...starting_query},
  });
  */

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

