import React, {useState, useEffect} from 'react';
import MapView, {Marker} from 'react-native-maps';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import ScreenWrapperComp from '../../../components/shared/ScreenWrapperComp';
import * as Location from 'expo-location'
import {FAB} from 'react-native-paper'
import {ObjectiveDBType} from '../../../firebase/types/DBTypes';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';


const BellTower = {
    latitude: 33.973339,
    longitude: -117.328175,
}

const SOMRB = {
    latitude: 33.970524,
    longitude: -117.325546,
}

const Glasgow = {
    latitude: 33.977965,
    longitude: -117.324561,

}

const DundeeA = {
    latitude: 33.978505,
    longitude: -117.32461,
}



export default function Game() {
    const [fabColor, setFabColor] = useState("");
    let [distance, setDistance] = useState(100);

    let [currentLocation, setCurrentLocation] = useState(null);

    const [mapRegion, setMapRegion] = useState({
        latitude: 33.975823,
        longitude: -117.323879,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005
    })


    // const getUserLocation = async () => {
    //     let {status} = await Location.requestForegroundPermissionsAsync();
    //     if(status !== 'granted') {
    //         setErrorMsg("Permission to access location is denied");
    //     }
    //     let location = await Location.getCurrentPositionAsync({});
    //     return location.coords
        
    // }

    // const watchLocationCallback = (location: Location.LocationObject) => {
    //     // set state and do shit
    //     setCurrentLocation(location)
    //     console.log("Balls")
    // }

    // const watchLocationAsync = (onLocationUpdate) => {
    //     Location.watchPositionAsync(
    //       { accuracy: Location.Accuracy.BestForNavigation, timeInterval: 200 },
    //       (location) => {
    //         onLocationUpdate(location.coords);
    //       }
    //     );
    //   };

    useEffect(() => {
        console.log('hi')
        let _getLocationAsync = async () => {
            let { status } = await Location.getForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('debieeed')
            }
            currentLocation = await Location.watchPositionAsync({ accuracy: Location.Accuracy.Highest, timeInterval: 1000, distanceInterval: 0 }, (loc) => {
                setCurrentLocation(loc.coords)
                const distance = calculateDistance(loc.coords, Glasgow)
                setDistance(distance)
                getDistance(distance)
                });
            console.log(currentLocation)
           
        }
        _getLocationAsync()
    }, [])

    const getDistance = (distance: number) => {
        if(distance <= 50) {
            setFabColor("green")
        }
        else if(distance <= 100) {
            setFabColor("yellow")
        }
        else{
            setFabColor("red");
        }
    }
    

  return (
    <ScreenWrapperComp>
        <View style={styles.container}>
            <MapView 
                style={styles.map} 
                region={mapRegion}
                >
                    <Marker 
                        coordinate={{
                            latitude: currentLocation ? currentLocation.latitude : undefined,
                            longitude: currentLocation ? currentLocation.longitude : undefined,
                        } }
                        title="Your Location"
                    />
            </MapView>
            <FAB
                label={distance.toString()}
                style={[styles.fab, {backgroundColor: fabColor}]}
                onPress={() => {console.log("Pressed")}}
            />
        </View>
    </ScreenWrapperComp>
  );
} 


const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 140,
    bottom: -20,
    borderRadius: 50,
  },
});
const calculateDistance = (userLocation, objectLocation) => {
    const R = 6371000; // Radius of the Earth in meters
    const dLat = toRadians(objectLocation.latitude - userLocation.latitude);
    const dLon = toRadians(objectLocation.longitude - userLocation.longitude);
  
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(userLocation.latitude)) * Math.cos(toRadians(objectLocation.latitude)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in meters
    return Math.floor(distance);
  };
  
  const toRadians = (angle) => {
    return (angle * Math.PI) / 180;
  };
  
