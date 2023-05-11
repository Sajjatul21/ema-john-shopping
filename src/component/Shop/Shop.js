import React, { useEffect, useState } from 'react';
import './Shop.css'
import Proudct from '../Product/Proudct';
import Cart from '../Cart/Cart';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);
    const handleAddToCart = (product) => {
        const newCart = [...cart, product];
        setCart(newCart);
    }
    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Proudct
                        key={product.id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                    ></Proudct>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>

            </div>
        </div>
    );
};

export default Shop;