import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../services/api';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (id) {
          const data = await getProductById(id);
          setProduct(data);
        }
      } catch (error) {
        alert('Error al cargar el producto');
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <div style={{ padding: '20px', textAlign: 'center' }}>Cargando...</div>;

  return (
    <div style={detailStyles.container}>
      <button onClick={() => navigate(-1)} style={detailStyles.backButton}>
        &larr; Volver
      </button>
      <div style={detailStyles.card}>
        <img src={product.image} alt={product.title} style={detailStyles.image} />
        <div style={detailStyles.content}>
          <h2 style={detailStyles.title}>{product.title}</h2>
          <p style={detailStyles.price}>${product.price}</p>
          <p style={detailStyles.description}>{product.description}</p>
          <div style={detailStyles.meta}>
            <span>Categoría: {product.category}</span>
            <span>Rating: {product.rating.rate} ({product.rating.count} reseñas)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const detailStyles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: '800px',
    margin: '20px auto',
    padding: '20px',
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
  card: {
    display: 'flex',
    gap: '30px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  },
  image: {
    maxWidth: '300px',
    height: 'auto',
  },
  content: {
    flex: 1,
  },
  title: {
    margin: '0 0 10px',
    color: '#333',
  },
  price: {
    fontSize: '24px',
    color: '#28a745',
    fontWeight: 'bold',
    margin: '0 0 10px',
  },
  description: {
    margin: '0 0 20px',
    lineHeight: '1.6',
    color: '#555',
  },
  meta: {
    display: 'flex',
    justifyContent: 'space-between',
    color: '#666',
  },
};

export default ProductDetail;
