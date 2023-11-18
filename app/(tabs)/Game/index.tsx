import React, {useState, useEffect} from 'react';
import MapView, {Marker} from 'react-native-maps';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import ScreenWrapperComp from '../../../components/shared/ScreenWrapperComp';
import * as Location from 'expo-location'

export default function Game() {
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
            currentLocation = await Location.watchPositionAsync({ accuracy: Location.Accuracy.High, timeInterval: 1000, distanceInterval: 0 }, (loc) => setCurrentLocation(loc.coords));
            console.log(currentLocation)
           
        }
        _getLocationAsync()
    }, [])
    
    // useEffect(() => {
    //     const userLocation =async () => {
    //     let {status} = await Location.requestForegroundPermissionsAsync();
    //     if(status !== 'granted') {
    //         setErrorMsg("Permission to access location is denied");
    //     }
        
    //     Location.watchPositionAsync({accuracy: 6, timeInterval: 200, distanceInterval: 0}, (position) => {
    //         console.log(position)
    //     })
    //     let location = await Location.getCurrentPositionAsync({});
        
    //     //console.log(location.coords.latitude,location.coords.longitude);
    //     setCurrentLocation({
    //         latitude: location.coords.latitude,
    //         longitude: location.coords.longitude,
    //         latitudeDelta: 0.005,
    //         longitudeDelta: 0.005
    //     });

    //     setMapRegion({
    //         latitude: location.coords.latitude,
    //         longitude: location.coords.longitude,
    //         latitudeDelta: 0.005,
    //         longitudeDelta: 0.005
    //     });
    // }

    //     userLocation();
    // }, []);
    


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
});

function setErrorMsg(arg0: string) {
    throw new Error('Function not implemented.');
}

