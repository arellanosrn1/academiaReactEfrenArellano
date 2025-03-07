import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { LogoutOutlined } from '@ant-design/icons';
import { readData } from '../config/realtimeCalls';
import { readDataFirestore } from '../config/firestoreCalls';
import Lista from './Lista';

export default function Navbar() {
  const { logout, user } = useAuth();
  const [localUser, setLocalUser] = useState(null);
  useEffect(() => {
    readUser();
  }, [user]);

  const readUser = async () => {
    const luser = await readData('users', 'email', user.email);
    if (luser.val()) {
      console.log(luser.val()[Object.keys(luser.val())[0]]);
    }
    const luser2 = await readDataFirestore('users', 'email', user.email);
    if (!luser2.empty) {
      setLocalUser(luser2.docs[0].data());
    }
  };
  return (
    <div>
      <div style={{ textAlign: 'right', color: "black" }}>
        {localUser && <>{localUser.name}</>} <LogoutOutlined onClick={logout} />
      </div>
      <Lista />
    </div>
  );
}