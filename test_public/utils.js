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
  
  //I NEED TO STORE THE STRINGS FOR EACH KEY ALPHABETICALLY?
  //BUG: category["a", "b"] is the same as ["b", "a"], but they invoke new fetches because order is different
  // can i use client-side only variables in apollo to fix this?
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
  
  export const PAGE_LIMIT = 11
  export const TIMEOUT = 3000
  
  ///////////////////////////////////////////////////////////////
  export const starting_filters = { category: [], brands: [], stores: [], sort_by : "NONE" }
  export const starting_query = { input: {limit: PAGE_LIMIT, sort_by:"NONE" } }