import TrieSearch from 'trie-search';
import { useMemo } from 'react'

const MIN_ITEM_COUNT = 5

function useFilters( 
    { selected_filters, setAndRefetch },{ data, loading, error } 
){

    const filter_tags = useMemo(() => {
        return !loading && !error ? { ...parseFilterTags(data.tagmetadata) } : { category_tags: [], brands_tags: [], stores_tags:[] } 
    }, [loading ,error, data]);

    const trie = useMemo(() => {
        return initTrieSearch(filter_tags)
    }, [filter_tags]);



    function initTrieSearch(filter_tags){

        const trie  = new TrieSearch("tag_name");
        //console.log("MY NEW TRIE ON A REF ", filter_tags)

        const initTrieByTagType = (type) => (tag) => trie.add({tag_name: tag.tag_name, type: type.split("_")[0]})

        //for each filter tag key, add the filter tags tag_names to trie by type (category_tags, brand_tags or store_tags)
        //..then split the type into the selected_filters key (category_tags => category)
        Object.keys(filter_tags).forEach( (key)=> filter_tags[key].forEach(initTrieByTagType(key)))
        return trie
    }
       
  
    function parseFilterTags(tagmetadata){

        const orderTagsByProductCount = (tags) => tags.sort( (lhs, rhs)=> rhs.product_count-lhs.product_count)
        const filterTagsByMinProductCount = (tags, min_product_count = 0) => tags.filter((tag) => tag.product_count >= min_product_count)
        const findTagsByTagType = (tagmetadata, type_name) => tagmetadata.find( t => t.type_name === type_name).tags
        //console.log("----RUNNING PARSE FILTER TAGS---")
        return { //unpack each search type by respective tag_name, filter for tags over a certain #, and sort the results from most linked products to least
            category_tags: orderTagsByProductCount( filterTagsByMinProductCount ( findTagsByTagType(tagmetadata, "CATEGORIES"))),
            brands_tags:   orderTagsByProductCount( filterTagsByMinProductCount ( findTagsByTagType(tagmetadata, "BRANDS"), MIN_ITEM_COUNT)),
            stores_tags:   orderTagsByProductCount( filterTagsByMinProductCount ( findTagsByTagType(tagmetadata, "STORES"))) 
        }
    }

    //return a closure which references the selected_filters key (catories/stores/brands)
    //add or remove a filter tag from the selected_filters[filter_key] list 
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