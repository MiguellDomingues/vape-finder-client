import '../styles/about.css'

import { FaGithub, FaNodeJs, FaReact, FaLinkedin } from 'react-icons/fa';
import { SiMongodb, SiRealm, SiApollographql, SiReactrouter, SiHeroku, SiGraphql, SiCreatereactapp } from 'react-icons/si';
//MAKE THE ABOUT PAGE YOUR HOME PAGE
//introduce apps
//use this as domain name
//LINK TO YOUR PRODUCT PAGE
// REPLACE header as you change pages
//register own domain and https
//create a new project for a temp projects page
//link to bc vape finder
function About(){

    const LinkTagWrapper = (cmp, url) =>
      <a className="pointer_link" href={url} target="_blank" rel="noopener noreferrer"><cmp.type {...cmp.props}/></a>
    

    return (
      <div className="alt_page">
        <div className="alt_page_card">

          <div className="content_card_header">About BC Vape Finder</div>
          <p>
            BC Vape Finder is a web application which allows users to search a catalog of vaping-related products that are sourced from multiple online vendors across the lower mainland. 
          </p>

               
          <p>
            This project is very much a work in progress: i'm experimenting new features, the look, feel, usability of the site, playing around with different
            frameworks and frontend, backend implementations and technologies?
          </p>

          <p>
            For more technical details about the project details about the Author, check out the site
          </p>

          <>{//move these to the side of the card, like a tab
          }
          {LinkTagWrapper(<FaLinkedin size={'1.5em'} color={'blue'} />, "https://www.linkedin.com/in/m-domingues/")}
          {LinkTagWrapper(<FaGithub size={'1.5em'}/>, "https://github.com/MiguellDomingues/")}
          </>
        <div className="content_card_layout">

        

          <div className="content_card">
            <div className="content_card_header">Website</div>
            <div className="icons_layout">
              {LinkTagWrapper(<FaGithub size={'1.5em'}/>, "https://github.com/MiguellDomingues/vape-finder-client")}
              {LinkTagWrapper(<FaReact size={'1.5em'} color={'#087ea4'}/>, "https://react.dev/")}
              {LinkTagWrapper(<SiCreatereactapp size={'1.5em'} color={'#087ea4'}/>, "https://create-react-app.dev/")}
              {LinkTagWrapper(<SiReactrouter size={'1.5em'}/>, "https://reactrouter.com/en/main")}
              {LinkTagWrapper(<SiApollographql size={'1.5em'}/>, "https://www.apollographql.com/")}
              {LinkTagWrapper(<SiRealm size={'1.5em'}/>, "https://realm.io/")}
              {LinkTagWrapper(<SiGraphql size={'1.5em'}/>, "https://graphql.org/")}
            </div>
          </div>

          <div className="content_card">
            <div className="content_card_header">Data Acquisition</div>
            <div className="icons_layout">
            {LinkTagWrapper(<FaGithub size={'1.5em'}/>, "https://github.com/MiguellDomingues/vape-finder-scraper")}
            {LinkTagWrapper(<FaNodeJs size={'1.5em'} />, "https://nodejs.org/en")}
            {LinkTagWrapper(<CheerioJSIcon/>, "https://cheerio.js.org/")}
            </div>
          </div>

          <div className="content_card">
            <div className="content_card_header">Service Providers</div>
            <div className="icons_layout">
              {LinkTagWrapper(<SiHeroku size={'1.5em'}/>, "https://www.heroku.com/home?")}
              {LinkTagWrapper(<SiMongodb size={'1.5em'} color={'green'}/>, "https://www.mongodb.com/atlas/database")}
              {LinkTagWrapper(<EmailJSIcon/>, "https://www.emailjs.com/")}
            </div>
          </div>

        </div>

          <p className="disclaimer_msg">
          This website includes content that has been obtained through scraped publicly-available data sources. 
          Please note that the scraped data is not intended for commercial use or profit. I do not endorse or promote any products or services based on the scraped data.
          I do not claim ownership or copyright of the scraped data, and I acknowledge the intellectual property rights of the original authors and publishers of such information.
          I have used the data solely for demonstration purposes ONLY.
          </p>

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

 /* 

 BC Vape Finder is a consolidated inventory of vaping-related products from multiple online vendors across the lower mainland.

You may 

  

             To website was created as a single page application 
          
             To create the inventory, I created an 
             <a className="pointer_link" href="https://github.com/MiguellDomingues/vape-finder-scraper" target="_blank" rel="noopener noreferrer">automated process</a> 
             that scraped online storefronts for product information, which was cleaned and categorized into a unified dataset



            <details>
    <summary>Front End</summary>
    .
</details>

 Hi. i'm Miguel. 
            Welcome to BC Vape Finder: a consolidated inventory of vaping-related products from multiple online vendors across the lower mainland.

 I created this web application to allow users to search a consolidated inventory of vaping-related products from online vendors across 
 the lower mainland. Maybe put this section in respective repos?----- To gather the data, I created an automated process that 
 scraped online storefronts for product information, which was cleaned and categorized into a unified dataset and inserted into the cloud ------



 
 <div className="content_card_header">About Me</div>
          <p>Hi! My name is Miguel! I'm a (budding?) full-stack developer and lover of all things programming! I have built stuff across a variety of 
            technologies in school, . I'm currently exploring js implementing 
          </p>
 
 <p>

         <p>
          This website includes content that has been obtained through scraping publicly-available data sources, such as government websites, public records, and online directories. 
          While I strive to ensure the accuracy and completeness of the information presented on our website, I cannot guarantee the reliability or currency of the data obtained 
          through scraping, as it may be subject to errors, omissions, or changes.
          </p>
  
          <p>
          Please note that the scraped data is not intended for commercial use or profit. I do not endorse or promote any products or services based on the scraped data.
          I do not claim ownership or copyright of the scraped data, and I acknowledge the intellectual property rights of the original authors and publishers of such information.
          I have used the data solely for demonstration purposes ONLY.
          </p>
  
          <p>
          However, I recognize that some individuals or organizations may object to the use of their information on our website. If you are the owner of any data that has been scraped and used on this website, 
          and you wish to have it removed or corrected, please leave a message.
          </p>


        By using my website, you agree to this disclaimer and acknowledge that we are not responsible for any damages, losses, or liabilities that may arise from your reliance on the scraped data or the 
        content presented on my website. You also agree to comply with all applicable Canadian laws and regulations governing the use of public data and online content.
    </p> */ 

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