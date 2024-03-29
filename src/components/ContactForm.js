import emailjs from '@emailjs/browser';
import {useState, useRef } from 'react'
import { EMAILJS_INFO } from '../utils'

import '../styles/contactform.css'

const MAX_MESSAGE_LENGTH = 500

function ContactForm(){

    const [length_remaining, setLengthRemaining] = useState(MAX_MESSAGE_LENGTH)

    const [message_sent, setMessageSent] = useState(false)
    const [message_sending, setMessageSending] = useState(false)
    const [message_success, setMessageSuccess] = useState(undefined)
  
    const form_ref = useRef(null)
    const button_ref = useRef(null)
    const length_remaining_ref = useRef(null)
 
    const toggleSpan = (msg_length, span_ref) => {
      if( (msg_length > 0 && !span_ref.classList.contains("show_chars") ) || //if the textarea has text and the span is hidden
        (msg_length === 0 && span_ref.classList.contains("show_chars") )){ //or the textarea has no chars and the span is showing
          span_ref.classList.toggle("show_chars")}
    }
   
    //https://www.codingnepalweb.com/auto-resize-textarea-html-css-javascript/
    const textEntered = (e) => {
      toggleSpan(e.target.value.length, length_remaining_ref?.current)
      setLengthRemaining(MAX_MESSAGE_LENGTH-e.target.value.length)
      const textarea = e.target   
      textarea.style.height = "104px"; //+4 the height defined in css
      let scHeight = e.target.scrollHeight;
      textarea.style.height = `${scHeight}px`;
    }
  
    const sendEmail = (e) => {
      e.preventDefault(); // prevents the page from reloading when form submitted
      button_ref.current.style.visibility = "hidden" //hide the button
      form_ref.current.style.display = "none" //hide the form

      setMessageSent(true)
      setMessageSending(true)

      const { SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY } = EMAILJS_INFO
  
      emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form_ref.current, PUBLIC_KEY)
        .then((result) => {
            console.log(result.text);
            setMessageSuccess(true)
            setMessageSending(false)
        }, (error) => {
            console.log(error.text);
            form_ref.current.style.display = "flex"
            setMessageSuccess(false)
            setMessageSending(false)
        });   
    };
  
    function messageSuccess(){
      return(<p>
        Got it. Thanks for the message! I'll get back to you as soon as I can!
      </p>)
    }
  
    function messageFailed(){
      return(<p>
        Sorry, something went wrong! Email me directly at <a href="mailto:mdomingues1001@gmail.com">mdomingues1001@gmail.com</a>
      </p>)
    }
  
    return (<>
     
          {message_sent && (message_sending ? <>sending</> : message_success ? messageSuccess() : messageFailed())}
          <form ref={form_ref} className="contact_form" onSubmit={sendEmail}>
  
            <div className="contact_header_name_email">
              <input type="text" name="from_name" placeholder="Name" className="contact_name" required/>   
              <input type="email" name="reply_to" placeholder="Email" className="contact_email" required/>        
            </div>
  
            <div className="contact_body">
             <textarea name="message" maxLength={MAX_MESSAGE_LENGTH} spellCheck="false" placeholder="Message" className="contact_message" required onInput={textEntered}/>
            </div>
  
            <div className="contact_footer">
              <div ref={button_ref} className="send_message_btn" onClick={e=>{form_ref?.current.requestSubmit()}}>
                <span>Send Message!</span>
              </div>
              {<span ref={length_remaining_ref} className="chars_remaining">{length_remaining} characters remaining</span>}
            </div>
        </form>        
     
        </>);
};

export default ContactForm