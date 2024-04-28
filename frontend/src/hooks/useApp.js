import { doc, setDoc, where, Unsubscribe, onSnapshot, query, collection } from "firebase/firestore"
import {db} from "../firebaseConfig"

const useApp = () => {
  async function createProperty(orgId, property){
    const propertyId = crypto.randomUUID();
    const propertiesColRef = doc(db, `/Properties/${propertyId}`);

    try {
      const newProperty = {
        ...property,
        orgId
      }

      await setDoc(propertiesColRef, newProperty)
    } catch (err) {
      console.log(err)
    }
  }
  
  async function fetchProperties(orgId, setLoading, setProperties){
    const propertiesCollectionRef = collection(db, '/Properties/');
    try {
      const q = query(propertiesCollectionRef, where("orgId", "==", orgId));
      const unsub = onSnapshot(q, (querySnapshot) => {
        const properties = []
        querySnapshot.forEach((doc) => {
          properties.push({
            ...doc.data(),
            id: doc.id
          });
        })
        console.log(properties)
        setProperties(properties);
      })
      setLoading(false);
      return unsub;
    } catch (err){
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return {
    createProperty,
    fetchProperties
  }

}

export default useApp;