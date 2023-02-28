import './body.css'
import CardList from '.././cardList/CardList.js'

function Body( {query} ) {

  let { loading, error, data } = query

  console.log("data: ", data)
  console.log("loading: ", loading)

  if (error) return `Error! ${error.message}`;

  const { fetchMore } = query

  return(
    <main className="body">
      <CardList products={data ? data["getProducts"] : []} fetchMore={fetchMore} loading={loading}/>
    </main>
  );
}

export default Body;

