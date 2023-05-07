import { PillList } from './widgets.js'
import {FILTER_KEYS} from '../utils'
import useOnClickOutside from '../hooks/useOnClickOutside.js'
import {useState, useRef, } from 'react'

import '../styles/textsearch.css' 

/* *************text search container************** */

const input_placeholder_txt = 'What are you looking for?'

//i feel like when user searches for tags using txt searching, the debounce time should be zero (instant query)
function TextSearch({
    searchTagsHandler,
    selectedHandler, //= ()=>{},
    selected_tags,
   // selected_tags: {category, stores, brands}, //inline deconstruct selected_tags props
    pill_view,
    //...(value && { disabled: true }),
}){
   
    const [text, setText] = useState("")
    const [matches, setMatches] = useState([])
    const [show_dropdown, setShowDropdown] = useState(false)

    const dropdown_ref = useRef(null)

    useOnClickOutside(dropdown_ref, () => {setShowDropdown(false)});
    
    const getDropDownViewCSS = (is_pill_view) => is_pill_view ? "text_search_pill_layout" : "text_search_list_layout"

    const getDropDownViewCmp = (is_pill_view, {...props}) => is_pill_view ? <PillDropDownView {...props} /> : <ListDropDownView {...props} />
    
    const onChange = e => {
        setText(e.target.value)
        if(e.target.value.length > 0){
            const search_result = searchTagsHandler(e.target.value)
            console.log("TRIE SEARCH inside TEXTSEARCH ", search_result)
            setMatches([...search_result])
            setShowDropdown(true)
        }else{
            setShowDropdown(false)
        }
    }

    return(<>
        <div ref={dropdown_ref} className="text_search_container">
            <input 
                type="text"
                autoComplete="off" // add debouncing
                onFocus={e=> text.length > 0 && setShowDropdown(true)} //when the input is clicked on, show dropdown if theres at least 1 letter
                onChange={onChange}
                maxLength="8"
                placeholder={input_placeholder_txt}
                className={`text_search_input`} //${!show_dropdown ? ` text_search_input_center` : ``}
                value={text}/> 
            {show_dropdown && 
                <div className={`text_search_content ${getDropDownViewCSS(pill_view)}`}>
                    { matches.length > 0 ? getDropDownViewCmp(pill_view, {matches, selected_tags, selectedHandler})        
                    : <div className="text_search_content_row">No Results found!</div>}
                </div>}  
        </div>

    </>)
}

export default TextSearch


function PillDropDownView({
    matches, 
    selected_tags, 
    selected_tags: {category, stores, brands},
    selectedHandler
}){
    console.log("PILLDROPDOWN RERENDER: ", selected_tags)
    const filterMatchesByKey = (key, matches) => matches.filter( tag => tag.type === key).map(tag=>tag.tag_name)

    return(<>
        <PillList pills={filterMatchesByKey(FILTER_KEYS.CATEGORIES, matches)} handleClick={selectedHandler(FILTER_KEYS.CATEGORIES)} selected_pills={category}/>   
        <PillList pills={filterMatchesByKey(FILTER_KEYS.BRANDS, matches)} handleClick={selectedHandler(FILTER_KEYS.BRANDS)} selected_pills={brands}/>
        <PillList pills={filterMatchesByKey( FILTER_KEYS.STORES, matches)} handleClick={selectedHandler(FILTER_KEYS.STORES)} selected_pills={stores}/>
    </>)
}

function ListDropDownView({
    matches, 
    //selected_tags, 
    selected_tags: {category, stores, brands},
    selectedHandler
}){
    const selected_tags = [...category, ...stores, ...brands] 
    const selectedTagsBGC = (str, arr) => arr.includes(str) ? " ts_filter_selected text_search_content_row" : "text_search_content_row"

    return (matches.map(tag=> //if theres at least a single word match, show dropdown
    <div key={tag.tag_name} 
        className={selectedTagsBGC(tag.tag_name, selected_tags)}
        onClick={e=>selectedHandler(tag.type)(tag.tag_name)}>{tag.tag_name}</div>))
}