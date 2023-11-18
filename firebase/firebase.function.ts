import { db } from "./Firebase.Config";
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

// export const uploadImageToStorageBucket = async 


/*
export const addGameDoc = async(id: string, gameID: string, place: string, objective_completed: string, ) => {

};

export const addObjective = async() => {

};

export const addPlayersDoc = async() => {
    
};
*/






