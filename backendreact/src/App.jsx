import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [products, setProducs] = useState([])
  const [data, setData] = useState(null); //try axios.defaults.withCredentials = true;
  const [role, setRole] = useState(undefined); // Initial role state
  const headers = { withCredentials: true }
  useEffect(() => {
    axios("http://localhost:8080/api/products", headers) //buscar forma de conceguir las cookies
      .then(res => setProducs(res.data.response))
      .catch(err => console.log(err))
  }, [])
  useEffect(() => {
    // Function to extract JWT token from cookies
    const extractJWTFromCookies = () => {
      const cookieValue = document.cookie
        // console.log("asdasdasd", document.cookie)
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];
      if (cookieValue) {
        try {
          const decodedToken = JSON.parse(atob(cookieValue.split('.')[1])); // Decoding JWT token
          setData(decodedToken); // Setting user data extracted from JWT token
          console.log("si", decodedToken);
          const { role } = decodedToken
          setRole(role)
          console.log("role", role);
        } catch (error) {
          console.error('Error decoding JWT token:', error);
        }

      }
    };
    extractJWTFromCookies();


  }, []);
  return (
    <>
      <header className="bg-light py-3">
        <nav class="container navbar navbar-expand-lg navbar-light">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">My Shop</a>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="#">
                    Home
                  </a>
                </li>
                {role === 0 && (
                  <li class="nav-item">
                    <a class="nav-link" href="#">
                      Orders
                    </a>
                  </li>
                )}
                {role === 1 && (
                  <li class="nav-item">
                    <a class="nav-link" href="#">
                      Form
                    </a>
                  </li>
                )}
                {role === undefined && (
                  <>
                    <li class="nav-item">
                      <a class="nav-link" href="#">Login</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">Register</a>
                    </li>
                  </>
                )}
              </ul>
              <button class="btn btn-outline-success">Sign Out</button>
            </div>
          </div>
        </nav>
      </header>

      <main class="container py-4">
        <h2>Filtros</h2>
        <form class="row gy-3">
          <div class="col-12">
            <label for="filters" class="form-label">
              Escribe tus filtros:
            </label>
            <input
              type="text"
              id="filter"
              name="filters"
              class="form-control"
              placeholder="Escribe aquí..."
            />
          </div>
          <div class="col-12">
            <label for="sorters" class="form-label">
              Escribe tu sort:
            </label>
            <input
              type="text"
              id="sort"
              name="sorters"
              class="form-control"
              placeholder="Escribe aquí..."
            />
          </div>
          <div class="col-12">
            <button id="buscar" type="submit" class="btn btn-primary">
              Buscar
            </button>
          </div>
        </form>

        {products.length > 0 && (
          <ul class="row row-cols-1 row-cols-md-3 g-4">
            {products.map((each) => (
              <li class="col" key={each._id}>
                <div class="card">
                  <img src={each.photo} class="card-img-top" alt={each.name} />
                  <div class="card-body">
                    <h5 class="card-title">{each.name}</h5>
                    <p class="card-text">Price: ${each.price}</p>
                    <p class="card-text">Stock: {each.stock}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {products.length === 0 && <p>No products available.</p>}
      </main>

      <footer class="text-center py-3">el footer mas fachero que viste en tu vida</footer>
    </>
  )
}

export default App
