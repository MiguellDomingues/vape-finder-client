import ModalLayout from '../modalLayout/ModalLayout'
import { RxHamburgerMenu } from 'react-icons/rx';
import {useState} from 'react'

import './header.css'

const img_src = '../../../health_warning.webp';

function HeaderLayout( {selected_filters_handlers, filter_tags_query, isMobile} ) {

    const [is_open, setOpen] = useState(false)

    const toggleModal = () =>setOpen(!is_open)

    return (<>
      {is_open && <ModalLayout 
                    selected_filters_handlers={selected_filters_handlers}
                    filter_tags_query={filter_tags_query} 
                    toggleModal={toggleModal}/>}
      <div className="container_header">

        <div className="top">
          <img className="warning_img"
            src={img_src}
            alt="Health_Warning">
          </img>   
        </div>
    
        <div className="bottom">
        {isMobile && <div className="open_modal_btn"><RxHamburgerMenu size={'2em'} onClick={ e=> toggleModal()}/></div>}
          <span className="header_title">BC VAPE FINDER</span>  
        </div>
      </div></>);
  }

  export default HeaderLayout