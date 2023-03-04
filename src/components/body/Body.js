import './body.css'
import CardList from '.././cardList/CardList.js'

function Body( {query, selected_filters_handlers} ) {

  let { loading, error, data } = query

  console.log("data: ", data)
  console.log("loading: ", loading)

  const { fetchMore } = query

  return(
    <main className="body">
      {error && <>Error! {error.message}</>}
      <CardList 
        products={data ? data.products : []} 
        fetchMore={fetchMore} 
        loading={loading} 
        selected_filters_handlers={selected_filters_handlers}/>
    </main>
  );
}

export default Body;

