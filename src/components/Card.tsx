import React from "react";
import { TouchableOpacity, TouchableOpacityProps, Text, StyleSheet } from "react-native";

interface skillsProps extends TouchableOpacityProps {
  skill: string;
}

export function Card({ skill, ...rest }:skillsProps) {
  return (
    <TouchableOpacity style={styles.buttonSkill}>
      <Text style={styles.textSkill} {...rest}>{skill}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonSkill: {
    backgroundColor: "#1f1e25",
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    marginVertical: 10,
  },
  textSkill: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    // alignSelf: "center",
  },
});
