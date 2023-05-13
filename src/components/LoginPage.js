import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";

import { auth, db, signInWithGoogle } from "./firebase";
import { Box, Center, Input, Button, HStack, Text } from "@chakra-ui/react";
import { setDoc, doc, docs, getDocs, collection } from "firebase/firestore";

function LoginPage() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  const [user, setUser] = useState({});
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) setUser(currentUser);
    });
  }, []);

  async function createNewUser(uid) {
    await setDoc(doc(db, "users", uid), {
      displayName: username,
      email: registerEmail,
      account_created: new Date().toUTCString(),
      uid: uid,
    });
  }

  async function register(e) {
    e.preventDefault();
    try {
      let ok = true;
      //eslint-disable-next-line
      users.map((user) => {
        if (user.displayName === username) {
          ok = false;
        }
      });
      if (!ok) return setError("Username already in use");

      if (username === "") {
        setError("Username cannot be empty");
        return;
      }

      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      await updateProfile(auth.currentUser, { displayName: username }).catch(
        (err) => console.log(err)
      );

      console.log(auth.currentUser.uid);
      setError("");
      createNewUser(auth.currentUser.uid);
    } catch (error) {
      console.log(error.message);
      if (
        error.message === "Firebase: Error (auth/invalid-email)." ||
        error.message === "Firebase: Error (auth/internal-error)."
      ) {
        setError("Invalid email");
      } else if (
        error.message ===
        "Firebase: Password should be at least 6 characters (auth/weak-password)."
      ) {
        setError("Password should be at least 6 characters");
      } else if (
        error.message === "Firebase: Error (auth/email-already-in-use)."
      ) {
        setError("Email already in use");
      }
    }
  }

  function createNewGoogleUser(uid, name, email) {
    setDoc(doc(db, "users", uid), {
      displayName: name,
      email: email,
      account_created: new Date().toUTCString(),
      uid: uid,
    });
    if (auth)
      updateProfile(auth.currentUser, { displayName: name }).catch((err) =>
        console.log(err)
      );
  }

  function google() {
    let login = false;
    const userInfo = signInWithGoogle()
      .then((result) => {
        const name = result.user.displayName;
        const email = result.user.email;
        const uid = result.user.uid;
        users.map((user) => {
          if (user.uid === uid) {
            login = true;
          }
        });
        let tryThisName = name;

        if (!login) {
          let numDuplicates = 2;
          while (true) {
            let ok = true;
            //eslint-disable-next-line
            users.map((user) => {
              if (user.displayName === tryThisName) {
                ok = false;
              }
            });
            if (ok) {
              createNewGoogleUser(uid, tryThisName, email);
              break;
            }
            tryThisName = `${tryThisName} (${numDuplicates})`;
            numDuplicates++;
          }
        }
        if (login) {
          window.location.replace(`/`);
        }
      })
      .catch((error) => {
        setError(error.message);
        console.log(error.message);
      });
  }

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      setError("");
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
  };

  const logout = async () => {
    if (user) {
      await signOut(auth);
      window.location.reload();
    }
  };

  return (
    <Box className="mainFont">
      <HStack>
        <Box>
          <h3> Register User </h3>
          <Input
            placeholder="Username..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <Input
            placeholder="Email..."
            onChange={(event) => {
              setRegisterEmail(event.target.value);
            }}
          />

          <Input
            placeholder="Password..."
            type={"password"}
            onChange={(event) => {
              setRegisterPassword(event.target.value);
            }}
          />
          <Button onClick={register}>Register</Button>
        </Box>

        <Box>
          <h3> Login User </h3>
          <Input
            placeholder="Email..."
            onChange={(event) => {
              setLoginEmail(event.target.value);
            }}
          />

          <Input
            placeholder="Password..."
            type="password"
            onChange={(event) => {
              setLoginPassword(event.target.value);
            }}
          />
          <Box>
            <Button
              onClick={google}
              className="loginFont"
              bgColor="white"
              color="#2f0505"
              borderRadius={"3px"}
              minHeight="45px"
            >
              <Box fontSize="24px" paddingRight="10px" paddingTop="5px">
                <ion-icon name="logo-google"></ion-icon>
              </Box>
              Sign in with Google
            </Button>
          </Box>
          <Button onClick={login}>Login</Button>
        </Box>
      </HStack>
      Signed in as: {user?.displayName}
      <Button onClick={logout}>Logout</Button>
      {error !== "" && <Text color="red">{error} </Text>}
    </Box>
  );
}

export default LoginPage;
