import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../src/firebase';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Min 6 chars').required('Password is required'),
});

export default function SignUp() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async ({ email, password }) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      alert(err.message || 'Error signing up');
    }
  };

  return (
    <View className="flex-1 justify-center bg-white px-8">
      <Text className="text-3xl font-bold text-center text-blue-600 mb-8">
        Create Account
      </Text>

      {/* Email */}
      <Controller
        name="email"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              placeholder="Email"
              className="border border-gray-300 rounded px-4 py-3 mb-1"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && (
              <Text className="text-red-500 mb-2">{errors.email.message}</Text>
            )}
          </>
        )}
      />

      {/* Password */}
      <Controller
        name="password"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              placeholder="Password"
              className="border border-gray-300 rounded px-4 py-3 mb-1"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry
            />
            {errors.password && (
              <Text className="text-red-500 mb-2">
                {errors.password.message}
              </Text>
            )}
          </>
        )}
      />

      <TouchableOpacity
        className="bg-blue-600 rounded-full py-3 mt-4 mb-3"
        onPress={handleSubmit(onSubmit)}
      >
        <Text className="text-center text-white font-medium">Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/(auth)/sign-in')}>
        <Text className="text-center text-blue-500 mt-2">
          Already have an account? Sign in
        </Text>
      </TouchableOpacity>
    </View>
  );
}
