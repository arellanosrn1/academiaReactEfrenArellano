import React, { useState, useEffect } from 'react';
import { Button, List, Input } from 'antd';
import { getFirestore, collection, query, onSnapshot, doc, deleteDoc, updateDoc, getDoc } from 'firebase/firestore';
import CrearLista from './CrearLista';
import { getCurrentUser } from '../config/authCall'; // Import the new function
import firebaseAcademia from '../config/firebaseconfig';

export default function ListOfTask() {
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    const fetchPermissions = async () => {
      const firestore = getFirestore(firebaseAcademia);
      const currentUser = getCurrentUser(); // Get the current user
      if (currentUser) {
        const userDoc = await getDoc(doc(firestore, 'users', currentUser.uid));
        console.log(currentUser, currentUser.uid);
        if (userDoc.exists()) {
          setPermissions(userDoc.data().permissions);
        }
      }
    };

    fetchPermissions();

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

  const handleDelete = async (taskId) => {
    const firestore = getFirestore();
    try {
      await deleteDoc(doc(firestore, 'tasks', taskId));
      alert('Tarea eliminada exitosamente');
    } catch (error) {
      console.error('Error eliminando la tarea:', error);
    }
  };

  const handleEdit = (task) => {
    setEditingTaskId(task.id);
    setEditedTitle(task.title);
    setEditedDescription(task.description);
  };

  const handleSave = async (taskId) => {
    const firestore = getFirestore();
    try {
      await updateDoc(doc(firestore, 'tasks', taskId), {
        title: editedTitle,
        description: editedDescription,
      });
      setEditingTaskId(null);
    } catch (error) {
      console.error('Error actualizando la tarea:', error);
    }
  };

  return (
    <div>
      {(permissions.includes('write') || permissions.includes('admin')) && <CrearLista />}
      <List
       style={{ border: "2px solid #ddd", borderRadius: "20px"}}
        dataSource={tasks}
        renderItem={(task) => (
          <List.Item key={task.id}>
            <List.Item.Meta
              title={
                editingTaskId === task.id ? (
                  <Input
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                  />
                ) : (
                  <span>{task.title}</span>
                )
              }
              description={
                <div>
                  {editingTaskId === task.id ? (
                    <Input
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                    />
                  ) : (
                    <span>{task.description}</span>
                  )}
                  <br />
                  <span>{task.email} | {new Date(task.datetime).toLocaleString()}</span>
                </div>
              }
            />
            <div style={{ textAlign: 'right', paddingRight: "50px" }}>
              {(permissions.includes('write') || permissions.includes('admin')) && editingTaskId === task.id ? (
                <Button
                  color='green'
                  variant='outlined'
                  style={{ marginRight: '15px' }}
                  onClick={() => handleSave(task.id)}
                >
                  Guardar
                </Button>
              ) : (
                (permissions.includes('write') || permissions.includes('admin')) && (
                  <Button
                    color='blue'
                    variant='outlined'
                    style={{ marginRight: '15px' }}
                    onClick={() => handleEdit(task)}
                  >
                    Editar
                  </Button>
                )
              )}
              {(permissions.includes('delete') || permissions.includes('admin')) && (
                <Button
                  color='red'
                  variant='solid'
                  onClick={() => handleDelete(task.id)}
                >
                  Eliminar
                </Button>
              )}
            </div>
          </List.Item>
        )}
      />
    </div>
  );
}