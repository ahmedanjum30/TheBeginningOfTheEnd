import { Text, View, Button } from 'react-native';

const Index = () => {
  return (
    <View className="flex flex-1 justify-center items-center items-center gap-10">
      <Text>
        Welcome to Our App, Please proceed to the SignUp or SignIn Page
      </Text>
      <Button title="Sign In" onPress={() => console.log('Sign In pressed')} />
      <Button title="Sign Up" onPress={() => console.log('Sign Up pressed')} />
    </View>
  );
};

export default Index;
