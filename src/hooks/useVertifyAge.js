import { useState, useRef } from 'react'
import moment from 'moment'
import { MIN_AGE} from '../utils'

function useVertifyAge(closeDOBPopup){

    const [birth_date, setBirthDate] = useState({year: "" , month: "", day: ""})
    const [error, setError] = useState("")
    const save_vertification = useRef(false)
    
    const onChange = e => setBirthDate( {...birth_date,[e.target.name]: e.target.value} )

    const saveValidation = _ => save_vertification.current = !save_vertification.current
    
    const validateInput = e => {
      e.preventDefault()
      
      const input_str = [                                                      // pad d/m with 0-1 zeros, year with 0-4 zeros, then concantenate the strings
        birth_date.year.padStart(4, '0'), 
        birth_date.month.padStart(2, '0'), 
        birth_date.day.padStart(2, '0') 
      ].join('')
      
      const age = moment().diff(moment(input_str, 'YYYYMMDD'), 'years')       // validate YYYYMMDD format and get the diff in years from current time
      
      if(!input_str.match(/^[0-9]+$/)){                                       // if the date has non-numbers....
        setError("date must contain only numbers")
      }else if(isNaN(age)){                                                   // if the days/months are invalid
        setError("please enter valid date")                                   
      }else if(age > 110){                                                    // if the year is before 1913
        setError("please enter a valid year")
      }else if(age < MIN_AGE){                                                
        setError("you are not old enough to view this content")
      }else{                                                             
          closeDOBPopup(save_vertification.current)    
      }
    }
  
    return [
        birth_date, error,
        { onChange, saveValidation, validateInput }
    ]     
  }

  export default useVertifyAge