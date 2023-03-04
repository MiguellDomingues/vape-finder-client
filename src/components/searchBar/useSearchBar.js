import { useQuery } from '@apollo/client' 
import { GET_SEARCH_TYPES } from '../../queries/queries.js'

const MIN_ITEM_COUNT = 5

export const useSearchBar = ( selected_filters_handlers  ) =>{

    const { selected_filters, setAndRefetch } = selected_filters_handlers 

    const query = useQuery(GET_SEARCH_TYPES,  { variables: { query: {} } } );

    const { data, loading, error } = query

    const filter_tags = !loading && !error ? { ...parseFilterTags(data.tagmetadata) } : { category_tags: [], brands_tags: [], stores_tags:[] } 

    function parseFilterTags(tagmetadata){

        const orderTagsByProductCount = (tags) => tags.sort( (lhs, rhs)=> rhs.product_count-lhs.product_count)
        const filterTagsByMinProductCount = (tags, min_product_count = 0) => tags.filter((tag) => tag.product_count >= min_product_count)
        const findTagsByTagType = (tagmetadata, type_name) => tagmetadata.find( t => t.type_name === type_name).tags

        return {
            category_tags: orderTagsByProductCount( filterTagsByMinProductCount ( findTagsByTagType(tagmetadata, "CATEGORIES"))),
            brands_tags:   orderTagsByProductCount( filterTagsByMinProductCount ( findTagsByTagType(tagmetadata, "BRANDS"), MIN_ITEM_COUNT)),
            stores_tags:   orderTagsByProductCount( filterTagsByMinProductCount ( findTagsByTagType(tagmetadata, "STORES"))) 
        }
    }
  
    const onCategorySelected = category => 
        setAndRefetch({ 
            ...selected_filters,
            category: category === selected_filters.category ? "" : category 
        })
    
    const onStoreSelected = store => 
        setAndRefetch({ 
            ...selected_filters,
            stores: selected_filters.stores.includes(store) ? selected_filters.stores.filter( str => str !== store) : [...selected_filters.stores, store]
        })     
    
    const onBrandSelected = brand => 
        setAndRefetch({ 
            ...selected_filters,
            brands: selected_filters.brands.includes(brand) ? selected_filters.brands.filter( str => str !== brand) : [...selected_filters.brands, brand]
        })   
    
    return [
        filter_tags,
        selected_filters,
        loading,
        error,
      {
        onCategorySelected,
        onStoreSelected,
        onBrandSelected 
      }
    ]
}

/*

this jfiddle demonstrates how to use a single handler for updating category/brands/stores
wrap var containing the key name in object to extract key name

const b = {
	z: [],
	b: ["b", "c"],
	c: ["d", "e"]
}

const exclusive = (input, key) => b[key].includes(input) ? [] : [input]
const inclusive = (input, key) => b[key].includes(input) ? b[key].filter( str => str !== input) : [...b[key], input]

const a = (varName,input, multi_select = false)=>{

  const key = Object.keys(varName).pop()
  
  const c = {
  ...b,
  }
  
  c[key] = !multi_select ? exclusive(input, key) : inclusive(input, key) 
  console.log(c)
  
	
}

let z = "c"

a({z}, z, false)

*/