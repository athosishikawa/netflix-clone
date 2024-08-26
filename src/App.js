import './App.css';
import { getCategories } from './api';
import Row from './components/Row'
import Banner from "./components/Banner"
import Nav from "./components/Nav"
import { useEffect, useState } from 'react';

function App() {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
      const fetchCategories = async () => {
          try {
              const result = await getCategories();
              setCategories(result);
          } catch (error) {
              console.error("Failed to fetch categories:", error);
          }
      };

      fetchCategories();
  }, []);

  return (
    <div>

        {/*Navbar*/}
        {/*Banner*/}
        {/*Categorias - Linhas*/}

        <Nav></Nav>
        <Banner></Banner>
        
        {categories.map( (category) => {
        
            return  <Row 
                         key={category.name}
                         title={category.title} 
                         isLarge={category.isLarge}
                         path={category.path}
                    />

        })}

    </div>
  );
}

export default App;