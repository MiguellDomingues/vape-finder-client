import './card.css'

//can also link images using import or require() 
//import demoImage from './demo.webp'; 

const img_src = '../../../demo.webp';

function Card( {product} ) {
  //const {id, name, brand, category, img, price, last_updated, source} = product

  const {id, last_updated, source_id, source_url, brand, category, name, price, info_url, } = product
  //const{  } = product_info

  const vendor = source_url.split("//")[1].split(".")[0] //remove the domain name from the product source
  const format_price = price.toFixed(2); //limit the cents in the price to 2 decimal places (dollar).(cents)

  let format_name = name.toLowerCase().replace( brand ? brand.toLowerCase() : '', '').trim() //if the brand is in the product name, remove it
  format_name = format_name.replace(/^[^A-Z0-9]+|[^A-Z0-9]+$/ig, '') //remove all start/end nonalphanumeric chars

  //if(format_name.includes(' - ')) format_name = format_name.replace(' - ', ' ').trim()

  //rel="noopener noreferrer" is to prevent 'tabnabbing', a kind of phishing attack
 
  return (
    <div className="card">
      
      <a href={info_url} target="_blank" rel="noopener noreferrer">{vendor}<br/></a>
      {brand && <><span>{brand}<br/></span></> }    
      <span className="title">{format_name}<br/></span>   
      <span>${format_price}<br/></span>

      <img className="product_img"
        src={img_src}
        alt="Product">
      </img>

      <div className="card_footer">
        <span>last updated: {last_updated}</span>
      </div>
      
    </div>
  );
}

export default Card;

