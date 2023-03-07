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

        return { //unpack each search type by respective tag_name, filter for tags over a certain #, and sort the results from most linked products to least
            category_tags: orderTagsByProductCount( filterTagsByMinProductCount ( findTagsByTagType(tagmetadata, "CATEGORIES"))),
            brands_tags:   orderTagsByProductCount( filterTagsByMinProductCount ( findTagsByTagType(tagmetadata, "BRANDS"), MIN_ITEM_COUNT)),
            stores_tags:   orderTagsByProductCount( filterTagsByMinProductCount ( findTagsByTagType(tagmetadata, "STORES"))) 
        }
    }

    //closure which references the selected_filters key (catories/stores/brands) and updates the selected_filters by a filter_tag
        const onFilterTagSelected = filter_key => 
            filter_tag => setAndRefetch({ 
                ...selected_filters,
                //[filter_key]: category === selected_filters[filter_key] ? [] : [filter_tag] // use this to limit a filter to a single search tag
                [filter_key]: selected_filters[filter_key].includes(filter_tag) ? 
                    selected_filters[filter_key].filter( str => str !== filter_tag) : 
                    [...selected_filters[filter_key], filter_tag] 
        })
        
    return [
        filter_tags,
        selected_filters,
        loading,
        error,
      {
        onFilterTagSelected
      }
    ]
}