import { Button, Col, Input, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { signinUser } from '../config/authCall';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function Login({ mail }) {
  const { user } = useAuth();
  const [userName, setUserName] = useState(mail);
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const crearUsuario = () => {
    navigate('/CrearUsuario');
  };

  useEffect(() => {
    if (user) navigate('/navbar');
  }, [user]);

  const changeName = (inputvalue) => {
    setUserName(inputvalue.target.value);
  };
  const changePassword = (inputvalue) => {
    setPassword(inputvalue.target.value);
  };
  const login = () => {
    signinUser(userName, password);
  };
  return (
    <div>
      <div>
        <h1 style={{ color: 'black' }}>Softtek@Task</h1>
        <h2 style={{color: "black", marginTop: "-30px"}}>Academia React</h2>
      </div>
      <Row>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
        <h4 style={{ color: 'black' }}>Usuario</h4>
          <Input
            size='small'
            placeholder='Correo del usuario'
            value={userName}
            onChange={changeName}
          ></Input>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
        <h4 style={{ color: 'black' }}>Contraseña</h4>
          <Input.Password
            size='small'
            placeholder='Contraseña'
            value={password}
            onChange={changePassword}
          />
        </Col>
      </Row>
      <div style={{ padding: '18px' }}>
        <Button onClick={login} color='green' variant='solid'>Login</Button>
      </div>
      <div style={{ padding: '1px', marginTop: '10px' }}>
        <Button onClick={crearUsuario} color='blue' variant='solid'>Crear Usuario</Button>
      </div>
    </div>
    
  );
}