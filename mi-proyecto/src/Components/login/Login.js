// src/Login.js
import React, { useState } from 'react';
import "../login/login.css";
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Inicializamos useNavigate

  const handleSubmit = (event) => {
    event.preventDefault();

    if (email && password) {
      // Simulación de autenticación exitosa
      navigate('/home');
    } else {
      // Manejar el error de autenticación
      alert('Por favor, ingresa correo electrónico y contraseña.');
    }
  };

  return (
    <section className="vh-100 login-section">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6 text-black d-flex justify-content-center align-items-center">
            <div className="form-container">
              <form style={{ width: '23rem' }} onSubmit={handleSubmit}>
              <div className="pt-2 mb-4 text-center">
                <h3 className="fw-normal mb-3 pb-3 login-title">Bienvenido</h3>
                </div>
                <div className="form-outline mb-4 mt-4">
                  <label className="form-label" htmlFor="form2Example18">Email address</label>
                  <input
                    type="email"
                    id="form2Example18"
                    className="form-control form-control-lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="form2Example28">Password</label>
                  <input
                    type="password"
                    id="form2Example28"
                    className="form-control form-control-lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="pt-2 mb-4 text-center"> {/* Agregamos text-center */}
                  <button className="btn btn-info btn-lg btn-block" type="submit">
                    Login
                  </button>
                </div>
                <p className="small mb-4 pb-lg-2 text-center">
                  <a className="text-muted" href="#!">
                    Forgot password?
                  </a>
                </p>
                <div className="register-link-container">
                  <p>Don't have an account?</p>
                  <a href="#!" className="link-info register-link">
                    Register here
                  </a>
                </div>
              </form>
            </div>
          </div>
          <div className="col-sm-6 px-0">
            <img
              src="https://cdn.prod.website-files.com/5c0923437b3820198bab7be0/676434e0727a84fa3d85b137_62263c0f451119a7132b3306_diferencia%2520conjunto%2520y%2520condominio%2520portada.jpeg"
              alt="Login image"
              className="w-100 vh-100 rounded-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;