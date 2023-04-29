import '../styles/about.css'

import { FaGithub, FaNodeJs, FaReact, FaLinkedin } from 'react-icons/fa';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import { SiMongodb, SiRealm, SiApollographql, SiReactrouter, SiHeroku, SiGraphql, SiCreatereactapp,SiAxios } from 'react-icons/si';
import { PillList, CheerioJSIcon, EmailJSIcon } from '../components/widgets'
import  ContactForm  from '../components/ContactForm'

import { useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group';

function About(){

  const [show_build_with, setShowBuildWith] = useState(false)
  const [show_disclaimer, setShowDisclaimer] = useState(false)
  const [show_creator, setShowCreator] = useState(false)

  const active_section_ref = useRef({})

  const openActiveSection = () => active_section_ref.current?.openActiveSection && active_section_ref.current.openActiveSection()

  const setActiveSectionIcon = (is_active_section) => is_active_section ?  <AiFillCaretDown/> : <AiFillCaretUp/>

  const toggleDetailSections = (section_open, stateSetter ) =>{
    
    const setState = (setter) => ()=>stateSetter(setter)             // init a closure that returns a state setting function
    const openSection = setState(true)                               // create open/close functions
    const closeSection = setState(false)
    //console.log(active_section_ref.current)
    if(Object.keys(active_section_ref.current).length === 0 ){      // ....if all sections are closed....
      openSection()                                                   //open the section next frame     
      active_section_ref.current.closeActiveSection = closeSection    //set this section to close if another section is opened
    }else if(section_open){                                         // ....if the selected section is already open..
      closeSection()                                                   //close the section and reset the active ref
      active_section_ref.current = {}                                          
    }else{                                                          //...otherwise close the current section and update the active section
      active_section_ref.current.closeActiveSection()                 //close the current section                                                       
      active_section_ref.current.openActiveSection = openSection      //update open/close refs for this new active section  
      active_section_ref.current.closeActiveSection = closeSection                  
      }    
  }

  const wrapCmpWithAnchorTag = (cmp, url) =>
    <a className="pointer_link" href={url} target="_blank" rel="noopener noreferrer"><cmp.type {...cmp.props}/></a>

  const wrapSentenceWordsWithDivs = sentence => sentence.split(" ").map( (token, idx) => <div key={idx}>{token}</div> )

  const addSectionControlCSS = (active) => `section_control ${active && 'selected_section_control'}`

    return (
      <div className="alt_page_about">
        <div className="alt_page_card_about">

        <p className="about_text">BC Vape Finder is a catalog of vaping-related products that are sourced online from multiple vendors across the lower mainland. </p>
   
        <div className="section_controls">

          <div 
          className={addSectionControlCSS(show_build_with)}
          onClick={e=>{toggleDetailSections(show_build_with, setShowBuildWith )}}>
            {setActiveSectionIcon(show_build_with)} Project Details
          </div>
             
          <div className={addSectionControlCSS(show_creator)} onClick={e=>{toggleDetailSections(show_creator,  setShowCreator)}}>
            {setActiveSectionIcon(show_creator)} Contact
          </div>
               
          <div className={addSectionControlCSS(show_disclaimer)} onClick={e=>{toggleDetailSections(show_disclaimer, setShowDisclaimer )}}>
            {setActiveSectionIcon(show_disclaimer)} Disclaimer
          </div>    

        </div>

        <CSSTransition timeout={500} unmountOnExit classNames="content-cards-section-animation" 
          in={show_build_with}
          onExited={openActiveSection}>
            <div className="content_card_layout">
              
              <div className="content_card">
                <div className="content_card_header">Website</div>
                <div className="icons_layout">
                  {wrapCmpWithAnchorTag(<FaGithub size={'1.5em'}/>, "https://github.com/MiguellDomingues/vape-finder-client")}
                  {wrapCmpWithAnchorTag(<FaReact size={'1.5em'} color={'#087ea4'}/>, "https://react.dev/")}
                  {wrapCmpWithAnchorTag(<SiCreatereactapp size={'1.5em'} color={'#087ea4'}/>, "https://create-react-app.dev/")}
                  {wrapCmpWithAnchorTag(<SiReactrouter size={'1.5em'}/>, "https://reactrouter.com/en/main")}
                  {wrapCmpWithAnchorTag(<SiApollographql size={'1.5em'}/>, "https://www.apollographql.com/")}
                  {wrapCmpWithAnchorTag(<SiRealm size={'1.5em'}/>, "https://realm.io/")}
                  {wrapCmpWithAnchorTag(<SiGraphql size={'1.5em'}/>, "https://graphql.org/")}
                </div>
              </div>

              <div className="content_card">
                <div className="content_card_header">Data Extraction</div>
                <div className="icons_layout">
                  {wrapCmpWithAnchorTag(<FaGithub size={'1.5em'}/>, "https://github.com/MiguellDomingues/vape-finder-scraper")}
                  {wrapCmpWithAnchorTag(<FaNodeJs size={'1.5em'} />, "https://nodejs.org/en")}
                  {wrapCmpWithAnchorTag(<CheerioJSIcon/>, "https://cheerio.js.org/")}
                  {wrapCmpWithAnchorTag(<SiAxios size={'1.5em'} color={'#087ea4'}/>, "https://axios-http.com/")}  
                  {wrapCmpWithAnchorTag(<PillList pills={["ODM"]}/> , "https://mongoosejs.com/")}
                  {wrapCmpWithAnchorTag(<PillList pills={["Logging"]}/> , "https://www.npmjs.com/package/winston")}             
                </div>
              </div>

              <div className="content_card">
                <div className="content_card_header">Service Providers</div>
                <div className="icons_layout">
                  {wrapCmpWithAnchorTag(<SiHeroku size={'1.5em'}/>, "https://www.heroku.com/home?")}
                  {wrapCmpWithAnchorTag(<SiMongodb size={'1.5em'} color={'green'}/>, "https://www.mongodb.com/atlas/database")}
                  {wrapCmpWithAnchorTag(<EmailJSIcon/>, "https://www.emailjs.com/")}
                </div>
              </div>

            </div>
        </CSSTransition>

        <CSSTransition timeout={500} unmountOnExit classNames="content-cards-section-animation" 
          in={show_creator}
          onExited={openActiveSection}>
          <div>
            <div className="author_info">
              {wrapCmpWithAnchorTag(<FaLinkedin size={'1.5em'} color={'blue'} />, "https://www.linkedin.com/in/m-domingues/")}
              {wrapCmpWithAnchorTag(<FaGithub size={'1.5em'}/>, "https://github.com/MiguellDomingues/")}
              {wrapSentenceWordsWithDivs(" Questions? Opportunities? Suggestions? Leave a message! ")} 
              
            </div>
            <ContactForm/> 
          </div>     
        </CSSTransition>

        <CSSTransition timeout={500} unmountOnExit classNames="content-cards-section-animation" 
          in={show_disclaimer}
          onExited={openActiveSection}>
          <span className="disclaimer_msg">
            This website includes content that has been obtained through scraping publicly-available data sources. 
            Please note that the scraped data is not intended for commercial use or profit. I do not endorse or promote any products or services based on the scraped data.
            I do not claim ownership or copyright of the scraped data, and I acknowledge the intellectual property rights of the original authors and publishers of such information.
            I have used the data solely for demonstration purposes ONLY.
            </span>
        </CSSTransition>
          
        </div>     
      </div>)
}

export default About
//To get in touch directly: 
/*
 {wrapSentenceWordsWithDivs("You can find me at ")} 
              
              {wrapCmpWithAnchorTag(<FaLinkedin size={'1.5em'} color={'blue'} />, "https://www.linkedin.com/in/m-domingues/")}
              {wrapCmpWithAnchorTag(<FaGithub size={'1.5em'}/>, "https://github.com/MiguellDomingues/")}
*/
 /*<div className="author_info">
            {wrapSentenceWordsWithDivs("For more details about the project:")}  
            <div>{wrapCmpWithAnchorTag(<FaGithub size={'1.5em'}/>, "https://github.com/MiguellDomingues/vape-finder-client")}
            {wrapCmpWithAnchorTag(<FaGithub size={'1.5em'}/>, "https://github.com/MiguellDomingues/vape-finder-scraper")}</div>
        </div>*/

          /*<div className="author_info">
            {wrapSentenceWordsWithDivs("For more information about the creator:")}    
            <div>{wrapCmpWithAnchorTag(<FaLinkedin size={'1.5em'} color={'blue'} />, "https://www.linkedin.com/in/m-domingues/")}
            {wrapCmpWithAnchorTag(<FaGithub size={'1.5em'}/>, "https://github.com/MiguellDomingues/")}</div>      
          </div>*/


//MAKE THE ABOUT PAGE YOUR HOME PAGE
//introduce apps
//use this as domain name
//LINK TO YOUR PRODUCT PAGE
// REPLACE header as you change pages
//register own domain and https
//create a new project for a temp projects page
//link to bc vape finder


 /* 

  <div className="content_card_layout">
              <div className="content_card">
                <div className="content_card_header">Miguel Domingues</div>
                <div className="icons_layout">
                  {wrapCmpWithAnchorTag(<FaLinkedin size={'1.5em'} color={'blue'} />, "https://www.linkedin.com/in/m-domingues/")}
                  {wrapCmpWithAnchorTag(<FaGithub size={'1.5em'}/>, "https://github.com/MiguellDomingues/")}
                </div>
              </div>
            </div>



  of vaping-related products that are sourced online from multiple vendors across the lower mainland.

 BC Vape Finder is a consolidated inventory of vaping-related products from multiple online vendors across the lower mainland.


 Hi. i'm Miguel. 
            Welcome to BC Vape Finder: a consolidated inventory of vaping-related products from multiple online vendors across the lower mainland.

 I created this web application to allow users to search a consolidated inventory of vaping-related products from online vendors across 
 the lower mainland. Maybe put this section in respective repos?----- To gather the data, I created an automated process that 
 scraped online storefronts for product information, which was cleaned and categorized into a unified dataset and inserted into the cloud ------

*/ 

    /*
    - a website that allows users to filter and search for vaping-related products from online vendors across lower mainland
    - product data was scraped from several sources built on top of shopify, big-commerece, woo-commerece platforms
    - scraped data was cleaned and categorized into a single data set



    The web application enables users to filter and search a consolidated inventory of vaping-related products from online vendors across the lower mainland 
    To gather the data, online storefronts were scraped for product information, which was filtered, cleaned and categorized into a unified dataset.  

    The tech stack focuses on automated data acquisition, a serverless 
    
    cleaning, and categorization, along with front-end development and serverless 
    to offer an intuitive interface for users.


    */