import TrieSearch from 'trie-search';
import { useMemo } from 'react'
import { APOLLO_GQL_KEYS } from '../utils'

const MIN_ITEM_COUNT = 5

function useFilters( 
    { selected_filters, setAndRefetch }, //inline destructuring
    { data, loading, error } 
){

    const filter_tags = useMemo(() => {
        return !loading && !error ? { ...parseFilterTags(data[APOLLO_GQL_KEYS.TAG_METADATA]) } : { category_tags: [], brands_tags: [], stores_tags:[] } 
    }, [loading ,error, data]);

    const trie = useMemo(() => {
        return initTrieSearch(filter_tags)
    }, [filter_tags]);


    function initTrieSearch(filter_tags){

        //console.log("FILTER TAGS",filter_tags)

        const trie  = new TrieSearch("tag_name");

        //add an entry to the trie by tag_name, linking it with the tag_name, type, and product count
        const initTrieByTagType = (type) => (tag) => trie.add({tag_name: tag.tag_name, type: type.split("_")[0], product_count: tag.product_count})

        Object.keys(filter_tags).forEach( //for each filter tag type, (category/brands/stores_tags)
            (key)=> filter_tags[key].forEach( //for each filter tag
                initTrieByTagType(key)))        //add the filter tag to the trie

        return trie
    }
       
  
    function parseFilterTags(tagmetadata){

        const orderTagsByProductCount = (tags) => tags.sort( (lhs, rhs)=> rhs.product_count-lhs.product_count)
        const filterTagsByMinProductCount = (tags, min_product_count = 0) => tags.filter((tag) => tag.product_count >= min_product_count)
        const findTagsByTagType = (tagmetadata, type_name) => tagmetadata.find( t => t.type_name === type_name).tags
        //console.log("----RUNNING PARSE FILTER TAGS---")
        return { //unpack each search type by respective tag_name, filter for tags over a certain # of products, and sort the results from most linked products to least
            category_tags: orderTagsByProductCount( filterTagsByMinProductCount ( findTagsByTagType(tagmetadata, "CATEGORIES"))),
            brands_tags:   orderTagsByProductCount( filterTagsByMinProductCount ( findTagsByTagType(tagmetadata, "BRANDS"), MIN_ITEM_COUNT)),
            stores_tags:   orderTagsByProductCount( filterTagsByMinProductCount ( findTagsByTagType(tagmetadata, "STORES"))) 
        }
    }

    //add or remove a filter tag from filter_key: either category, brands, or stores
    const onFilterTagSelected = filter_key => 
        filter_tag => 
            setAndRefetch({ 
                ...selected_filters, //shallow copy the references
                //[filter_key]: category === selected_filters[filter_key] ? [] : [filter_tag] // use this to limit a filter to a single search tag
                [filter_key]: selected_filters[filter_key].includes(filter_tag) ? //does the category/brand/store contain filter_tag?
                    selected_filters[filter_key].filter( str => str !== filter_tag) : // if so, remove it from the category/brand/store list
                    [...selected_filters[filter_key], filter_tag] //otherwise append it to the end of the category/brand/store list
            })
        
    return [
        filter_tags,
        selected_filters,
        loading,
        error,
      {
        onFilterTagSelected,
        searchTags: (tag_str)=> trie.search(tag_str)
      }
    ]
}

export default useFilters