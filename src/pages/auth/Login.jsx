import React, { useState } from "react";
import { FiUser, FiLock, FiLogIn } from "react-icons/fi";
import "./Login.css";
import { useLogin } from "../../api/hooks/useUser";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../api/axiosConfig";
import axios from "axios";
import Swal from "sweetalert2";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { mutate: login, isLoading } = useLogin();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    login(
      { username, password },
      {
        onSuccess: async (data) => {
          localStorage.setItem("bk_token", data.token);
          console.log(data);
          console.log("Token guardado, buscando datos del usuario...");

          try {
            console.log(`${API_BASE_URL}users/by-username/${username}`);
            const res = await axios.get(`${API_BASE_URL}/users/by-username/${username}`.replace(/([^:]\/)\/+/g, "$1"), {
              headers: {
                Authorization: `Bearer ${data.token}`,
              },
            });

            const user = res.data;

            localStorage.setItem("bk_userId", user.id);
            localStorage.setItem("bk_name", user.name);
            localStorage.setItem("bk_username", user.username);
            localStorage.setItem("bk_companyId", user.company?.id);
            localStorage.setItem("bk_role", user.role);

            console.log("Datos del usuario guardados");
            navigate("/");
          } catch (err) {
            console.error("Error al obtener datos del usuario", err);
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "No se pudieron obtener los datos del usuario.",
            });
          }
        },
        onError: () => {
          Swal.fire({
            icon: "error",
            title: "Credenciales incorrectas",
            text: "El usuario o la contraseña son incorrectos.",
          });
        },
      }
    );
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>
          <FiLogIn /> Iniciar Sesión
        </h2>

        <div className="input-group">
          <label htmlFor="username">
            <FiUser /> Usuario
          </label>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Ingresa tu usuario" required />
        </div>

        <div className="input-group">
          <label htmlFor="password">
            <FiLock /> Contraseña
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingresa tu contraseña"
            required
          />
        </div>

        <button type="submit" disabled={isLoading}>
          <FiLogIn /> {isLoading ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
}
