import './footer.css'

function Footer( {refetch} ) {

  const { selected_filters, setAndRefetch } = refetch
  const {category, brands, stores} = selected_filters

  const areFiltersSelected = category?.length > 0 || brands?.length > 0 || stores?.length > 0
  const insertWhitespace = num => new Array(num).fill('\u00A0', 0, num).join('')

    return (<footer className="footer">

      {!areFiltersSelected ?
          <> No Filters Selected !</> 
        :
          <> <button onClick={ (e)=>setAndRefetch() }>Clear</button> <button onClick={ (e)=>setAndRefetch(selected_filters) }>Test</button> <br/>
             Category: {category?.length > 0 ? `${category}` : " all categories selected"} <br/>
             Brands: {insertWhitespace(2)} {brands?.length > 0 ? brands.join(', ') : " All Brands"} <br/>
             Stores: {insertWhitespace(3)} {stores?.length > 0 ? stores.join(', ') : " All Stores"} <br/></>}
         
    </footer>);
  }
  
  export default Footer;
