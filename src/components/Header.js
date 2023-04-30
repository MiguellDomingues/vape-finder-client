import Modal from './Modal'
import { RxHamburgerMenu } from 'react-icons/rx';
import { CSSTransition } from 'react-transition-group';
import {useState} from 'react'

import '../styles/header.css'

function Header({
  selected_filters_handlers, 
  filter_tags_query, 
  show_button
}){

    const [is_open, setOpen] = useState(false)
 
    const toggleModal = () =>setOpen(!is_open)

    return (<>   
      <CSSTransition timeout={500} unmountOnExit classNames="toggle-mobile-modal-animation" in={is_open}>
        <Modal 
          selected_filters_handlers={selected_filters_handlers}
          filter_tags_query={filter_tags_query} 
          toggleModal={toggleModal}/>
      </CSSTransition>
      
      <div className="container_header">
        {show_button && <div className="open_modal_btn"><RxHamburgerMenu size={'2em'} onClick={ e=> toggleModal()}/></div>}
        <span className="header_title">BC VAPE FINDER</span>        
      </div></>);
  }

  export default Header