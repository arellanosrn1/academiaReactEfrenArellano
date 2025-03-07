import React, { useState, useEffect } from 'react';
import { Button, List } from 'antd';
import { getFirestore, collection, query, onSnapshot, doc, deleteDoc } from 'firebase/firestore';

export default function ListOfTask() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const firestore = getFirestore();
    const q = query(collection(firestore, 'tasks'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tasksArray = [];
      querySnapshot.forEach((doc) => {
        tasksArray.push({ id: doc.id, ...doc.data() });
      });
      setTasks(tasksArray.reverse());
    });

    return () => unsubscribe();
  }, []);

  const EliminarTarea = async (taskId) => {
    const firestore = getFirestore();
    try {
      await deleteDoc(doc(firestore, 'tasks', taskId));
    } catch (error) {
      console.error('Error eliminando la tarea:', error);
    }
  };

  return (
    <div>
      <List
        dataSource={tasks}
        renderItem={(task) => (
          <List.Item key={task.id}>
            <List.Item.Meta
              title={<span>{task.title}</span>}
              description={
                <div>
                  <span>{task.description}</span>
                  <br />
                  <span>{task.email} & {new Date(task.datetime).toLocaleString()}</span>
                </div>
              }
            />
            <div style={{ textAlign: 'right' }}>
              <Button color='blue' variant='outlined' style={{ marginRight: '15px' }}>
                Guardar
              </Button>
              <a key='edit' style={{ marginRight: '15px' }}>
                Editar
              </a>
              <Button color='red' variant='solid' onClick={() => EliminarTarea(task.id)}>
                Eliminar
              </Button>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
}