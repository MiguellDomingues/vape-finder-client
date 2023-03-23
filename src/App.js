//import Layout from './layout'
import useApp from './hooks/useApp'

import { useMediaQuery } from 'react-responsive';
import HeaderLayout from './layouts/headerLayout/HeaderLayout'
import SideBarLayout from './layouts/sidebarLayout/SideBarLayout'
import BodyLayout from './layouts/bodyLayout/BodyLayout'

import CardList from './components/cardList/CardList'
import VertifyAge from './components/vertifyAge/VertifyAge'
import './app.css'

function App( {SHOW_DOB_POPUP} ) {

  const [selected_filters_handlers, filter_tags_query, query,{ageVertified}] = useApp()

  const isMobile = useMediaQuery({ minWidth: 0, maxWidth: 800 });
  
    return( 
      <div className="page">
          {/*ageVertified(SHOW_DOB_POPUP) && <VertifyAge/>*/}
          {ageVertified(true) && <VertifyAge/>}
          <div className="app_flex_parent">
              
              <div className="header_flex_child">
                  <HeaderLayout 
                      selected_filters_handlers={selected_filters_handlers} 
                      filter_tags_query={filter_tags_query}
                      isMobile={isMobile}/>  
              </div>
              
   
              <div className="pillcontainer_flex_child">
                  {/*<PillContainer selected_filters_handlers={selected_filters_handlers} />*/ }
              </div>
              
  
              <div className="body_flex_child">
                  <div className="body_flex_parent">
  
                      {!isMobile && <div className="sidebar_flex_child">
                          <SideBarLayout 
                              selected_filters_handlers={selected_filters_handlers}
                              filter_tags_query={filter_tags_query}/>    
                      </div>}
  
                      <div className="cardlist_flex_child">
                      <BodyLayout selected_filters_handlers={selected_filters_handlers} query={query} isMobile={isMobile}/>
                          {/*<CardList query={query} selected_filters_handlers={selected_filters_handlers}/>*/}
                      </div>
  
                  </div>
              </div>
  
              <div className="footer_flex_child">    
                  <span className="about cursor_hand">About</span>            
              </div>
              
          </div> 
      </div>)
}

export default App;
