import { StyleSheet, View } from 'react-native';
import DetectText from "./src";

export default function App() {
  return (
    <View style={styles.container}>
      <DetectText />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
