import '../styles/about.css'

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

export default About