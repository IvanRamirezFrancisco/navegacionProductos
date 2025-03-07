import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductsByCategory } from '../services/api';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category?: string;
}

const Products = () => {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        if (category) {
          const data = await getProductsByCategory(category);
          setProducts(data);
        }
      } catch (error) {
        alert('Error cargando productos');
      }
    };
    loadProducts();
  }, [category]);

  return (
    <div style={prodStyles.container}>
      <button onClick={() => navigate('/')} style={prodStyles.backButton}>
        &larr; Volver a Categorías
      </button>
      <div style={prodStyles.grid}>
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
            style={prodStyles.card}
          >
            <img src={product.image} alt={product.title} style={prodStyles.image} />
            <div style={prodStyles.info}>
              <h3 style={prodStyles.title}>{product.title}</h3>
              <p style={prodStyles.price}>${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const prodStyles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '20px',
    maxWidth: '1000px',
    margin: '20px auto',
  },
  backButton: {
    padding: '8px 12px',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '4px',
    color: '#fff',
    cursor: 'pointer',
    marginBottom: '20px',
  },
  grid: {
    display: 'grid',
    gap: '20px',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  },
  card: {
    cursor: 'pointer',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '10px',
    backgroundColor: '#fff',
    transition: 'transform 0.2s',
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'contain',
  },
  info: {
    marginTop: '10px',
  },
  title: {
    fontSize: '16px',
    margin: '0 0 10px',
    color: '#333',
  },
  price: {
    margin: 0,
    fontWeight: 'bold',
    color: '#28a745',
  },
};

export default Products;
