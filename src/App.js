import useApp from './hooks/useApp'

import HeaderLayout from './layouts/headerLayout/HeaderLayout'
import SideBarLayout from './layouts/sidebarLayout/SideBarLayout'
import BodyLayout from './layouts/bodyLayout/BodyLayout'
import { CSSTransition } from 'react-transition-group';

import {useState} from 'react'

import CardList from './components/cardList/CardList'
import VertifyAge from './components/vertifyAge/VertifyAge'

import { Route, Routes, Link, useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';


import './app.css'

function App( {SHOW_DOB_POPUP} ) {

  const [
    selected_filters_handlers, 
    filter_tags_query, 
    query, 
    show_dob_popup, 
    isMobile, 
    nodeRef,
    { closeDOBPopup }] = useApp(true)//SHOW_DOB_POPUP

    const [sidebar_open, toggleSidebar ] = useState(false)

    let location = useLocation();

    console.log("location:", location)

    return( 

      <div className="page">

         <CSSTransition timeout={500} unmountOnExit classNames="toggle-vertifyage-popup-animation" 
            /* if an animated component appears when app first loads, need the 'appear' prop along with the 'in' prop
               also need to define *-appear and *-appear-active css classes
            */
            in={show_dob_popup}
            appear={show_dob_popup}
            /* because we use the 'in' prop with a custom functional component, also need to define a nodeRef prop
               which is a useRef instance. the ref gets set by the CSSTransition wrapper
               the alternative is to lift the wrapping div from the vertify age cmp and put it in here
            */
            nodeRef={nodeRef}>
            <VertifyAge 
                ref={nodeRef} // pass the ref to vertifyage, which is wrapped in forwardRef
                closeDOBPopup={closeDOBPopup}/>
        </CSSTransition>     
          
          <div className="app_flex_parent">
              
            <div className="header_flex_child">
                <HeaderLayout 
                    selected_filters_handlers={selected_filters_handlers} 
                    filter_tags_query={filter_tags_query}
                    isMobile={isMobile}/>  
            </div>
 
              <div className="body_flex_parent">
                <CSSTransition 
                    timeout={1000} 
                    unmountOnExit 
                    classNames="show-filters-animation" 
                    in={!isMobile && sidebar_open}>
                        <div className="sidebar_flex_child">
                          <SideBarLayout 
                              selected_filters_handlers={selected_filters_handlers}
                              filter_tags_query={filter_tags_query}/>    
                        </div>
                </CSSTransition>

                {/*<div className="cardlist_flex_child">*/}
                  <Routes>
                    <Route path="/" element={
                      <BodyLayout 
                        selected_filters_handlers={selected_filters_handlers} 
                        query={query} 
                        isMobile={isMobile} 
                        toggleSidebar={()=> toggleSidebar(!sidebar_open)}
                        sidebar_open={sidebar_open}/>}/>
                    <Route path="/about" element={<div>My About</div>}/>
                    <Route path="/disclaimer" element={<div>My Disclaimer</div>}/>
                    <Route path="/message" element={<div>Message Me!</div>} />
                    <Route path="*" element={<ErrorPage/>} />
                  </Routes>


                  
                    {/*<BodyLayout 
                      selected_filters_handlers={selected_filters_handlers} 
                      query={query} 
                      isMobile={isMobile} 
                      toggleSidebar={()=> toggleSidebar(!sidebar_open)}
                      sidebar_open={sidebar_open}/>*/}                  
                {/*</div>*/}
            </div>     
              <div className="footer_flex_parent">
                <Link onClick={e=>toggleSidebar(false)} to={`/`}><span className={location.pathname === '/' && "current_page_link"}>Home</span></Link> 
                <Link onClick={e=>toggleSidebar(false)} to={`/about`}>About</Link> 
                <Link onClick={e=>toggleSidebar(false)} to={`/disclaimer`}>Disclaimer</Link>
                <Link onClick={e=>toggleSidebar(false)} to={`/message`}>Message</Link>          
              </div>          
          </div> 
      </div>)
}

export default App;

function About(){
  return (
  <div className="content_section">
    <h1>About The Author</h1>
  </div>)
}

function Disclaimer(){

}

function ErrorPage() {
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
       
      </p>
    </div>
  );
}
