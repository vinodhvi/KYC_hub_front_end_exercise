import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Modal } from 'antd';
import ProductDetails from './product-details';

const CompareProduct = () => {
  const location = useLocation();
  const [productsToCompare, setProductsToCompare] = useState(location.state?.selectedProducts || []);
  const [isModalVisible, setIsModalVisible] = useState(false);
// Remove products
  const removeProduct = (id) => {
    setProductsToCompare((prevProducts) => prevProducts.filter((product) => product.id !== id));
    alert("Need to remove the product")
  };
// Remove products
// Handle add more
  const handleAddMore = () => {
    setIsModalVisible(true);
  };
  // Handle add more
// Handleadd products 
  const handleAddProducts = (product) => {
    if (productsToCompare.find((p) => p.id === product.id)) {
      alert('Product is already selected for comparison');
      
    } else if (productsToCompare.length >= 4) {
      alert('Only 4 products compared at a time');
    } else {
      setProductsToCompare((prevProducts) => [...prevProducts, product]);  
      setIsModalVisible(false);  
    }
  };
// Handleadd products 
  return (
    <div className='compare-products'>
      <div className='compare-add'>
        <h2>Compare Products</h2>
        <Button onClick={handleAddMore} className='add-more'>Add More</Button>
      </div>

      <div className='compare-section'>
        {productsToCompare.map((product) => (
          <div className='products-section' key={product.id}>
            <img src={product.thumbnail} alt={product.title}  />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>Brand: {product.brand}</p>
            <p>Price: ${product.price}</p>
            <Button onClick={() => removeProduct(product.id)}>Remove</Button>
            
          </div>
        ))}
      </div>

      <Modal
        title="Add More Products"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
     <ProductDetails onCompare={handleAddProducts} isComparePage={true} />

      </Modal>
    </div>
  );
};

export default CompareProduct;
