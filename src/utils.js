
export const SORT_TYPE = {
    NONE: "NONE",
    ASC: "ASC",
    DESC: "DESC"
  }

  export const ATLAS_INFO = {
    URI:  process.env.REACT_APP_URI  || "", 
    APP_ID: process.env.REACT_APP_APP_ID || "",
  }

  export const EMAILJS_INFO = {
    SERVICE_ID:  process.env.REACT_APP_SERVICE_ID  || "", 
    TEMPLATE_ID: process.env.REACT_APP_TEMPLATE_ID || "",
    PUBLIC_KEY:  process.env.REACT_APP_PUBLIC_KEY  || "" 
  }

  export const FILTER_KEYS = {
    CATEGORIES: "category",
    BRANDS: "brands",
    STORES: "stores"
  }

  export const PAGE_URIS = {
    HOME: "/",
    ABOUT: "/about",
    CONTACT: "/contact"
  }

  export const APOLLO_GQL_KEYS = {
    PRODUCTS: 'getSortedProducts',
    TAG_METADATA: 'tagmetadata'
  }

  export const PAGE_LIMIT = 13
  export const TIMEOUT = 3000
  
  export const starting_filters = { category: [], brands: [], stores: [], sort_by : "NONE" }
  export const starting_query = { input: {limit: PAGE_LIMIT, sort_by:"NONE" } }

  export const MIN_AGE = 19
  export const STORAGE_KEY = 'BC_VAPE_FINDER'

  //convert client filters object into object consumed by gql endpoint
  export function buildAtlasGQLQuery(filters = {}, sorting = {} ){

    // sort the arrays on filter keys before converting to a request query
    // since apollo cache keys are order-sensitive
    // this would prevent redundant queries in the case of filters = A:{a,b}, filters = A:{b,a}
    function copyAndSortFilters(filters){
      return{ //copy the original source arrays before sorting
        category: [...filters.category].sort(),
        brands: [...filters.brands].sort(),
        stores: [...filters.stores].sort(),
        sort_by: filters.sort_by
      }
    }

      const sorted_filters = copyAndSortFilters(filters)

      //console.log(" PRESORTED SELECTED_FILTERS in BUILD_QUERY: ", filters)
      //console.log(" SORTED SELECTED_FILTERS in BUILD_QUERY: ", sortFilters(filters))
     
      const input = {}
  
      if(sorted_filters.category?.length > 0) input["categories"] = [...sorted_filters.category] 
      if(sorted_filters.brands?.length > 0)   input["brands"] = [...sorted_filters.brands]
      if(sorted_filters.stores?.length > 0)   input["stores"] = [...sorted_filters.stores]
      if(sorted_filters.sort_by)              input["sort_by"] = sorted_filters.sort_by
  
      if(sorting.last_product_ids?.length > 0) input["last_product_ids"] = sorting.last_product_ids  
      if(sorting.last_product_price)           input["last_product_price"] = sorting.last_product_price
  
      input["limit"] = PAGE_LIMIT
  
      //console.log("QUERY: ", {input: input})
  
      return {input}
  }
  