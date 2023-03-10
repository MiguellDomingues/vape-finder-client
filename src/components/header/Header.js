import './header.css'

const img_src = '../../../health_warning.webp';

function Header( {refetch} ) {
  //console.log(refetch)
    return ( 
    <><div className="container_header">

      <div className="top">

        <img className="warning_img"
          src={img_src}
          alt="Health_Warning">
        </img>
     
      </div>

      
     <div><hr/></div>
      
      <div className="container_search_bar">
      <span className="header_title">BC VAPE FINDER</span>
        <span className="about cursor_hand">About</span>    
      </div>

    </div></>);
  }
  
  export default Header;