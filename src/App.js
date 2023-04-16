import useApp from './hooks/useApp'
import Header from './components/Header'
import Footer from './components/Footer'
import ContactForm from './components/ContactForm'
import About from './routes/About'
import Home from './routes/Home'
import Error from './routes/Error'

import { Route, Routes } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { PAGE_URIS } from "./utils.js";

import './styles/app.css'

function App( {SHOW_DOB_POPUP} ) {

  const [
    selected_filters_handlers, 
    filter_tags_query, 
    query, 
    isMobile] = useApp()

    const location = useLocation();

    return(
      <div className="page">
          <div className="app_flex_parent">
              
            <div className="header_flex_child">
              <Header
                selected_filters_handlers={selected_filters_handlers} 
                filter_tags_query={filter_tags_query}
                show_button={isMobile && location.pathname === PAGE_URIS.HOME}/>  
            </div>
 
            <div className="body_flex_parent">
              <Routes>
                <Route path={PAGE_URIS.HOME} element={
                  <Home
                  selected_filters_handlers={selected_filters_handlers}
                  filter_tags_query={filter_tags_query}
                  query={query}
                  isMobile={isMobile}/>}/>
              <Route path={PAGE_URIS.ABOUT} element={<About/>}/>                    
              <Route path={PAGE_URIS.CONTACT} element={<ContactForm/>}/>
              <Route path="*" element={<Error/>} />
            </Routes>
          </div>

          <div className="footer_flex_parent">
            <Footer current_location={location.pathname}/>    
          </div>   

        </div> 
      </div>)
}

export default App;


 /*<CSSTransition timeout={500} unmountOnExit classNames="toggle-vertifyage-popup-animation" 
             if an animated component appears when app first loads, need the 'appear' prop along with the 'in' prop
               also need to define *-appear and *-appear-active css classes
            
            in={show_dob_popup}
            appear={show_dob_popup}
            /because we use the 'in' prop with a custom functional component, also need to define a nodeRef prop
               which is a useRef instance. the ref gets set by the CSSTransition wrapper
               the alternative is to lift the wrapping div from the vertify age cmp and put it in here
            
            nodeRef={nodeRef}>
            <VertifyAge 
                ref={nodeRef} // pass the ref to vertifyage, which is wrapped in forwardRef
                closeDOBPopup={closeDOBPopup}/>
        </CSSTransition>*/  



