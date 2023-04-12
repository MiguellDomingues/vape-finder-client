import useApp from './hooks/useApp'

import HeaderLayout from './layouts/headerLayout/HeaderLayout'
import SideBarLayout from './layouts/sidebarLayout/SideBarLayout'
import BodyLayout from './layouts/bodyLayout/BodyLayout'
import FooterLayout from './layouts/footerLayout/FooterLayout'
import { CSSTransition } from 'react-transition-group';
import emailjs from '@emailjs/browser';

import {useState, useRef} from 'react'

import CardList from './components/cardList/CardList'
import VertifyAge from './components/vertifyAge/VertifyAge'

import { Route, Routes } from "react-router-dom";
import { useLocation } from 'react-router-dom';

import { PAGE_URIS } from "./utils.js";


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

    //console.log("location:", location)

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
                    <Route path={PAGE_URIS.HOME} element={
                      <BodyLayout 
                        selected_filters_handlers={selected_filters_handlers} 
                        query={query} 
                        isMobile={isMobile} 
                        toggleSidebar={()=> toggleSidebar(!sidebar_open)}
                        sidebar_open={sidebar_open}/>}/>
                    <Route path={PAGE_URIS.ABOUT} element={<div>My About</div>}/>
                    <Route path={PAGE_URIS.DISCLAIMER} element={<Disclaimer/>}/>
                    <Route path={PAGE_URIS.CONTACT} element={<ContactForm/>} />
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
                <FooterLayout current_location={location.pathname} toggleSidebar={toggleSidebar}/>    
              </div>          
          </div> 
      </div>)
}

export default App;

function ContactForm(){

  const [length_remaining, setLengthRemaining] = useState(0)
  const form_ref = useRef(null)
  const max_chars = 500

  const textEntered = (e) => {

      setLengthRemaining(max_chars-e.target.value.length)

      //https://www.codingnepalweb.com/auto-resize-textarea-html-css-javascript/
      const textarea = e.target   
      textarea.style.height = "104px"; //+4 the height defined in css
      let scHeight = e.target.scrollHeight;
      textarea.style.height = `${scHeight}px`;
  }

  const sendEmail = (e) => {
    e.preventDefault(); // prevents the page from reloading when form submitted
    //console.log("onsubmit: ", 
   // "name",e.target[0].value, 
   // "email",e.target[1].value, 
   // "msg",e.target[2].value,
   // "msg length",e.target[2].value.length)

    emailjs.sendForm("service_26wow18","template_ae7w1sz", form_ref.current , "u9Zhvtr96iH2sakMP")
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    <div className="alt_page">
      <div className="alt_page_card">
        <p>
        If you would like to reach out with questions, concerns, or opportunities -  leave a message!
        </p>

        <form ref={form_ref} className="contact_form" onSubmit={sendEmail}> 

          <div className="contact_header_name_email">
            <input type="text" name="from_name" placeholder="Name" className="contact_name" required/>    
            <input type="email" name="reply_to" placeholder="Email" className="contact_email" required/>        
          </div>

          <div className="contact_body">
            <textarea name="message" maxLength={max_chars} spellCheck="false" placeholder="Message" className="contact_message" required onInput={textEntered}/>
          </div>

          <div className="contact_footer">
            <div className="send_message_btn" onClick={e=>{form_ref?.current.requestSubmit()}}>
              <span>Send Message!</span>
            </div>
          <span className="chars_remaining">{length_remaining} characters remaining</span>
        </div>

      </form>
    </div>
  </div>
  );
 };
  

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
  <div className="content_section">
    <h1>About The Author</h1>
  </div>)
}

function Disclaimer(){
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



