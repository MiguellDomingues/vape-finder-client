import Modal from './Modal'
import { RxHamburgerMenu } from 'react-icons/rx';
import { CSSTransition } from 'react-transition-group';
import { Link, useLocation } from "react-router-dom";
import { PAGE_URIS } from "../utils.js";
import {useState} from 'react'

import '../styles/header.css'

function Header({
  selected_filters_handlers, 
  filter_tags_query, 
  history,
  isMobile
}){
    const location = useLocation();

    const [is_open, setOpen] = useState(false)
 
    const toggleModal = () =>setOpen(!is_open)

    const isHomePage = () => location.pathname === PAGE_URIS.HOME 
    const isAboutPage = () => location.pathname === PAGE_URIS.ABOUT

    function styleRoute(txt, path, is_current_page){
      if(!is_current_page){
        return <Link to={path}><span className="header_current_link">{txt}</span></Link>
      }else{
         return <span className="header_noncurrent_link">{txt}</span>
      }
    }

    return (<>   
      <CSSTransition timeout={500} unmountOnExit classNames="toggle-mobile-modal-animation" in={is_open}>
        <Modal 
          selected_filters_handlers={selected_filters_handlers}
          filter_tags_query={filter_tags_query}
          history={history} 
          toggleModal={toggleModal}/>
      </CSSTransition>
      
      <div className="container_header">
        { (isMobile && isHomePage()) && <div className="open_modal_btn"><RxHamburgerMenu size={'2em'} onClick={ e=> toggleModal()}/></div>}
        <span className="header_title">BC VAPE FINDER</span>
        <div className="header_links_section">
          <div className="header_links_row">
            {styleRoute("Home", PAGE_URIS.HOME, isHomePage())}
          </div>
          <div className="header_links_row">
            {styleRoute("About", PAGE_URIS.ABOUT, isAboutPage())}
          </div>
        </div>        
      </div></>);
  }

  export default Header

    //const show_button = isMobile && isHomePage()
  //console.log("is home?", isHomePage())
  //console.log("is about?", isAboutPage())
    //className={stylePageLink(PAGE_URIS.HOME)}
    //const stylePageLink = ((curr_loc) => (link_uri) => link_uri === curr_loc ? "current_page_link" : "")(current_location);

    /*
    <div className="header_links_row">
            <Link to={PAGE_URIS.HOME}><span className={isHomePage() ? "header_current_link" : "header_noncurrent_link"}>Home</span></Link> 
          </div>
          <div className="header_links_row">
            <Link to={PAGE_URIS.ABOUT}><span className={isAboutPage() ? "header_current_link" : "header_noncurrent_link"}>About</span></Link> 
          </div>
    */

/*
<ContextMenu menu={ () => <CustomMenu/> } />  

const CustomMenu = () => (
  <ul className="menu" style={{
    height: "100px",
    width: "100px",
    position: "absolute",
    }}>
    <li>Login</li>
    <li>Register</li>
    <li>Open Profile</li>
  </ul>
);

const ContextMenu = ({ menu }) => {
  const { xPos, yPos, ref, showMenu } = useContextMenu();
  return (
    <>
      
          {showMenu ? <div ref={ref} className="menu-container"
          style={{
            top: yPos,
            position: "absolute",
            left: xPos, zIndex: 20}}>
            {menu()}</div> : <></>}
   
    </>
  )
};

const useContextMenu = () => {
  const [xPos, setXPos] = useState("20px");
  const [yPos, setYPos] = useState("20px");
  const [showMenu, setShowMenu] = useState(true);
  const ref = useRef(null)

  const handleContextMenu = useCallback(
    (e) => {
      e.preventDefault();

      setXPos(`${e.pageX}px`);
      setYPos(`${e.pageY}px`);
      setShowMenu(true);
    },
    [setXPos, setYPos]
  );

  const handleClick = useCallback(() => {
    showMenu && setShowMenu(false);
  }, [showMenu]);

  useEffect(() => {
    ref.current.addEventListener("click", handleClick);
    ref.current.addEventListener("contextmenu", handleContextMenu);
    const _ref = ref.current
    return () => {
      _ref.addEventListener("click", handleClick);
      _ref.removeEventListener("contextmenu", handleContextMenu);
    };
  });

  return { xPos, yPos, ref, showMenu };
};

*/