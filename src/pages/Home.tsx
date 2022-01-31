import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Platform,
  FlatList,
  NativeModules,
} from "react-native";
import { Button } from "../components/Button";
import { Card } from "../components/Card";

interface skillData {
  id: string;
  name: string;
}

export function Home() {
  const [newSkill, setNewSkill] = useState("");
  const [skills, setSkills] = useState<skillData[]>([]);
  const [gretting, setGretting] = useState("");

  function handleAddSkill() {
    const data = {
      id: new Date().getTime().toString(),
      name: newSkill,
    };
    if ("" !== newSkill) {
      NativeModules.TutorialModule.myMethod("Tentativa sla");
      setSkills([...skills, data]);
    }
    setNewSkill("");
  }

  function handleRemoveSkill(skillID: string) {
    const data = skills.filter((skill) => skill.id !== skillID);
    setSkills(data);
  }

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      setGretting("Good Morning");
    } else if (currentHour < 18) {
      setGretting("Good Afternoon");
    } else {
      setGretting("Good Evening");
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome, Gregory</Text>
      <Text style={styles.greetings}>{gretting}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your skills"
        placeholderTextColor="#999"
        onChangeText={setNewSkill}
        value={newSkill}
      />

      <Button onPress={handleAddSkill} title="Add" />

      <Text style={[styles.title, { marginVertical: 50 }]}>My skills</Text>

      <FlatList
        data={skills}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card skill={item.name} onPress={() => handleRemoveSkill(item.id)} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121015",
    paddingHorizontal: 30,
    paddingVertical: 70,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  input: {
    height: 50,
    backgroundColor: "#1f1e25",
    color: "#fff",
    marginTop: 20,
    padding: Platform.OS === "ios" ? 15 : 10,
    fontSize: 18,
    borderRadius: 5,
  },
  greetings: {
    color: "#fff",
  },
});
