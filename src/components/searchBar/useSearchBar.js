import { useQuery } from '@apollo/client' 
import { GET_SEARCH_TYPES } from '../../queries/queries.js'

export const useSearchBar = ( selected_filters_handlers  ) =>{

    const { selected_filters, setAndRefetch } = selected_filters_handlers 

    const query = useQuery(GET_SEARCH_TYPES);

    const orderTagsByProductCount = (tags) => tags.sort( (lhs, rhs)=> rhs.product_count-lhs.product_count)
    const filterTagsByMinProductCount = (tags, min_product_count = 0) => tags.filter((tag) => tag.product_count >= min_product_count)
    const selectedFilterBGC = (str, arr) => arr.includes(str) ? " filter_selected" : "" 
  
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
    
    const { data, loading, error } = query

    //console.log("////", data, loading, error)

    const filter_tags = {
        category_tags : !loading && !error ? orderTagsByProductCount( filterTagsByMinProductCount (data["getSearchTypes"][0].tags)) : [],
        brands_tags : !loading && !error ? orderTagsByProductCount( filterTagsByMinProductCount (data["getSearchTypes"][1].tags, 5)) : [],
        stores_tags : !loading && !error ? orderTagsByProductCount( filterTagsByMinProductCount (data["getSearchTypes"][2].tags)) : []
    }

    const echo = () => console.log("////SEARCH BAR: ", selected_filters)

    //echo()
    
    return [
        filter_tags,
        selected_filters,
        loading,
        error,
      {
        selectedFilterBGC,
        onCategorySelected,
        onStoreSelected,
        onBrandSelected 
      }
    ]
}