import { ref, watchEffect } from 'vue';
import { db } from '../firebase';
import { onSnapshot, doc } from '@firebase/firestore';

const getDocument = async (collectionName, id) => {

  const document = ref(null)

  let docRef = doc(db, collectionName, id.value);

  const unsub = onSnapshot(docRef, (snapshot) => {
    console.log(snapshot.data())

    document.value = snapshot.data()
  })

  watchEffect((onInvalidate) => {
    onInvalidate(() => {
      unsub()
    })
  })

  return { document }
}

export default getDocument