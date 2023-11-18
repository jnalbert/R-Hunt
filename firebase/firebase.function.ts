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


/*
export const addGameDoc = async(id: string, gameID: string, place: string, objective_completed: string, ) => {

};

export const addObjective = async() => {

};

export const addPlayersDoc = async() => {
    
};
*/






