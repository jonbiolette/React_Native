import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import List from './pages/List.js';

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
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
       contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Section title = "React Native Prodject"></Section>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section content = "The term native refers to an app that is created for a specific
          operating system, platform or device. React Native was created out of Facebooks need to
          rely less on HTML and more on native code. It was born from a prototype that could
          generate UI elements from a background JavaScript thread."></Section>
          <Section content = "Who uses React-Native"></Section>
        </View>

        </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  sectionContainer: {
    marginTop: 20,
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: "bold",

  },
  sectionContent: {
    fontSize: 15,
    color: '#000000',
  },
});



export default App;
