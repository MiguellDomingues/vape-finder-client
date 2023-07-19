
import  ContactForm  from '../components/ContactForm'
import '../styles/contactpage.css'

function ContactPage(){

    return (
      <div className="alt_page">
        <div className="alt_page_card">
            <p>Questions? Opportunities? Suggestions? Leave a message!</p>
            <ContactForm/>
      </div>
    </div>
  );
};

export default ContactPage