import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";

import {
  getDatabase,
  ref,
  push,
  set,
  get,
  query,
  remove,
} from "firebase/database";

export async function register(email, password) {
  try {
    const oUC = await createUserWithEmailAndPassword(
      getAuth(),
      email,
      password
    );

    return oUC;
  } catch (err) {
    return err.code;
  }
}

export async function login(email, password) {
  try {
    const oUC = await signInWithEmailAndPassword(getAuth(), email, password);
    return oUC.user;
  } catch (err) {
    return err.code;
  }
}

export async function logout() {
  await signOut(getAuth());
}

export async function add(users, deed) {
  const oRef = await push(ref(getDatabase(), `users/${users.uid}/todos`));
  await set(oRef, deed);
  const oSnapshot = await get(query(oRef));
  console.log(oSnapshot);
  const oDeed = oSnapshot.val();
  oDeed.key = oRef.key;
  console.log(oDeed, "oDeed");
  return oDeed;
}

export async function getList(user) {
  const oSnapshot = await get(
    query(ref(getDatabase(), `users/${user.uid}/todos`))
  );
  const oArr = [];
  let oDeed;
  oSnapshot.forEach((oDoc) => {
    oDeed = oDoc.val();
    oDeed.key = oDoc.key;
    oArr.push(oDeed);
  });

  return oArr;
}

export function setDone(user, key, done) {
  console.log(done, "SETDONE");
  if (done) {
    return set(
      ref(getDatabase(), `users/${user.uid}/todos/${key}/done`),
      false
    );
  } else
    return set(ref(getDatabase(), `users/${user.uid}/todos/${key}/done`), true);
}

export function del(user, key) {
  return remove(ref(getDatabase(), `users/${user.uid}/todos/${key}`));
}
