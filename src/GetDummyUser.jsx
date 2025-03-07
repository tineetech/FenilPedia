import { getIdTokenResult, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "./utils/firebase";

const GetDummyUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dummyUser, setDummyUser] = useState({
    name: "John Doe",
    profilePicture: "https://avatar.iran.liara.run/public/50",
    isAdmin: false,
    isLoggedIn: false,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Ambil token dan cek apakah user memiliki role admin
        const token = await getIdTokenResult(currentUser);
        const isAdmin = token.claims.admin || false;

        setUser(currentUser);
        console.log(currentUser);
        setDummyUser({
          name: currentUser.email || "User",
          profilePicture:
            currentUser.photoURL || "https://avatar.iran.liara.run/public/50",
          isAdmin: isAdmin, // Set status admin
          isLoggedIn: true,
        });
      } else {
        setUser(null);
        setDummyUser({
          name: "Guest",
          profilePicture: "https://avatar.iran.liara.run/public/50",
          isAdmin: false,
          isLoggedIn: false,
        });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  return { dummyUser, setDummyUser };
};

export default GetDummyUser;
