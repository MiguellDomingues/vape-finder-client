import Layout from './layout'
import useApp from './hooks/useApp'
import './app.css'

function App( {SHOW_DOB_POPUP} ) {

  const [selected_filters_handlers, query,{ageVertified}] = useApp()

  return ( <><Layout selected_filters_handlers={selected_filters_handlers} query={query} SHOW_DOB_POPUP={ageVertified(true)}/></>);//SHOW_DOB_POPUP
}

export default App;

