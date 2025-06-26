import { Text, View, TouchableOpacity } from 'react-native';

const Index = () => {
  return (
    <View className="flex flex-1 justify-center items-center gap-10">
      <Text>
        Welcome to Our App, Please proceed to the SignUp or SignIn Page
      </Text>

      <TouchableOpacity
        onPress={() => console.log('Sign In pressed')}
        className="bg-blue-500 p-3 rounded-lg"
      >
        <Text className="text-white font-bold">Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => console.log('Sign Up pressed')}
        className="bg-green-500 p-3 rounded-lg"
      >
        <Text className="text-white font-bold">Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Index;
