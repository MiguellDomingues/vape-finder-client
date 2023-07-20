import useApp from './hooks/useApp'
import Header from './components/Header'
import Footer from './components/Footer'
import ContactPage from './routes/ContactPage'
import About from './routes/About'
import Home from './routes/Home'
import Error from './routes/Error'

import { Route, Routes } from "react-router-dom";
import { PAGE_URIS } from "./utils.js";

import './styles/app.css'

function App() {

  const [
    selected_filters_handlers, 
    filter_tags_query, 
    history,
    query, 
    isMobile] = useApp()

    return(
      <div className="page">
          <div className="app_flex_parent">
              
            <div className="header_flex_child">
              <Header
                selected_filters_handlers={selected_filters_handlers} 
                filter_tags_query={filter_tags_query}
                history={history}
                isMobile={isMobile}/>
            </div>
 
            <div className="body_flex_parent">
              <Routes>
                <Route path={PAGE_URIS.HOME} element={
                  <Home
                  selected_filters_handlers={selected_filters_handlers}
                  filter_tags_query={filter_tags_query}
                  history={history}
                  query={query}
                  isMobile={isMobile}/>}/>
              <Route path={PAGE_URIS.ABOUT} element={<About/>}/>                    
              {/*<Route path={PAGE_URIS.CONTACT} element={<ContactPage/>}/>*/}
              <Route path="*" element={<Error/>} />
            </Routes>
          </div>

          {/*<div className="footer_flex_parent">
            <Footer current_location={location.pathname}/>    
                </div>  */ }

        </div> 
      </div>)
}

export default App;


