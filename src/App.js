import useApp from './hooks/useApp'

import Header from './components/Header'
import SideBar from './components/SideBar'
import BodyLayout from './components/Body'
import Footer from './components/Footer'
import ContactForm from './components/ContactForm'

import { CSSTransition } from 'react-transition-group';
import { Route, Routes } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import {useState} from 'react'

import { PAGE_URIS } from "./utils.js";

import './styles/app.css'

function App( {SHOW_DOB_POPUP} ) {

  const [
    selected_filters_handlers, 
    filter_tags_query, 
    query, 
    isMobile] = useApp()

    const [sidebar_open, toggleSidebar ] = useState(false)

    const location = useLocation();

    return(
      <div className="page">
          <div className="app_flex_parent">
              
            <div className="header_flex_child">
              <Header
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
                    <SideBar 
                      selected_filters_handlers={selected_filters_handlers}
                      filter_tags_query={filter_tags_query}/>    
                  </div>
              </CSSTransition>

              <Routes>
                <Route path={PAGE_URIS.HOME} element={
                  <BodyLayout 
                    selected_filters_handlers={selected_filters_handlers} 
                    query={query} 
                    isMobile={isMobile} 
                    toggleSidebar={()=> toggleSidebar(!sidebar_open)}
                    sidebar_open={sidebar_open}/>}/>
                <Route path={PAGE_URIS.ABOUT} element={<About/>}/>                    
                <Route path={PAGE_URIS.CONTACT} element={<ContactForm/>}/>
                <Route path="*" element={<ErrorPage/>} />
              </Routes>
            </div>     
            <div className="footer_flex_parent">
              <Footer current_location={location.pathname} toggleSidebar={toggleSidebar}/>    
            </div>          
          </div> 
      </div>)
}

export default App;

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

function About(){
  return (
    <div className="alt_page">
      <div className="alt_page_card">
        <p>
        This website includes content that has been obtained through scraping publicly-available data sources, such as government websites, public records, and online directories. 
        While I strive to ensure the accuracy and completeness of the information presented on our website, I cannot guarantee the reliability or currency of the data obtained 
        through scraping, as it may be subject to errors, omissions, or changes.
        </p>

        <p>
        Please note that the scraped data is not intended for commercial use or profit. I do not endorse or promote any products or services based on the scraped data.
        I do not claim ownership or copyright of the scraped data, and I acknowledge the intellectual property rights of the original authors and publishers of such information.
        I have used the data solely for the purpose of demonstrating my modern web development skills.
        </p>

        <p>
        However, I recognize that some individuals or organizations may object to the use of their information on our website. If you are the owner of any data that has been scraped and used on this website, 
        and you wish to have it removed or corrected, please leave a message.
        </p>
      </div>
     {/* <p>
      By using my website, you agree to this disclaimer and acknowledge that we are not responsible for any damages, losses, or liabilities that may arise from your reliance on the scraped data or the 
      content presented on my website. You also agree to comply with all applicable Canadian laws and regulations governing the use of public data and online content.
  </p> */}   
    </div>)
}

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



