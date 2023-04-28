import '../styles/about.css'

import { FaGithub, FaNodeJs, FaReact, FaLinkedin } from 'react-icons/fa';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import { SiMongodb, SiRealm, SiApollographql, SiReactrouter, SiHeroku, SiGraphql, SiCreatereactapp,SiAxios } from 'react-icons/si';
import { PillList  } from '../components/widgets'

import { useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group';

function About(){

  const [show_build_with, setShowBuildWith] = useState(false)
  const [show_disclaimer, setShowDisclaimer] = useState(false)
  const [show_creator, setShowCreator] = useState(false)

  const active_section_ref = useRef({})

  const openActiveSection = () => active_section_ref.current?.openActiveSection && active_section_ref.current.openActiveSection()

  const setActiveSectionIcon = (is_active_section) => is_active_section ?  <AiFillCaretDown/> : <AiFillCaretUp/>

  const toggleDetailSections = (section_open, selectedSectionControls ) =>{
    const openSection = selectedSectionControls(true)
    const closeSection = selectedSectionControls(false)

    if( !show_build_with & !show_disclaimer && !show_creator){      // ....if all sections are closed....
      openSection()                                                   //open the section next frame     
      active_section_ref.current.closeActiveSection = closeSection    //set this section to close if another section is opened
    }else if(section_open){                                         // ....if the selected section is already open..
      closeSection()                                                   //close the section and reset the references
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
    
    return (
      <div className="alt_page">
        <div className="alt_page_card">

          {//<div className="content_card_header">About BC Vape Finder</div>
          }
          <p>BC Vape Finder is a catalog of vaping-related products that are sourced online from multiple vendors across the lower mainland. </p>
   
        <div className="author_info_section">
   
          <div onClick={e=>{toggleDetailSections(show_build_with, (setter) => ()=>setShowBuildWith(setter) )}}>
            {setActiveSectionIcon(show_build_with)} Project Details
          </div>
             
          <div onClick={e=>{toggleDetailSections(show_creator,  (setter) => ()=>setShowCreator(setter))}}>
            {setActiveSectionIcon(show_creator)} Creator Contact
          </div>
               
          <div onClick={e=>{toggleDetailSections(show_disclaimer, (setter) => ()=>setShowDisclaimer(setter) )}}>
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
           <div className="author_info">
            {wrapSentenceWordsWithDivs("For more information about the creator and his experience:")}    
            <div>{wrapCmpWithAnchorTag(<FaLinkedin size={'1.5em'} color={'blue'} />, "https://www.linkedin.com/in/m-domingues/")}
            {wrapCmpWithAnchorTag(<FaGithub size={'1.5em'}/>, "https://github.com/MiguellDomingues/")}</div>     
          </div>
          
        </CSSTransition>

        <CSSTransition timeout={500} unmountOnExit classNames="content-cards-section-animation" 
          in={show_disclaimer}
          onExited={openActiveSection}>
          <p className="disclaimer_msg">
            This website includes content that has been obtained through scraping publicly-available data sources. 
            Please note that the scraped data is not intended for commercial use or profit. I do not endorse or promote any products or services based on the scraped data.
            I do not claim ownership or copyright of the scraped data, and I acknowledge the intellectual property rights of the original authors and publishers of such information.
            I have used the data solely for demonstration purposes ONLY.
            </p>
        </CSSTransition>
          
        </div>     
      </div>)
}

export default About

function CheerioJSIcon(){
  return(
    <svg width="25" height="25" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="400" rx="30" fill="#E88C1F"/>
    <path d="m 312 122.5 c 0.2 -2.1 -1.4 -3.1 -2.5 -4.5 c -13.1 -15.8 -29.1 -27.9 -47.6 -36.3 c -10.6 
    -4.8 -22 -8 -33.9 -9.4 c -11.4 -1.4 -22.6 -2.1 -34 -0.8 c -14.5 1.6 -28.3 5.8 -41.5 12 c -21.1 9.9 
    -38 24.9 -51.3 43.6 c -8.5 11.8 -14.6 25.1 -18.2 39.4 c -3.7 14.6 -5.8 29.3 -4.2 44.5 c 1.1 10.4 2.6 
    20.5 5.7 30.5 c 4.5 14.6 11.8 27.9 21.1 39.9 c 10.6 13.7 23.4 25.1 38.5 33.5 c 17.5 9.7 36.3 15.5 56.4 16.7 c 
    7.4 0.4 14.8 0.5 22 -0.4 c 8.6 -1 17.2 -2.9 25.6 -5.5 c 10.4 -3.3 20.2 -7.6 29.4 -13.3 c 13.2 -8.2 25.1 
    -18 34.4 -31.1 c -21.9 -16.5 -43.8 -32.8 -65.9 -49.4 c -10.1 11.4 -22.4 17.2 -37.4 17.1 c -13.6 -0.2 -25.1 
    -5.7 -33.9 -15.6 c -17.8 -20 -15.2 -51.1 5.8 -68 c 18.7 -15.1 49.3 -13 65.5 7.2 c 22 -16.5 44 -33 66 -50.1 z"
    fill="#FFF" stroke="#000" strokeWidth="18"/>
    </svg>)
}

function EmailJSIcon(){
  return(
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 510.88 512" fill="#FCA253" alt="EmailJS">
    <rect x="270.57" width="240.31" height="240.31" rx="24"></rect> 
    <path d="M215.12 254.73V68.5a29.16 29.16 0 0 0-8.55-20.64 29.19 29.19 0 0 0-41.28 0L16.18 197a55.27 55.27 0 0 0 0 
      78.14l220.71 220.68a55.27 55.27 0 0 0 78.14 0l149.11-149.11a29.19 29.19 0 0 0 0-41.28l-1.14-1.12a29.16 29.16 0 0 
      0-20.64-8.55H256.15a41 41 0 0 1-41.03-41.03z">  
    </path>
  </svg>)
}


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