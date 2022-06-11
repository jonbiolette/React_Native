import React,{useEffect,useState} from 'react';
import type {Node} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';


import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  ActivityIndicator,
  FlatList,
  TouchableOpacity
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import List from './pages/List.js';



function HomeScreen({navigation}){
    const isDarkMode = useColorScheme() === 'dark';
      const backgroundStyle = {
          backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
      };
      return(

          <SafeAreaView style={backgroundStyle}>
              <View
                style={{
                  backgroundColor: isDarkMode ? Colors.black : Colors.white,
                }}>
                <Section content = "The term native refers to an app that is created for a specific
                operating system, platform or device. React Native was created out of Facebooks need to
                rely less on HTML and more on native code. It was born from a prototype that could
                generate UI elements from a background JavaScript thread."></Section>
                <Section content = "Who uses React-Native"></Section>
                <Section content = <List></List>></Section>

              </View>
              <View
                style={styles.button}>
                  <Button
                      title = "List of People"
                      onPress={() =>
                      navigation.navigate('People')
                      }
                      />
              </View>
          </SafeAreaView>
          );
      };

function PeopleScreen({navigation}){
           const [isLoading, setLoading] = useState(true);
           const [data, setData] = useState([]);

           const ItemSeparator = () => {
            return <View style={{height:1,backgroundColor:'black',marginHorizontal:10}}/>;
           };

           const getPeople = async () =>{
            try{
                const response = await fetch('https://fakerapi.it/api/v1/users?_quantity=10');
                const json = await response.json();
                setData(json.data);
           }catch(error){
                console.error(error);
           }finally{
                setLoading(false);
            }
            }

            useEffect(() => {
                getPeople();
            },[]);


           return(
           <View>
                 {isLoading ? <ActivityIndicator/> : (
                   <FlatList
                   scrollEnabled={true}
                     data={data}
                     keyExtractor={({ id }, index) => id}
                     ItemSeparatorComponent ={ItemSeparator}
                     ListHeaderComponent={()=>(
                        <Text style={{fontSize: 30, textAlign: 'center',marginTop:20,fontWeight:'bold'}}>
                        List of People
                        </Text>
                     )}

                     renderItem={({ item }) => (
                         <TouchableOpacity onPress ={() => {navigation.navigate('Person', {
                              firstname: item.firstname,
                              lastname: item.lastname,
                              username: item.username,
                              email: item.email,})
                             }
                         }>
                         <SafeAreaView style ={styles.container}>
                         <ScrollView style ={styles.scrollView}>
                            <Text style ={styles.text}>{item.firstname}, {item.lastname}</Text>
                         </ScrollView>
                         </SafeAreaView>
                         </TouchableOpacity>

                     )}
                   />
                 )}
                 </View>
           );
       }
function PersonScreen({route,navigation}){
    const{firstname,lastname,username,email} = route.params;

      return (
        <View style = {{alignItems:'center'}}>
          <FlatList
            scrollEnabled={false}
            data={[
              {key: firstname + ', ' + lastname},
              {key: username},
              {key: email},
            ]}
             renderItem={({item}) => <Text style={styles.text}>{item.key}</Text>}
          />
        </View>
      );

}


const Stack = createNativeStackNavigator();

const Section = ({children, title,content}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[styles.sectionContent]}>
        {content}
      </Text>
    </View>

  );
};

const App: () => Node = () => {

  return (
      <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component = {HomeScreen}
        options={{title: 'React Native Project'}}
        />
      <Stack.Screen
        name = "People" component ={PeopleScreen}
        options={{title: 'People'}}
        />
      <Stack.Screen
        name = "Person" component ={PersonScreen}
        options={{title: 'Person'}}
        />
      </Stack.Navigator>
      </NavigationContainer>
  );
};





const styles = StyleSheet.create({

  sectionContainer: {
    marginTop: 20,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: "bold",

  },
  sectionContent: {
    fontSize: 15,
    color: '#000000',
  },
  button:{
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical:12,
    paddingHorizontal: 32,
  },
  text:{
  flex:1,
  alignItems: 'center',
  justifyContent: 'center',
  fontSize:20,
  lineHeight:21,
  paddingVertical:10,
  fontWeight:'bold',
  },
  scrollView:{
    marginTop:20,
  },
  container:{
    paddingTop: StatusBar.currentHeight,
  },
});



export default App;
