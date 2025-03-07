import { Col, Row, Input, Button } from 'antd';
import React, { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

export default function CrearLista() {
  const [titleTask, setTitleTask] = useState('');
  const [descriptionTask, setDescriptionTask] = useState('');

  const setChangeTitle = (inputvalue) => {
    setTitleTask(inputvalue.target.value);
  };
  const setChangeDescription = (inputvalue) => {
    setDescriptionTask(inputvalue.target.value);
  };

  const crearTarea = async () => {
    if (!titleTask || !descriptionTask) {
      alert('No se puede crear la tarea. Ya que algun campo esta vacio');
      return;
    }

    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const saveTask = getFirestore();
      try {
        await addDoc(collection(saveTask, 'tasks'), {
          datetime: new Date().toISOString(),
          description: descriptionTask,
          email: user.email,
          title: titleTask,
        });
        alert('Tarea creada exitosamente');
      } catch (error) {
        console.error('Error creating task:', error);
      }
    } else {
      alert('No hay un usuario logueado');
    }
  };

  return (
    <div>
      <Row>
        <Col xs={24} sm={24} md={32} lg={32} xl={32}>
          <h1 style={{ color: 'black' }}>Crear Tarea</h1>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ padding: '5px' }}>
          <h4 style={{ color: 'black', marginTop: '-5px' }}>Nombre de la tarea</h4>
          <Input
            size='small'
            placeholder='Nombre de la tarea'
            value={titleTask}
            onChange={setChangeTitle}
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ padding: '5px' }}>
          <h4 style={{ color: 'black', marginTop: '-5px' }}>Descripción</h4>
          <Input
            size='small'
            placeholder='Descripción de la tarea'
            value={descriptionTask}
            onChange={setChangeDescription}
          />
        </Col>
      </Row>
      <div style={{ textAlign: 'right', padding: '18px' }}>
        <Button color='green' variant='solid' onClick={crearTarea}>
          CREAR TAREA +
        </Button>
      </div>
    </div>
  );
}
