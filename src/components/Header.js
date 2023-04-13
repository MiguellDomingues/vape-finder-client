import ModalLayout from './Modal'
import { RxHamburgerMenu } from 'react-icons/rx';
import { CSSTransition } from 'react-transition-group';
import {useState} from 'react'

import '../styles/header.css'

//const img_src = '../../../health_warning.webp';

function Header( {selected_filters_handlers, filter_tags_query, isMobile} ) {

    const [is_open, setOpen] = useState(false)

    const toggleModal = () =>setOpen(!is_open)

    return (<>   
      <CSSTransition timeout={500} unmountOnExit classNames="toggle-mobile-modal-animation" in={is_open}>
        <ModalLayout 
          selected_filters_handlers={selected_filters_handlers}
          filter_tags_query={filter_tags_query} 
          toggleModal={toggleModal}/>
      </CSSTransition>
      
      <div className="container_header">

        {/*<div className="top">
          <img className="warning_img"
            src={img_src}
            alt="Health_Warning">
          </img>   
        </div>*/}
    
        <div className="bottom">
        {isMobile && <div className="open_modal_btn"><RxHamburgerMenu size={'2em'} onClick={ e=> toggleModal()}/></div>}
          <span className="header_title">BC VAPE FINDER</span>  
        </div>
      </div></>);
  }

  export default Header