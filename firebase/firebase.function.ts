import { Platform } from "react-native";
import { db, storage } from "./Firebase.Config";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    increment,
    onSnapshot,
    query,
    setDoc,
    updateDoc,
    where,
    writeBatch,
  } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { GameInfo, ObjectiveType } from "../app/(tabs)/creategame/create";
import { GameDBType, ObjectiveDBType } from "./types/DBTypes";




export const uploadImageToStorageBucket = async (path: string, url: string): Promise<string> => {
  // add image to storage bucket and return the download URl
  try {
    url = Platform.OS === 'ios' ? url.replace('file://', '') : url;
    console.log("2 Here1")
    const response = await fetch(url);
    console.log("2 Here2")
    const blob = await response.blob();
    console.log("2 Here3")
    const storageRef = ref(storage, path);
    console.log("2 Here4")
    
    const snapshot = await uploadBytes(storageRef, blob);
    console.log("2 Here5")

    const downloadUrl = await getDownloadURL(snapshot.ref);
    console.log("2 Here6")

    return downloadUrl
  } catch (error) {
    console.log(error)
    return error;
  }
}


export const addNewUserToDB = async (id: string, fullname: string, username: string, profilephoto: string) => {
    // try {
      await setDoc(doc(db, 'users', id), {
        id: id,
        fullname: fullname,
        username: username,
        profilephoto: profilephoto,
      });
    // } catch (error) {
    //   console.log(error);
    // }
};


export const addPastGameToUserDoc = async (id: string, gameID: string, place: string, objective_completed: string) => {
    // try {
      await setDoc(doc(db, `users/${id}`, gameID), {
        gameID: gameID,
        place: place,
        objective_completed:objective_completed,
      });
    // } catch (error) {
    //   console.log(error);
    // }
};


//search through fireBase game collection, check if there's a game that exists, then return the docID of that game.
export const searchThroughDocs = async(gamecode : string): Promise<string>=> {
  const citiesRef = collection(db, "games");
  const q = query(citiesRef, where("gameCode", "==", gamecode));

  
  const querySnapshot = await getDocs(q);
  let returnVal = "";
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    returnVal = doc.data().id;
  });
return returnVal;
};

export const getUserData = async (userId: string) => {
  try {
    const userDoc = await getDoc(doc(db, `users/${userId}`));
    return userDoc.data();
  } catch (error) {
    console.log(error)
  }
}

export const addUserToGameDoc = async(gameId: string, userId: string) => {
  
  const gamePlayerRef =  doc(collection(db, `games/${gameId}/players`), userId);

  const userData = await getUserData(userId);

  await setDoc(gamePlayerRef, {
    playerID: userId,
    username: userData.username,
    objectsCompleted: [],
    latitude: 0,
    longitude: 0,
    profilePic: userData.profileUrl,
    
  })

  // update game doc with one more person
  const gameDocRef = doc(db, `games/${gameId}`);
  const gameDocData = (await getDoc(gameDocRef)).data();

  const isReady = gameDocData.currCount + 1 === gameDocData.maxPlayers;

  updateDoc(gameDocRef, {
    currCount: increment(1),
    isReady: isReady
  })
}



export const createGameDoc = async(game : GameInfo): Promise<string> => {

  try {

    const newGameRef = doc(collection(db, "games"));

    // make a 5 digit game code that has letters and number
    const code = Math.random().toString(36).substring(2, 7).toUpperCase();

    const dataToAdd = {
        id: newGameRef.id,
        name: game.name,
        numObjectives: game.objectives.length, 
        maxPlayers: game.playerCount,
        currCount: 0,
        ready: false,
        gameCode: code,
        winner: "",
    }

    await setDoc(newGameRef, dataToAdd);


    for (let i = 0; i < game.objectives.length; i++) {
        console.log("here1")
        const obj : ObjectiveType = game.objectives[i];
        console.log("here2")
        const imageUrl = await uploadImageToStorageBucket(`games/${newGameRef.id}/${i}`, obj.photoUrl)
        console.log("here3")
        const newObjectiveRef = doc(collection(db, `games/${newGameRef.id}/objectives`));
        console.log("here4")
        await setDoc(newObjectiveRef, {
            image: imageUrl,
            latitude: obj.latitude,
            longitude: obj.longitude
        })
        console.log("here5")
    }
    return newGameRef.id;
  } catch (error) {
    console.log(error);
    return error;
  }

}


async function deleteCollection(db, collectionPath, batchSize) {
  const collectionRef = db.collection(collectionPath);
  const query = collectionRef.orderBy('__name__').limit(batchSize);

  return new Promise((resolve, reject) => {
    deleteQueryBatch(db, query, resolve).catch(reject);
  });
}

async function deleteQueryBatch(db, query, resolve) {
  const snapshot = await query.get();

  const batchSize = snapshot.size;
  if (batchSize === 0) {
    // When there are no documents left, we are done
    resolve();
    return;
  }

  // Delete documents in a batch
  const batch = db.batch();
  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });
  await batch.commit();

  // Recurse on the next process tick, to avoid
  // exploding the stack.
  process.nextTick(() => {
    deleteQueryBatch(db, query, resolve);
  });
}





export const getGameInfoFromDB = async (gameID: string): Promise<GameDBType> => {
  try {
    const gameInfo = await getDoc(doc(db, `games/${gameID}`));
    if (!gameInfo.exists()) return;
    return gameInfo.data() as GameDBType;
  } catch (error) {
    console.log(error);
    return error;
  }
}



export const getGameObjectives = async (gameID: string): Promise<any> => {
  try {
    const objectives = await getDocs(collection(db, `games/${gameID}/objectives`));
    return objectives.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data()
      }
  });
  } catch (error) {
    console.log(error);
    return error;
  }
}



/*
export const addGameDoc = async(id: string, gameID: string, place: string, objective_completed: string, ) => {

};

export const addObjective = async() => {

};

export const addPlayersDoc = async() => {
    
};
*/






