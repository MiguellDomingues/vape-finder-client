import './search_bar.css'

import { useSearchBar } from './useSearchBar.js'

function SearchBar( {refetch} ){

    const [
       filter_tags,
       selected_filters,
        loading,
        error,
        {
            onCategorySelected,
            onStoreSelected,
            onBrandSelected 
        }
     ] = useSearchBar(refetch)

    const { category_tags, brands_tags, stores_tags } = filter_tags
    const { category, stores, brands, } = selected_filters

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    return (<>

        <div className="search_bar_categories">
            <DropDownMenu title="Categories" tags={category_tags} selected_tags={category} selectedHandler={onCategorySelected} />
            <DropDownMenu title="Brands" tags={brands_tags} selected_tags={brands} selectedHandler={onBrandSelected} />
            <DropDownMenu title="Stores" tags={stores_tags} selected_tags={stores} selectedHandler={onStoreSelected} />
            <span className="about cursor_hand">About</span>      
        </div> 
    </>)
}

export default SearchBar

function DropDownMenu( {title, tags, selected_tags, selectedHandler} ){

    const selectedTagsBGC = (str, arr) => arr.includes(str) ? " filter_selected" : ""

    return(<div className="brands cursor_hand">
    {title}
    <div className="dropdown-arrow"></div>
    <div className="dropdown-content">    
        {tags.map( (tag, idx)=>
            <span className={selectedTagsBGC(tag.tag_name, selected_tags)}
                  key={idx} 
                  onClick={ ()=> selectedHandler(tag.tag_name)}>
                 {tag.tag_name} {tag.product_count}          
            </span>)}                  
    </div>
</div>)
}
