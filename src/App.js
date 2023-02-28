
import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import Body from './components/body/Body'
import VertifyAge from './components/vertifyAge/vertifyAge'
import { useQuery, useApolloClient } from '@apollo/client' 
import {useState, useRef} from 'react'

import { GET_PRODUCTS } from './queries/queries.js'

import './app.css'

const starting_filters = { category: "", brands: [], stores: [] }
const SHOW_DMY_OVERLAY = false

function App() {

  console.log("/////// APP RERENDER ///////")

  //const cardScroll = useRef(null); REFS ONLY WORK WITH CLASSES (BECAUSE THEY HAVE INSTANCES?) https://reactjs.org/docs/refs-and-the-dom.html

  const [selected_filters, setFilters] = useState(starting_filters);
  const client = useApolloClient()
 
  const query = useQuery(GET_PRODUCTS, { variables: { last_product_id: "", ...starting_filters }, 
    notifyOnNetworkStatusChange: true, }, 
  {
    fetchPolicy: 'cache-first', 
    nextFetchPolicy: 'cache-first', 
  });

  
  const setAndRefetch = (selected_filters = starting_filters) => {
    setFilters(selected_filters) 
    //https://reactpatterns.js.org/docs/accessing-a-child-component
    //call a method on child to invoke this method
    document.getElementById('cardContainer').scroll({top:0});
    //const childelement = cardScroll.current;
    //console.log("sssss",childelement)
   // console.log("sssss",cardScroll.current)
    //cardScroll.f()

    // ref={ }
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
    query.refetch({...selected_filters}) 
}

console.log("////APP: ", selected_filters)

const selected_filters_handlers = {
    selected_filters,
    setAndRefetch,
}

//const g = component => {cardScroll = component }
//ref={cardScroll}
  return (
      <div className="page">
          <VertifyAge enabled={SHOW_DMY_OVERLAY}/>
          <div className="app">     
            <Header refetch={selected_filters_handlers}/>
            <Body query={query}/> 
            <Footer refetch={selected_filters_handlers}/>
          </div>
      </div>
  );
}

export default App;

