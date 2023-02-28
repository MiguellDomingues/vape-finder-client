import './search_bar.css'

import { useSearchBar } from './useSearchBar.js'

function SearchBar( {refetch} ){

    const [
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
     ] = useSearchBar(refetch)

    const { category_tags, brands_tags, stores_tags } = filter_tags
    const { category, stores, brands, } = selected_filters

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    return (<>

        <div className="search_bar_categories">
            {category_tags.map( (c, idx) =>
            <div>
                <span className={"search_bar_category cursor_hand" + selectedFilterBGC(category, [c.tag_name])} 
                      key={idx} 
                      onClick={ () => onCategorySelected(c.tag_name)}>
                    {c.tag_name}              
                </span>
                <span className="search_bar_product_count">{c.product_count}</span>
            </div>)}
        </div>

        <div className="search_bar_shops_about">

        <DropDownMenu title="Brands" tags={brands_tags} selected_tags={brands} selectedHandler={onBrandSelected} selectedTagsBGC={selectedFilterBGC}/>
        <DropDownMenu title="Stores" tags={stores_tags} selected_tags={stores} selectedHandler={onStoreSelected} selectedTagsBGC={selectedFilterBGC}/>
          
           <span className="about cursor_hand">About</span> 
        </div>
    </>)
}

export default SearchBar

function DropDownMenu( {title, tags, selected_tags, selectedHandler, selectedTagsBGC} ){

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
