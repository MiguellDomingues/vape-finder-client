
import { useMediaQuery } from 'react-responsive';
import HeaderLayout from './layouts/headerLayout/HeaderLayout'
import SideBarLayout from './layouts/sidebarLayout/SideBarLayout'

import CardList from './components/cardList/CardList'
import VertifyAge from './components/vertifyAge/vertifyAge'

import './layout.css'

export default function Layout({selected_filters_handlers, query, SHOW_DOB_POPUP,filter_tags_query,}){

    //const isDesktop = useMediaQuery({ minWidth: 800 });
    const isMobile = useMediaQuery({ minWidth: 0, maxWidth: 800 });



    return( 
    <div className="page">
        {SHOW_DOB_POPUP && <VertifyAge/>}
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
