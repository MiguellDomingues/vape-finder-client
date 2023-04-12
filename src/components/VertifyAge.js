import '../styles/vertifyage.css'
import useVertifyAge from '../hooks/useVertifyAge'
import {GiCheckMark} from 'react-icons/gi'
import { forwardRef } from 'react';

const VertifyAge = forwardRef( ({closeDOBPopup}, ref) => {

  const 
  [
    birth_date, error, 
    { onChange, validateInput, saveValidation }
  ] = useVertifyAge(closeDOBPopup)

  //an example of JSX spread attributes
  //move all the common props into an object as keys
  let input_props = {
    type:"text",
    onChange:onChange,
    minLength:"1",
    maxLength:"2",
    size:"4",
    required:true
  }
  //then {...input_props} the props, applying overrides when a spread prop is different

    return (
          <div 
            ref={ref} // the CSSTransition wrapper will set ref to this element
            className="age_vertification_overlay show_overlay no_select">
           <div className="date_input_container date_input_container_layout">
            <div className="date_input_heading date_input_heading_txt">
              <span className="date_input_heading_style">
                You must be 19+ to view the content on this website!
              </span>
            </div>
            <div className="date_input_txt">
              <span className="date_input_txt_style">
                This website has material not intended for anyone under the age of 19
              </span>
            </div>
            
            <div className="date_input_dmy">
              <div className="date_input_dmy_field">
                <input {...input_props} name="day" placeholder="DD" value={birth_date.day}/>
                Day   
              </div>
              <div className="date_input_dmy_field">
                <input {...input_props} name="month" placeholder="MM" value={birth_date.month}/>
                Month 
              </div>
              <div className="date_input_dmy_field">
                <input {...input_props} name="year" placeholder="YYYY" minLength="4" maxLength="4" value={birth_date.year}/>
                Year
              </div>         
            </div>   

            <div className="date_input_btn">       
              <button className="submit_btn" onClick={ validateInput }><GiCheckMark/></button>     
            </div>

            <div className="date_input_error">       
              <div className="date_input_error_style">&nbsp;{error}</div>
            </div>

            <div className="date_input_save_choice">       
              Save Vertification <input type="checkbox" onClick={ e=>saveValidation() }/>
            </div>

          </div>
      </div>
    )
  })

  export default VertifyAge