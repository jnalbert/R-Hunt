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

export const uploadImageToStorageBucket = async (path: string, url: string): Promise<string> => {
  // add image to storage bucket and return the download URl
  try {
    url = Platform.OS === 'ios' ? url.replace('file://', '') : url;
    const response = await fetch(url);
    const blob = await response.blob();
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, blob);
    const downloadUrl = await getDownloadURL(snapshot.ref);
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

// export const uploadImageToStorageBucket = async() => {
    
// } 

export const createGameDoc = async(game : GameInfo) => {

  try {

    const newGameRef = doc(collection(db, "games"));

    const dataToAdd = {
        id: newGameRef.id,
        name: game.name,
        numObjectives: game.objectives.length, 
        maxPlayers: game.playerCount,
        currCount: 0,
        ready: false,
        winner: "",
    }

    await setDoc(newGameRef, dataToAdd);


    for (let i = 0; i < game.objectives.length; i++) {
        const obj : ObjectiveType = game.objectives[i];
        const imageUrl = await uploadImageToStorageBucket(`games/${newGameRef.id}/${i}`, obj.photoUrl)
        const newObjectiveRef = doc(collection(db, `games/${newGameRef.id}/objectives`));
        await setDoc(newObjectiveRef, {
            image: imageUrl,
            latitude: obj.latitude,
            longitude: obj.longitude
        })
    }
  } catch (error) {
    console.log(error);
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






