import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { login } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const setToken = useAuthStore((state) => state.setToken);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const data = await login({ username, password });
      setToken(data.token);
      navigate('/dashboard');
    } catch (err) {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="flex justify-content-center align-items-center min-h-screen surface-ground px-3">
      <Card title="Iniciar Sesión" className="w-full sm:w-25rem p-4 shadow-3 surface-card border-round">
        <form onSubmit={handleSubmit} className="flex flex-column gap-4">
          <span className="p-input-icon-left w-full">
            <i className="pi pi-user" />
            <InputText
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full"
            />
          </span>

          <span className="p-input-icon-left w-full">
            <i className="pi pi-lock" />
            <Password
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              feedback={false}
              toggleMask
              required
              className="w-full"
            />
          </span>

          <Button label="Ingresar" icon="pi pi-sign-in" type="submit" className="w-full" />
          {error && <small className="text-red-500 block text-center">{error}</small>}
        </form>
      </Card>
    </div>
  );

};
