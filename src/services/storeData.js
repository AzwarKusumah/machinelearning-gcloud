import { Firestore } from '@google-cloud/firestore';

const db = new Firestore({ databaseId: "predictions" });

async function storeData(id, data) {
    const predictCollection = db.collection("predictions");
    return predictCollection.doc(id).set(data);
}

async function getData() {
    const querySnapshot = await db.collection("predictions").get();
    const data = querySnapshot.docs.map((doc) => {
        return { id: doc.id, history: doc.data() };
    });

    return data;
}

export default { storeData, getData };