import '../styles/vertifyage.css'
import useVertifyAge from '../hooks/useVertifyAge'
import useOnClickOutside from '../hooks/useOnClickOutside'
import {GiCheckMark} from 'react-icons/gi'
import { RiCloseFill } from 'react-icons/ri';
import { forwardRef, useRef } from 'react';

const VertifyAge = forwardRef( ({closeDOBPopup}, ref) => {

  const img_src = '../../../health_warning.webp';

  const 
  [
    birth_date, error, 
    { onChange, validateInput, saveValidation }
  ] = useVertifyAge(closeDOBPopup)

  const inner_ref = useRef(null)

  useOnClickOutside(inner_ref, () => closeDOBPopup(null, false));

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
          <div ref={ref} // the CSSTransition wrapper will set ref to this element
              className="age_vertification_overlay show_overlay no_select">

           <div ref={inner_ref} className="date_input_container date_input_container_layout">

             <div>
                <img className="warning_img"
                  src={img_src}
                  alt="Health_Warning">
                </img>   
            </div>

            <div className="bottom">

              <div className="date_input_heading date_input_heading_txt">
                <span className="date_input_heading_style">
                The referenced website sells products not intended for anyone under the age of 19!
                </span>
              </div>
              <div className="date_input_txt_1">
                <span className="date_input_txt_style">
                  To continue, please enter your date of birth
                </span>
              </div>

              <div className="date_input_txt_2">
                <span className="date_input_txt_style">
                  enable <span className="date_input_txt_blue">Save Vertification</span> to prevent seeing this popup again
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

              <div className="date_input_btns">       
                <button className="submit_btn" onClick={ validateInput }><GiCheckMark/></button> 
                <button className="submit_btn" onClick={e=> closeDOBPopup(null, false) }><RiCloseFill/></button>     
              </div>

              <div className="date_input_error">       
                <div className="date_input_error_style">&nbsp;{error}</div>
              </div>

              <div className="date_input_save_choice">       
                <span className="date_input_txt_blue">Save Vertification</span> <input type="checkbox" onClick={ e=>saveValidation() }/>
              </div>
            </div>
          </div>
      </div>
    )
  })

  export default VertifyAge