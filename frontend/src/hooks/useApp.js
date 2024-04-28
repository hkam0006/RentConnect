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
  
  async function fetchProperties(
    orgId, 
    setLoading, 
    setProperties, 
    setUnfiltered,
    setDOM, 
    setLeased,
    setTotalApplications
  ){
    const propertiesCollectionRef = collection(db, '/Properties/');
    try {
      const q = query(propertiesCollectionRef, where("orgId", "==", orgId));
      const unsub = onSnapshot(q, (querySnapshot) => {
        let applicationSum = 0;
        let vacancySum = 0;
        let totalLeased = 0;
        const properties = []
        querySnapshot.forEach((doc) => {
          properties.push({
            ...doc.data(),
            id: doc.id
          });
          applicationSum += doc.data().applications
          vacancySum += doc.data().vacancy
          if (doc.data().status === "Leased") {
            totalLeased += 1;
          }
        })
        setUnfiltered(properties);
        setProperties(properties);
        setTotalApplications(applicationSum);
        setDOM(Number((vacancySum / properties.length).toFixed(1)));
        setLeased(totalLeased);
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