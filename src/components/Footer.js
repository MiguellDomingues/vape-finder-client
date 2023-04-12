import { Link } from "react-router-dom";
import { PAGE_URIS } from "../utils.js";

import "../styles/footer.css"

function Footer({
    current_location,
    toggleSidebar,
}){

    const stylePageLink = ((curr_loc) => (link_uri) => link_uri === curr_loc ? "current_page_link" : "")(current_location);

    return(<>
      <Link onClick={e=>toggleSidebar(false)} to={PAGE_URIS.HOME}>
        <span className={stylePageLink(PAGE_URIS.HOME)}>Home</span>
      </Link> 
      <Link onClick={e=>toggleSidebar(false)} to={PAGE_URIS.ABOUT}>
        <span className={stylePageLink(PAGE_URIS.ABOUT)}>About</span>
      </Link> 
      <Link onClick={e=>toggleSidebar(false)} to={PAGE_URIS.CONTACT}>
        <span className={stylePageLink(PAGE_URIS.CONTACT)}>Contact Me</span>
      </Link> 
    </>)
}

  export default Footer


  