import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCategories } from '../services/api';

interface CategoriesProps {
  onLogout: () => void;
}

const Categories: React.FC<CategoriesProps> = ({ onLogout }) => {
  const [categories, setCategories] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        alert('Error cargando categorías');
      }
    };
    loadCategories();
  }, []);

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <div style={catStyles.container}>
      <header style={catStyles.header}>
        <h2 style={catStyles.title}>Categorías</h2>
        <button onClick={handleLogout} style={catStyles.logoutButton}>
          Cerrar Sesión
        </button>
      </header>
      <ul style={catStyles.list}>
        {categories.map((category) => (
          <li
            key={category}
            onClick={() => navigate(`/category/${category}`)}
            style={catStyles.listItem}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

const catStyles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '20px auto',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  title: {
    margin: 0,
    color: '#333',
  },
  logoutButton: {
    padding: '8px 12px',
    backgroundColor: '#dc3545',
    border: 'none',
    borderRadius: '4px',
    color: '#fff',
    cursor: 'pointer',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  listItem: {
    cursor: 'pointer',
    margin: '10px 0',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    transition: 'background-color 0.2s',
  },
};

export default Categories;
