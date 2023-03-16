
import useFilters from './hooks/useFilters'
import HeaderContainer from './containers/headerContainer/HeaderContainer'
import SideBarContainer from './containers/sidebarContainer/SideBarContainer'
import PillContainer from './components/pillContainer/PillContainer'
import CardList from './components/cardList/CardList'
import VertifyAge from './components/vertifyAge/VertifyAge'

export function Layout({selected_filters_handlers, query, SHOW_DOB_POPUP}){

    return( 
    <div className="page">
        <VertifyAge enabled={SHOW_DOB_POPUP}/>
        <div className="app_flex_parent">
            
            <div className="header_flex_child">
                <HeaderContainer selected_filters_handlers={selected_filters_handlers}/>  
            </div>
            
 
            <div className="pillcontainer_flex_child">
                <PillContainer selected_filters_handlers={selected_filters_handlers} /> 
            </div>
            

            <div className="body_flex_child">
                <div className="body_flex_parent">

                    <div className="sidebar_flex_child">
                        <SideBarContainer selected_filters_handlers={selected_filters_handlers}/>    
                    </div>

                    <div className="cardlist_flex_child">
                        <CardList query={query} selected_filters_handlers={selected_filters_handlers}/>
                    </div>

                </div>
            </div>

            <div className="footer_flex_child">    
                <span className="about cursor_hand">About</span>            
            </div>
            
        </div> 
    </div>)
}
