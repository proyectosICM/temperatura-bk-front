import { useEffect, useState } from "react";
import { useGetRoles } from "../../../api/hooks/useUser";

const ROLE_HIERARCHY = {
  SA: 4,
  ADMIN: 3,
  TECHNICIAN: 2,
  USER: 1,
};

const UserModal = ({ isEdit = false, initialData = {}, onClose, onSave }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [active, setActive] = useState(true);

  const companyId = localStorage.getItem("bk_companyId");
  const currentUserRole = localStorage.getItem("bk_role") || "USER";

  const { data: roles = [], isLoading, isError } = useGetRoles();

  useEffect(() => {
    setName(initialData.name || "");
    setEmail(initialData.email || "");
    setUsername(initialData.username || "");
    setPassword("");
    setRole(initialData.role || "USER");
    setActive(initialData.active ?? true);
  }, [initialData]);

  const handleSave = () => {
    if (!name.trim() || !email.trim() || !username.trim() || (!isEdit && !password.trim())) return;

    const userData = {
      name: name.trim(),
      email: email.trim(),
      username: username.trim(),
      password: password.trim(),
      role,
      active,
      companyId,
    };

    onSave(userData);
  };

  // Filtrar roles según jerarquía
  const availableRoles = roles.filter(
    (r) => ROLE_HIERARCHY[r] <= ROLE_HIERARCHY[currentUserRole]
  );

  return (
    <div className="platform-modal-overlay" onClick={onClose}>
      <div className="platform-modal" onClick={(e) => e.stopPropagation()}>
        <h4>{isEdit ? "Editar Usuario" : "Registrar Usuario"}</h4>

        <label className="modal-label">Nombre:</label>
        <input type="text" className="modal-textarea" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />

        <label className="modal-label">Email:</label>
        <input type="email" className="modal-textarea" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label className="modal-label">Username:</label>
        <input type="text" className="modal-textarea" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />

        {!isEdit && (
          <>
            <label className="modal-label">Contraseña:</label>
            <input
              type="password"
              className="modal-textarea"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </>
        )}

        <label className="modal-label">Rol:</label>
        {isLoading ? (
          <p>Cargando roles...</p>
        ) : isError ? (
          <p>Error al cargar roles</p>
        ) : (
          <select className="modal-textarea" value={role} onChange={(e) => setRole(e.target.value)}>
            {availableRoles.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        )}

        <label className="modal-label">Activo:</label>
        <input type="checkbox" checked={active} onChange={() => setActive(!active)} />

        <button className="modal-btn" onClick={handleSave}>
          {isEdit ? "Guardar cambios" : "Crear usuario"}
        </button>
        <button className="modal-link" onClick={onClose}>
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default UserModal;
