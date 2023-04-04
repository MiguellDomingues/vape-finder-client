
import { useApolloClient, useLazyQuery, useQuery } from '@apollo/client' 
import {useState, useRef, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive';
import { GET_SORTED_PRODUCTS,GET_SEARCH_TYPES  } from '../queries/queries.js'

import { starting_query, starting_filters, TIMEOUT, buildAtlasGQLQuery, STORAGE_KEY } from '../utils.js'

function useApp(_show_dob_popup) {

     //const client = useApolloClient()
    
     const [getProducts, { loading, error, data, fetchMore }] = useLazyQuery(GET_SORTED_PRODUCTS);

     const filter_tags_query = useQuery(GET_SEARCH_TYPES,  { variables: { query: {} } } );


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

      const [show_dob_popup, setShow] = useState( (!localStorage.getItem(STORAGE_KEY) && _show_dob_popup) )
    
      const timer = useRef(null)
      //const last_product_id = useRef(null)
    
      //const setLPID = (lpid) => last_product_id.current = lpid //update the ref with the id of the last item on the current page
    
      const setAndRefetch = (selected_filters = starting_filters, timeout = TIMEOUT) => {
    
        //console.log("SELECTED_FILTERS: ", selected_filters)
        setFilters(selected_filters)
        
        if(timer.current && (Date.now() - timer.current.time <= TIMEOUT)) 
          clearTimeout(timer.current.time_out)
    
          timer.current = {time: Date.now(), time_out: setTimeout(() =>{
          console.log("EXECUTING TIMEOUT SELECTED_FILTERS: ", selected_filters)  
        //https://reactpatterns.js.org/docs/accessing-a-child-component
        //call a method on child to invoke this method
          document?.getElementById('cardContainer')?.scroll({top:0});
    
         // const cache2 = client.readQuery({
          //  query: GET_SORTED_PRODUCTS ,
           //  variables: { ...buildAtlasGQLQuery(selected_filters) },
           //  });
      
           //   console.log("CACHE QUERY: ", cache2)
    
          getProducts({ 
            variables: {  ...buildAtlasGQLQuery(selected_filters) } , 
            notifyOnNetworkStatusChange: true, }, 
            {fetchPolicy: 'cache-first', nextFetchPolicy: 'cache-first', })
    
          timer.current = null
        }, timeout)}
    }
    
    //const ageVertified = show_dob_popup => !localStorage.getItem(STORAGE_KEY) && show_dob_popup
    
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
    
    return [
        selected_filters_handlers,
        filter_tags_query, 
        query,
        show_dob_popup,{
            closeDOBPopup: save_validation => {
              save_validation && localStorage.setItem(STORAGE_KEY, true);
              setShow(false) }
    }]
}

export default useApp

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
