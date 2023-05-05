import {useState} from 'react'
import { starting_filters, } from '../utils.js'

function useFilterHistory(setAndRefetch){

  //console.log(" TESTING REFERENCE TO FUNC ", setAndRefetch)

  const [current_filter_name, setCurrentFilterName] = useState(["0"]);
  const [filter_history, setFilterHistory] = useState([{query_name: "0", query: starting_filters}]);

  function filterHistoryToCollapsibleMenu(){
    return filter_history.map( (entry) => { return {tag_name: entry.query_name, product_count: ""}})
  }

  function restoreFiltersFromHistory(query_name){
    //check ORIGINAL prev queries list to link by query name
    const entry = filter_history.find( (entry)=> entry.query_name === query_name )
   
    if(entry)  setAndRefetch(entry.query)
    else       console.log("////////ERROR IN useFilterHistory/RESTOREFILTERSFROMHISTORY: no matching filter found /////////////")    
  }

  function setHistory(selected_filters){
       
    const searchFilterHistory = (filters) =>{
            const toStringArr = (filters) => [...filters.category, ...filters.brands, ...filters.stores, filters.sort_by].sort()

            const compareFilters = (target) => 
                (filter_obj) => {
                    const source = toStringArr(filter_obj.query) //
                    if(source.length !== target.length) return false //check = length
              
                    for(let i = 0; i < target.length; i++){  //for each string in target
                      if(source[i] !== target[i])            //check strings at ith index on both target and src
                          return false                       //if theyre not equal, move to next entry in filter_history
                    }
                return true
            }

            return filter_history.find(compareFilters(toStringArr(filters)))
    }

    const filter_history_entry = searchFilterHistory(selected_filters)

    if(filter_history_entry){
      setCurrentFilterName([filter_history_entry.query_name])                                   //set current filter name
    }else{
      const query_name = (filter_history.length).toString()                                     //create the query name
      setFilterHistory([{query_name: query_name, query: selected_filters}, ...filter_history])  //shallow copy and add new history to head of list
      setCurrentFilterName([query_name])                                                        //update current filter name
    }
  }

  return [current_filter_name, filter_history,{ setHistory, restoreFiltersFromHistory, filterHistoryToCollapsibleMenu }]
}

export default useFilterHistory

