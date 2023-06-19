import React, { useEffect, useState } from 'react';
import './Shop.css'
import Proudct from '../Product/Proudct';
import Cart from '../Cart/Cart';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data));
    }, []);

    useEffect(() => {
        const storeCart = getShoppingCart();
        // console.log(storeCart)
        const saveCart = [];
        for (const id in storeCart) {
            const addedProduct = products.find(product => product.id === id);
            // console.log(addedProduct)
            if (addedProduct) {
                const quantity = storeCart[id];
                addedProduct.quantity = quantity;
                saveCart.push(addedProduct)
            }
        }
        setCart(saveCart);
    }, [products])


    const handleAddToCart = (selectedProduct) => {
        // console.log(selectedProduct)

        const exist = cart.find(product => product.id === selectedProduct.id);
        console.log(exist)
        let newCart = [];
        if (!exist) {
            selectedProduct.quantity = 1;
            // console.log(selectedProduct)
            newCart = [...cart, selectedProduct];
        }
        else {

            const rest = cart.filter(product => product.id !== selectedProduct.id);   // [2-1,3-1]
            //[2,3]

            exist.quantity = exist.quantity + 1;
            newCart = [...rest, exist];
        }

        setCart(newCart);

        addToDb(selectedProduct.id);
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