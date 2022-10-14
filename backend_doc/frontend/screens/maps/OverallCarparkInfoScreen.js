import React, { useEffect, useState } from 'react';
import {Text,StyleSheet,SafeAreaView,ActivityIndicator, FlatList, View , TouchableOpacity,ScrollView} from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
//import SearchScreen from "./home/search/SearchScreen";
//import FilterScreen from "./home/filter/FilterScreen";
import { NavigationContainer } from '@react-navigation/native';
//import InfoScreen from "./InfoScreen";
import CarparkMapsScreen from "./CarparkMapsScreen";
import { carparkresult } from '../../assets/carparkresult';
import {
	Avatar,
	
	Card,
	Title,
	Paragraph,
	IconButton,
} from "react-native-paper";
const split = require('split-string');
/**
 * Carpark Information Screen contains lots available, free parking timings etc. for a specific carpark
 * @Class OverallCarparkInfoScreen
 * @param {*} navigation,route 
 */
function OverallCarparkInfoScreen ({ navigation,route}){
  
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]); // test can delete later
  const {name,latitude,longitude,free_parking,car_park_type,type_of_parking_system,short_term_parking,night_parking,gantry_height}=route.params;
 


  const getMovies = async () => {
    try {
    //  const response=await fetch('http://localhost:8080/getcarparkinfo/ 1.313349962/103.7645874')
     const response = await fetch("http://craapy-env.eba-9gpy3v9a.us-east-1.elasticbeanstalk.com/getnearestcarpark/"+latitude+"/"+longitude)
     const json = await response.text();

     setData(json);
     console.log(data)

   } catch (error) {
     console.error(error);
   } finally {
     setLoading(false);
     
   }
 }

 useEffect(() => {
   getMovies();
 }, []);




 /**
  * Slices string data to obtain lots available
  * @method getLotsAvail
  * @returns integer
  */
 const getLotsAvail=()=>{

  return split(String(data), { separator: ';' })[3]

  
 }



 /**
  * Slices string data to obtain total lots 
  * @method getTotalLots
  * @returns integer
  */
const getTotalLots=()=>{
  
  return split(String(data), { separator: ';' })[1]
}

  return (

  
    <View style={styles.container}>
    <View style={styles.headercontainer}>
      <Text style={styles.headerText}>Overall Carpark Info</Text>
    </View>
    <View
  style={{
    borderBottomColor: 'rgba(242, 242, 247,1)',
    borderBottomWidth: 2,
    marginTop:0,
    width:"100%",
    marginBottom:15,
  }}
/>
      <Title style={{fontSize: 20,alignSelf:"center", textAlign:"center", fontFamily:"OpenSansbold", marginTop:10, marginBottom:20}}>{name}</Title>


  {/* <ScrollView style={styles.content}> */}
<SafeAreaView style={styles.cardcontainer}>
    <Card style={styles.card}>
    <Title style={{fontFamily:"Nunito", color:"black", alignSelf:"center", fontSize:20}}>Available Slots:</Title>
      <Text style={styles.paragraph}>
        {getLotsAvail()}/{getTotalLots()}
        {/* {data[0].lotsAvailable}/{data[0].totalLots} */}
      </Text>
    </Card>
   
    <Card style={styles.card}>
    <Title style={{fontFamily:"Nunito", color:"black", alignSelf:"center"}}>Free Parking</Title>
      <Text style={styles.paragraph3}>
      {free_parking}
      </Text>
    </Card>
</SafeAreaView>
<Card style={styles.card2}>
  <View style={{margin:10}}>
    <Title style={styles.paragraph2}>Type of Car Park:</Title>
      <Text style={styles.bigcontent}>
      {car_park_type}
      </Text>
  </View>
  <View style={{margin:10}}>
      <Title style={styles.paragraph2}>Type of Parking System:</Title>
      <Text style={styles.bigcontent}>
      {type_of_parking_system}
      </Text>
  </View>
  <View style={{margin:10}}>
      <Title style={styles.paragraph2}>Short Term Parking:</Title>
      <Text style={styles.bigcontent}>
      {car_park_type}
      </Text>
  </View>
  <View style={{margin:10}}>
      <Title style={styles.paragraph2}>Night Parking:</Title>
      <Text style={styles.bigcontent}>
      {night_parking}
      </Text>
      </View>
  <View style={{margin:10}}>
      <Title style={styles.paragraph2}>Gantry Height:</Title>
      <Text style={styles.bigcontent}>
      {gantry_height}m
      </Text>
      </View>
  </Card> 


</View>



  );
};




const Stack = createStackNavigator();
/**
 * Stacking of Screens
 * @Method homestack
 */
export default function homestack() {
	return (
		  <Stack.Navigator mode="none">
         <Stack.Screen name="CarparkMapsScreen" component={CarparkMapsScreen}       
        options={{
                  headerBackTitleVisible:false,
                  headerTitle:false,
                  headerTransparent:true,
                  headerTintColor:'black'
              }}/>

          <Stack.Screen name="OverallCarparkInfoScreen" component={OverallCarparkInfoScreen}       
        options={{
                  headerBackTitleVisible:false,
                  headerTitle:false,
                  headerTransparent:true,
                  headerTintColor:'black'
              }}/>

                {}
		  </Stack.Navigator>

	);
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "white",
  },
  headercontainer:{
    width:"110%",
    height:95,
    position: "relative",
    marginBottom: 0,
    backgroundColor:"white",


  },
  headerText:{
    fontFamily: "OpenSansbold",
    right:18,
    marginTop:45,
    paddingTop: 4,
    paddingBottom:0,
    fontSize: 24,
    alignSelf:"center"
},
content:{
  position:"relative",
  padding:7
},
cardcontainer:{
  flex: 1,
  flexDirection:"row",
  justifyContent: 'space-evenly',
  padding: 20,
  backgroundColor: 'white',
  marginBottom:2

},
card:{
  height:90,
  width:160,
  borderRadius:10,
  backgroundColor:'#fed274',
  opacity:0.8


},
card2:{
  bottom:40,
  flexDirection: 'row',
  height:400,
  width:"90%",
  borderRadius:10,
  backgroundColor:'#fed274',
  opacity:0.8,
  alignSelf:"center"
},
paragraph:{
  fontWeight:"bold",
  fontSize:28,
  alignSelf:"center",
  marginTop:4,
  fontFamily:"LatoBold",
  color:"black"
},
paragraph3:{
  fontWeight:"bold",
  fontSize:19,
  alignSelf:"center",
  marginTop:5,
  fontFamily:"LatoBold",
},
paragraph2:{
  fontWeight:"bold",
  fontSize:18,
  alignSelf:"center",
  marginTop:3,
  fontFamily:"NunitoBold",
},
bigcontent:{
  fontFamily:"Nunito", 
  color:"black", 
  alignSelf:"center",
  fontSize:16,
  flexShrink: 1 ,
  }
})
module.exports=OverallCarparkInfoScreen;