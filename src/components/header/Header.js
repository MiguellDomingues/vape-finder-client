import './header.css'
import SearchBar from '../searchBar/SearchBar.js'

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
     
        <span className="header_title">BC VAPE FINDER</span>
      </div>

      
     <div><hr/></div>
      
      <div className="container_search_bar">
        <SearchBar refetch={refetch}/>
      </div>

    </div></>);
  }
  
  export default Header;