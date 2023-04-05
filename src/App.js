//import Layout from './layout'
import useApp from './hooks/useApp'

import HeaderLayout from './layouts/headerLayout/HeaderLayout'
import SideBarLayout from './layouts/sidebarLayout/SideBarLayout'
import BodyLayout from './layouts/bodyLayout/BodyLayout'
import { CSSTransition } from 'react-transition-group';

import CardList from './components/cardList/CardList'
import VertifyAge from './components/vertifyAge/VertifyAge'
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
               the alternative is to lift the wrapping div into 
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
              
              <div className="pillcontainer_flex_child">
                  {/*<PillContainer selected_filters_handlers={selected_filters_handlers} />*/ }
              </div>
                     
                  <div className="body_flex_parent">
  
                      {!isMobile && <div className="sidebar_flex_child">
                          <SideBarLayout 
                              selected_filters_handlers={selected_filters_handlers}
                              filter_tags_query={filter_tags_query}/>    
                      </div>}
  
                      <div className="cardlist_flex_child">
                      <BodyLayout selected_filters_handlers={selected_filters_handlers} query={query} isMobile={isMobile}/>
                          {/*<CardList query={query} selected_filters_handlers={selected_filters_handlers}/>*/}
                      </div>
  
                  </div>
              
              <div className="footer_flex_child">    
                  <span className="about cursor_hand">About</span>            
              </div>
              
          </div> 
      </div>)
}

export default App;
