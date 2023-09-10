
import { useApolloClient, useLazyQuery, useQuery } from '@apollo/client' 
import {useState, useRef, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive';
import  useFilterHistory  from './useFilterHistory';
import { GET_SORTED_PRODUCTS,GET_SEARCH_TYPES  } from '../gql/queries.js'

import { starting_query, starting_filters, TIMEOUT, buildAtlasGQLQuery } from '../utils.js'

function useApp() {

    const client = useApolloClient()  
    const [current_filter_name, filter_history,{ setHistory, restoreFiltersFromHistory, filterHistoryToCollapsibleMenu }] = useFilterHistory(setAndRefetch) //setAndRefetch redefined as a function below
    const [selected_filters, setFilters] = useState(starting_filters);
      
    //debouncing timer ref
    // see https://reactjs.org/docs/refs-and-the-dom.html for more info about refs
    const timer = useRef(null)

    const [getProducts, { loading, error, data, fetchMore }] = useLazyQuery(GET_SORTED_PRODUCTS, { onCompleted: result => setHistory(selected_filters) });

    const filter_tags_query = useQuery(GET_SEARCH_TYPES,  { variables: { query: {} } } ); //fetch the tags used for filtering
    const isMobile = useMediaQuery({ minWidth: 0, maxWidth: 481 });

     //run once upon app load
    useEffect(() => {
      getProducts({ 
        variables: {  ...starting_query  } , 
        notifyOnNetworkStatusChange: true, }, 
        {fetchPolicy: 'cache-first', nextFetchPolicy: 'cache-first', })
    },[] );

    console.log("/////// APP RERENDER ///////")
    
    //update the filters and set a timer to execute query with those filters
    function setAndRefetch (selected_filters = starting_filters){
      
      const isQueryResultCached = (_selected_filters) =>{   
        return client.readQuery({ query: GET_SORTED_PRODUCTS, variables: {  ...buildAtlasGQLQuery(_selected_filters) } }) !== null
      }

      const timeout = isQueryResultCached(selected_filters) ? 0 : TIMEOUT //if the users query is in the cache, eliminate the debounce time
    
      setFilters(selected_filters)
        
      //if the user selected a filter while a current timer is still counting down, clear the timer
      if(timer.current && (Date.now() - timer.current.time <= TIMEOUT)){
        clearTimeout(timer.current.time_out)
      }
        
     
      timer.current = {time: Date.now(), time_out: setTimeout(() =>{//set the query to execute when the debounce timer has counted down
        console.log("EXECUTING TIMEOUT SELECTED_FILTERS: ", selected_filters)  

        document?.getElementById('cardContainer')?.scroll({top:0, behavior: 'smooth'});  //scroll the cardlist back to top

        getProducts(
          {variables: {  ...buildAtlasGQLQuery(selected_filters) } , 
          notifyOnNetworkStatusChange: true, 
          onCompleted: result => setHistory(selected_filters)}, 
          {fetchPolicy: 'cache-first', nextFetchPolicy: 'cache-first'}
        )
      
        timer.current = null // clear the timer 

      }, timeout)}
    }
    
    const history = { current_filter_name, filter_history, restoreFiltersFromHistory, filterHistoryToCollapsibleMenu}
    const selected_filters_handlers = { selected_filters, setAndRefetch } 
    const query = {fetchMore, loading, error, data, debounced_query_counting_down: !!timer.current}

    return [
        selected_filters_handlers,
        filter_tags_query, 
        history,
        query,
        isMobile,
      ]
}

export default useApp

