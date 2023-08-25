import { CartState } from "../context/Context"
import SingleProduct from "./SingleProduct";
import Filters from "./Filters";
import "./style.css"
 
const Home = () => {

  const {
    state: { products },
    productState: { sort, bystock, byFastDelivery, byRating, searchQuery}
  } = CartState()

  const transformProducts = () => {
    let sortedProducts = products;

    if (sort) {
      sortedProducts = sortedProducts.sort((a,b) => 
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      )
    }
    
    if (!bystock) {
      sortedProducts = sortedProducts.filter((prod) => prod.inStock)
    }

    if (byFastDelivery) {
      sortedProducts = sortedProducts.filter((prod) => prod.fastDelivery)
    }

    if (byRating) {
      sortedProducts = sortedProducts.filter((prod) => prod.rating >= byRating
      )
    }

    if (searchQuery) {
      sortedProducts = sortedProducts.filter((prod) => 
      prod.name.toLowerCase().includes(searchQuery))
    }

    return sortedProducts;
  }

  return (
    <div className="home">

      <Filters/>

      <div className="productContainer">
        {transformProducts().map((prod) => {
          return <SingleProduct prod={prod} key={prod.id}/>
        })}
      </div>

    </div>
  )
}

export default Home
