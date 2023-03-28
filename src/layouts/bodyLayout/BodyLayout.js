
import  usePillList  from '../../hooks/usePillList'
import CardList from '../../components/cardList/CardList'
import {  PillList } from '../../widgets/widgets.js'
import { FILTER_KEYS } from '../../utils.js'
import './bodylayout.css'

function BodyLayout( {selected_filters_handlers, query, isMobile} ){

    const { selected_filters } = selected_filters_handlers

    const [areFiltersSelected,{handleRemove, clearAll}] = usePillList(selected_filters_handlers)

    const { category, stores, brands, } = selected_filters

    return (<div className="body_layout_pill_list">
        
        {<div className="pill_list">
            {areFiltersSelected && <button onClick={ (e)=>clearAll() }>Clear All</button>}
            <PillList pills={category} filter_key={FILTER_KEYS.CATEGORIES} handleRemove={!isMobile ? handleRemove : null} />   
            <PillList pills={brands} filter_key={FILTER_KEYS.BRANDS} handleRemove={!isMobile ? handleRemove : null} />
            <PillList pills={stores} filter_key={FILTER_KEYS.STORES} handleRemove={!isMobile ? handleRemove : null} />
        </div>}
        <div className="body_layout_card_container">
            <CardList query={query} selected_filters_handlers={selected_filters_handlers}/>
        </div>
             
    </div>)
}

export default BodyLayout