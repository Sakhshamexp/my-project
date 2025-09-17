import "./App.css";
import ProductCard from "./components/ProductCard";

function App() {
  return (
    <div className="container">
      <h2 className="title">Products List</h2>
      <div className="products">
        <ProductCard name="Gaming Headset" price={59.99} inStock={true} />
        <ProductCard name="Mechanical Keyboard" price={89.5} inStock={false} />
        <ProductCard name="4K Monitor" price={329.99} inStock={true} />
      </div>
    </div>
  );
}

export default App;
