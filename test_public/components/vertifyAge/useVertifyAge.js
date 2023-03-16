import {useState} from 'react'
import moment from 'moment'

function useVertifyAge(enabled){

    const min_age = 19
  
    const [birth_date, setBirthDate] = useState({year: "" , month: "", day: ""})
    const [show, setShow] = useState(enabled)
    const [error, setError] = useState("")
  
    const onChange = e => setBirthDate( {...birth_date,[e.target.name]: e.target.value} )
  
    const validateInput = e => {
      e.preventDefault()
      
      const input_str = [ 
        birth_date.year.padStart(4, '0'), 
        birth_date.month.padStart(2, '0'), 
        birth_date.day.padStart(2, '0') 
      ].join('')
  
      const age = moment().diff(moment(input_str, 'YYYYMMDD'), 'years') 
  
      //still missing some edge cases, such as empty years will close the overlay
      if(!input_str.match(/^[0-9]+$/)){
        setError("date must contain only numbers")
      }else if(isNaN(age)){
        setError("please enter valid date")
      }else if(age < min_age){
        setError("you are not old enough to view this content")
      }else{
        setShow(false)
      }
    }
  
    return [
        birth_date, show, error,
        { onChange, validateInput }
    ]     
  }

  export default useVertifyAge