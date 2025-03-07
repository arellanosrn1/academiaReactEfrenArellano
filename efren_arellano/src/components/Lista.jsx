import React, { useEffect, useState } from 'react';
import { Avatar, Button, List, Skeleton } from 'antd';
const count = 3 ;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;
const App = () => {
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  useEffect(() => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        setInitLoading(false);
        setData(res.results);
        setList(res.results);
      });
  }, []);

  return (
    <div>
        <div style={{textAlign: "right", padding: "18px"}}>
            <Button color='green' variant='solid'>CREAR TAREA +</Button>
        </div>
      <List
        className='demo-loadmore-list'
        loading={initLoading}
        itemLayout='horizontal'
        dataSource={list}
        renderItem={(item) => (
          <List.Item
            actions={[
              <a key='list-loadmore-edit'>Editar</a>,
              <a key='list-loadmore-more'>Borrar</a>,
            ]}
          >
            <List.Item.Meta
              title={<a>Titutlo</a>}
              description='Nombre Usuario y fecha'
            />
            <div>
              <Button color='blue' variant='solid'>
                Guardar
              </Button>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};
export default App;
