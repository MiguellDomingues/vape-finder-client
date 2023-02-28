import './vertifyAge.css'

import useVertifyAge from './useVertifyAge'

function VertifyAge( { enabled } ){

  const 
  [
    birth_date, show, error,
    { onChange, validateInput }
  ] = useVertifyAge(enabled)

  //an example of JSX spread attributes
  //move all the common props into an object as keys
  let input_props = {
    type:"text",
    onChange:onChange,
    minLength:"1",
    maxLength:"2",
    size:"2",
    required:true
  }

  //then {...input_props} the props, applying overrides when a spread prop is different

    return (
      <>{show && <>
          <div className={`age_vertification_overlay show_overlay no_select`}>
           <div className="date_input">
            <h1>You must be 19+ to view the content on this website!</h1>
            <h1>This website has material not intended for anyone under the age of 19</h1>
              <input {...input_props} name="day" placeholder="DD" value={birth_date.day}/>         
              <input {...input_props} name="month" placeholder="MM" value={birth_date.month}/>            
              <input {...input_props} name="year" placeholder="YYYY" minlength="4" maxlength="4" value={birth_date.year}/>            
              <input type="submit" name="enter" placeholder="Year" onClick={ validateInput }/>
              <br/>
              {error}
            </div>
      </div>
    </>}</>)
  }

  export default VertifyAge