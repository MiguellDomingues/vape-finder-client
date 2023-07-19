import { PillDropDownView, ListDropDownView } from './widgets.js'
import useOnClickOutside from '../hooks/useOnClickOutside.js'
import {useState, useRef, } from 'react'

import { FcSearch } from 'react-icons/fc'

import '../styles/textsearch.css' 

const input_placeholder_txt = 'Search Categories Brands Stores'

function TextSearch({
    searchTagsHandler, 
    selectedHandler, 
    selected_tags,
   // selected_tags: {category, stores, brands}, //inline deconstruct selected_tags props
    pill_view = false,
    //...(value && { disabled: true }),
}){
   
    const [text, setText] = useState("")
    const [matches, setMatches] = useState([])
    const [show_dropdown, setShowDropdown] = useState(false)

    const dropdown_ref = useRef(null)

    useOnClickOutside(dropdown_ref, () => {setShowDropdown(false)});
    
    const getDropDownViewCSS = (is_pill_view) => is_pill_view ? "text_search_pill_layout" : "text_search_list_layout"

   // const getDropDownViewCmp = (is_pill_view, {...props}) => is_pill_view ? <PillDropDownView {...props} /> : <ListDropDownView {...props} />
    
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

    const props = {matches, selected_tags, selectedHandler}

    return(<>
        <div ref={dropdown_ref} className="text_search_container">
            <div className="text_search_icon"><FcSearch size={'1.25em'}/></div>
            <input 
                type="text"
                autoComplete="off" // add debouncing
                onFocus={e=> text.length > 0 && setShowDropdown(true)} //when the input is clicked on, show dropdown if theres at least 1 letter
                onChange={onChange}
                maxLength="8"
                placeholder={input_placeholder_txt}
                className={`text_search_input`} //${!show_dropdown ? ` text_search_input_center` : ``}
                value={text}/>
            {show_dropdown && <>
                <div className={`text_search_content ${getDropDownViewCSS(pill_view)}`}>
                    { matches.length === 0 ? //if no results were returned from user input
                        <div className="text_search_content_row">No Results found!</div> 
                    : //otherwise, display the results as pills or a list
                        pill_view ? 
                            <PillDropDownView {...props} /> 
                        : 
                            <ListDropDownView {...props} />     
                    }
                </div>           
            </>}  
        </div>
    </>)
}

export default TextSearch

/*
 {<div className={`text_search_content ${getDropDownViewCSS(pill_view)}`}>
                    { matches.length > 0 ? getDropDownViewCmp(pill_view, {matches, selected_tags, selectedHandler})        
                    : <div className="text_search_content_row">No Results found!</div>}
            </div>}
            */