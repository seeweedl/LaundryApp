import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native';

const services = [
    {
      id: "0",
      image: "https://cdn-icons-png.flaticon.com/128/3003/3003984.png",
      name: "Washing",
    },
    {
      id: "11",
      image: "https://cdn-icons-png.flaticon.com/128/2975/2975175.png",
      name: "Laundry",
    },
    {
      id: "12",
      image: "https://cdn-icons-png.flaticon.com/128/9753/9753675.png",
      name: "Wash & Iron",
    },
    {
      id: "13",
      image: "https://cdn-icons-png.flaticon.com/128/995/995016.png",
      name: "Cleaning",
    },
  ];
  

const Services = () => {
  return (
    <View style={{}}>
      <Text style={{paddingLeft:18,paddingTop:14,fontWeight:'bold'}}>Services Available</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {services.map((service, index)=>(
            <Pressable key={index} style={{ margin:18, backgroundColor:'white', borderRadius:4, padding:10, alignItems:'center'}}>
                <Image style={{width:60, height:60}} source={{uri:service.image}}/>
                <Text style={{fontWeight:'bold'}}>{service.name}</Text>
            </Pressable>
        ))}
      </ScrollView>
    </View>
  )
}

export default Services