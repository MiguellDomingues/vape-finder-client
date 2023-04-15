import SideBar from '../components/SideBar'
import Body from '../components/Body'
import { CSSTransition } from 'react-transition-group';
import {useState} from 'react'

import '../styles/home.css'

function Home({
    selected_filters_handlers,
    filter_tags_query,
    query,
    isMobile,
}){

    const [sidebar_open, toggleSidebar ] = useState(false)

    return(<>
        <CSSTransition 
            timeout={1000} 
            unmountOnExit 
            classNames="show-filters-animation" 
            in={!isMobile && sidebar_open}>
                <div className="sidebar_flex_child">
                    <SideBar 
                        selected_filters_handlers={selected_filters_handlers}
                        filter_tags_query={filter_tags_query}/>    
                </div>
        </CSSTransition>

        <Body
            selected_filters_handlers={selected_filters_handlers} 
            query={query} 
            isMobile={isMobile} 
            toggleSidebar={()=> toggleSidebar(!sidebar_open)}
            sidebar_open={sidebar_open}/>
    </>)
}

export default Home