import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  updateDoc,
  doc
} from "firebase/firestore";

import { auth, db } from "../firebase";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const ADMIN_EMAIL = "noobtofit4443@gmail.com";

  async function fetchUsers() {
    const querySnapshot = await getDocs(collection(db, "users"));

    const usersData = querySnapshot.docs.map(docItem => ({
      id: docItem.id,
      ...docItem.data()
    }));

    setUsers(usersData);
  }

  async function approveUser(id) {
    await updateDoc(doc(db, "users", id), {
      approved: true
    });

    fetchUsers();
  }

  useEffect(() => {
    const user = auth.currentUser;

    if (!user || user.email !== ADMIN_EMAIL) {
      alert("Access Denied");
      window.location.href = "/";
      return;
    }

    fetchUsers();
    setLoading(false);

  }, []);

  if (loading) {
    return <h1 style={{ color: "white" }}>Loading...</h1>;
  }

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h1>NoobToFit Admin Panel</h1>

      {users.map(user => (
        <div
          key={user.id}
          style={{
            border: "1px solid gray",
            padding: "15px",
            marginTop: "10px",
            borderRadius: "10px"
          }}
        >
          <p><strong>Email:</strong> {user.email}</p>

          <p>
            <strong>Status:</strong>{" "}
            {user.approved ? "Approved ✅" : "Pending ❌"}
          </p>

          {!user.approved && (
            <button
              onClick={() => approveUser(user.id)}
              style={{
                padding: "10px",
                cursor: "pointer"
              }}
            >
              Approve
            </button>
          )}
        </div>
      ))}
    </div>
  );
}