import React, { useState } from 'react';
import { Button, Col, Input, Row } from 'antd';
import { createUser } from '../config/authCall';
import { useNavigate } from 'react-router-dom';

export default function CrearUsuario() {
  const [createEmail, setCreateEmail] = useState('');
  const [createPassword, setCreatePassword] = useState('');
  const [createUserName, setCreateName] = useState('');
  const navigate = useNavigate();

  const changeCreateEmail = (inputvalue) => {
    setCreateEmail(inputvalue.target.value);
  };
  const changeCreatePassword = (inputvalue) => {
    setCreatePassword(inputvalue.target.value);
  };
  const changeUserName = (inputvalue) => {
    setCreateName(inputvalue.target.value);
  };
  const crearUsuario = async () => {
    try {
      await createUser(createEmail, createPassword, createUserName);
      navigate('/navbar'); // Redirige a la página de Navbar después de crear el usuario
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div>
      <Row>
        <Col xs={24} sm={24} md={32} lg={32} xl={32}>
          <h1 style={{ color: 'black' }}>Registro de Usuario</h1>
          <h4 style={{ color: 'black', textAlign: 'left' }}>Nombre de Usuario</h4>
          <Input
            size='small'
            placeholder='Nombre del usuario'
            value={createUserName}
            onChange={changeUserName}
          ></Input>
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <h4 style={{ color: 'black' }}>Escribe tu Correo</h4>
          <Input
            size='small'
            placeholder='Correo del usuario'
            value={createEmail}
            onChange={changeCreateEmail}
          ></Input>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <h4 style={{ color: 'black' }}>Crea una Contraseña</h4>
          <Input.Password
            size='small'
            placeholder='Contraseña'
            value={createPassword}
            onChange={changeCreatePassword}
          />
        </Col>
      </Row>
      <div style={{ padding: '18px' }}>
        <Button onClick={crearUsuario} color='green' variant='solid'>Crear Usuario</Button>
      </div>
    </div>
  );
}
