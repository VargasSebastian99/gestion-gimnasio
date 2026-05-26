import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import bg from "../assets/fondoGimnasio.jpg";
import logo from "../assets/LogoPesaoGYm.png";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");   
  const navigate = useNavigate();
 
    const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
        const response = await axios.post("http://localhost:8080/auth/login", {
        username,
        password,
        });

        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");

    } catch (err) {
        setError("Credenciales incorrectas");
    }
    };

  return (
    <div
  className="h-screen w-full bg-cover bg-center bg-no-repeat"
  style={{ backgroundImage: `url(${bg})` }}
>

      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <div className="bg-white/95 backdrop-blur-md p-10 rounded-xl shadow-2xl w-full max-w-sm">

          <div className="flex justify-center mb-6">
            <img
              src={logo}
              alt="Logo"
              className="w-24 h-24 drop-shadow-lg"
            />
          </div>

          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Bienvenido
          </h1>

          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Usuario"
              className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type="password"
              placeholder="Contraseña"
              className="w-full mb-6 p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
              <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold transition shadow-md"
            >
              Ingresar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
