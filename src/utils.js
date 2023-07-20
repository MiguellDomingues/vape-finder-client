
  //config info for realm API
  export const ATLAS_INFO = {
    URI:  process.env.REACT_APP_URI  || "", 
    APP_ID: process.env.REACT_APP_APP_ID || "",
  }

  //config info for emailjs API
  export const EMAILJS_INFO = {
    SERVICE_ID:  process.env.REACT_APP_SERVICE_ID  || "", 
    TEMPLATE_ID: process.env.REACT_APP_TEMPLATE_ID || "",
    PUBLIC_KEY:  process.env.REACT_APP_PUBLIC_KEY  || "" 
  }

  //possible inputs for sort_by: on the filter object
  export const SORT_TYPE = {
    NONE: "NONE",
    ASC: "ASC",
    DESC: "DESC"
  }

  //the key names on the client filter object
  export const FILTER_KEYS = {
    CATEGORIES: "category",
    BRANDS: "brands",
    STORES: "stores"
  }

  //the route names for client side routing  
  export const PAGE_URIS = {
    HOME: "/",
    ABOUT: "/about",
    CONTACT: "/contact"
  }

  //the string names of the resolved queries on backend
  export const APOLLO_GQL_KEYS = {
    PRODUCTS: 'getSortedProducts',
    TAG_METADATA: 'tagmetadata'
  }

  //configs for product images (enable to avoid fetching original images from source vendor CDNs)
  export const PRODUCT_IMG_CONFIG = {
    USE_PLACEHOLDER: false,
    PLACEHOLDER_PATH: '/demo.webp'
  }

  //number of results returned per query (max 100)
  export const PAGE_LIMIT = 13

  //time (in ms )that must pass without user selecting filters before query is executed
  export const TIMEOUT = 3000
  
  //UI state of the search filters upon app load
  export const starting_filters = { category: [], brands: [], stores: [], sort_by : "NONE" }

  //the query sent to backend upon app load
  export const starting_query = { input: {limit: PAGE_LIMIT, sort_by:"NONE" } }

  export const ENABLE_DOB_POPUP = true

  //minimum legal age to visit product websites
  export const MIN_AGE = 19

  //key for browser storage
  export const STORAGE_KEY = 'BC_VAPE_FINDER'

  /*
  convert client filter state into a request object consumed by gql resolver

  input:
    filters = {category: [...], brands: [...], stores: [...], sort_by: "..." }
    sorting = { last_product_ids: [...], last_product_price: "..."}

  return: 
  
  { 
    last_product_ids = [Id1, Id2,...], 
    last_product_price = Double
    sort_by = Str
    limit = Int,
    categories = [Str1, Str2,...],
    brands = [Str1, Str2,...],
    stores = [Str1, Str2,...],
  }
  */
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
  