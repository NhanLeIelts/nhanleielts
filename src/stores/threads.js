import { db } from '../stores/firebase'
import { onSnapshot, collection, setDoc, doc } from 'firebase/firestore'

export const getThread = async () => {
  return new Promise((resolve, reject) => {
    onSnapshot(collection(db, 'threads'), (snapshot) => {
      const threads = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      resolve(threads);
    }, (error) => {
      reject(error);
    });
  });
}

export const getThreadDetail = async (route) => {
  return new Promise((resolve, reject) => {
    onSnapshot(collection(db, 'threads'), (snapshot) => {
      let threads = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      threads = threads.filter(doc => doc.id === route)[0]
      resolve(threads);
    }, (error) => {
      reject(error);
    });
  });
}

export const createThread = async(obj) => {
  return new Promise((resolve, reject) => {
    const threadCollection = collection(db, "threads");
    setDoc(doc(threadCollection, obj.id), { value: obj})
      .then(() => {
        resolve("Thread created successfully");
      })
      .catch((error) => {
        reject(error);
      });
  });
}