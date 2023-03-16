import './header.css'
import { useMediaQuery } from 'react-responsive';

import { SORT_TYPE } from '../../App.js';

import SearchBar from '../../components/searchBar/SearchBar'
import PillContainer from '../../components/pillContainer/PillContainer.js'

import {useState, useRef, useEffect } from 'react'

const img_src = '../../../health_warning.webp';


function HeaderContainer( {selected_filters_handlers} ) {

    const isDesktop = useMediaQuery({ minWidth: 800 });
    const isMobile = useMediaQuery({ maxWidth: 800 });

    const [is_open, setOpen] = useState(false)

    return ( 
    <>

        {/*!isDesktop && isMobile && is_open &&
        
        <div id="myModal" class="modal">
          <div class="modal-content">
            <div onClick={e=> setOpen(false)}><span class="close">&times;</span></div>  
            <SearchBar selected_filters_handlers={selected_filters_handlers}/>
            <SortByDropDown selected_filters_handlers={selected_filters_handlers}/>
        </div>
        </div>
    */}
    
    
    <div className="container_header">

      <div className="top">
        <img className="warning_img"
          src={img_src}
          alt="Health_Warning">
        </img>   
      </div>
   
      <div className="bottom">

       {/*!isDesktop && isMobile && <button onClick={ e=> setOpen(!is_open)}>Open</button>      
       */}

       
   
        <span className="header_title">BC VAPE FINDER</span>  
      </div>

    </div></>);
  }
  
  export default HeaderContainer;