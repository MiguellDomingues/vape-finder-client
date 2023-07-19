import Modal from './Modal'
import { RxHamburgerMenu, RxHome } from 'react-icons/rx';
import { IoMdHelp } from 'react-icons/io';
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

    function displayRouteIcon(){

      let route_icon = null
      let next_loc = null

      if(isHomePage()){
        route_icon = <IoMdHelp size={'2em'}/>
        next_loc = PAGE_URIS.ABOUT
      }else if(isAboutPage()){
        route_icon = <RxHome size={'2em'}/>
        next_loc = PAGE_URIS.HOME
      }

      return <Link to={next_loc}><span className="header_current_link">{route_icon}</span></Link>    
    }

    return (<>   
      <CSSTransition 
        timeout={500} 
        unmountOnExit 
        in={!filter_tags_query.loading && is_open} //only allow modal to open when filters are loaded, otherwise app crashes
        classNames="toggle-mobile-modal-animation">
        <Modal 
          selected_filters_handlers={selected_filters_handlers}
          filter_tags_query={filter_tags_query}
          history={history} 
          toggleModal={toggleModal}/>
      </CSSTransition>
      
      <div className="container_header">
        { (isMobile && isHomePage()) && //show modal btn on mobile homepage only
          <div className="open_modal_btn">
            <RxHamburgerMenu size={'2em'} onClick={ e=> toggleModal()}/>
          </div>}
        <span className="header_title">BC VAPE FINDER</span>
        <div className="header_links_section">
          <div className="header_links_row">
            {displayRouteIcon(location.pathname)}
          </div>
        </div>        
      </div></>);
  }

  export default Header

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