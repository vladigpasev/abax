import { Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaProvider>
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </SafeAreaProvider>
  );
}
