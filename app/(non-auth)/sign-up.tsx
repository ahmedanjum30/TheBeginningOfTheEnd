import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../src/firebase';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpSchema } from '@/validations/(non-auth)/sign-up';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';

type SignUpData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignUp() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpData>({
    resolver: yupResolver(signUpSchema),
    defaultValues: signUpSchema.cast({}) as SignUpData,
  });

  const onSubmit = async ({ email, password }: SignUpData) => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.replace('/(main)');
    } catch (err) {
      alert((err as Error).message || 'Error signing up');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={['#1e3a8a', '#3b82f6', '#ef4444']}
      className="flex-1 justify-center items-center px-4"
    >
      <View className="w-full max-w-md bg-black/20 rounded-2xl p-8">
        <Text className="text-4xl font-bold text-white text-center mb-8">
          Create Account
        </Text>

        {/* Name */}
        <Controller
          name="name"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="mb-4">
              <TextInput
                placeholder="Full Name"
                placeholderTextColor="#ccc"
                className="bg-white rounded-full px-5 py-3 text-base"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              {errors.name && (
                <Text className="text-red-200 mt-1 ml-2">
                  {errors.name.message}
                </Text>
              )}
            </View>
          )}
        />

        {/* Email */}
        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="mb-4">
              <TextInput
                placeholder="Email"
                placeholderTextColor="#ccc"
                className="bg-white rounded-full px-5 py-3 text-base"
                keyboardType="email-address"
                autoCapitalize="none"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              {errors.email && (
                <Text className="text-red-200 mt-1 ml-2">
                  {errors.email.message}
                </Text>
              )}
            </View>
          )}
        />

        {/* Password */}
        <Controller
          name="password"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="mb-4">
              <TextInput
                placeholder="Password"
                placeholderTextColor="#ccc"
                className="bg-white rounded-full px-5 py-3 text-base"
                secureTextEntry
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              {errors.password && (
                <Text className="text-red-200 mt-1 ml-2">
                  {errors.password.message}
                </Text>
              )}
            </View>
          )}
        />

        {/* Confirm Password */}
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="mb-4">
              <TextInput
                placeholder="Confirm Password"
                placeholderTextColor="#ccc"
                className="bg-white rounded-full px-5 py-3 text-base"
                secureTextEntry
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              {errors.confirmPassword && (
                <Text className="text-red-200 mt-1 ml-2">
                  {errors.confirmPassword.message}
                </Text>
              )}
            </View>
          )}
        />

        {/* Sign Up Button */}
        <TouchableOpacity
          disabled={loading}
          onPress={handleSubmit(onSubmit)}
          className={`mt-6 mb-4 rounded-full py-3 bg-white/90 hover:bg-white hover:border hover:border-blue-500 hover:scale-105 transition-all ${
            loading ? 'opacity-70' : ''
          }`}
        >
          {loading ? (
            <ActivityIndicator color="#3b82f6" />
          ) : (
            <Text className="text-center text-lg font-semibold text-blue-600">
              Sign Up
            </Text>
          )}
        </TouchableOpacity>

        {/* Sign In Link */}
        <TouchableOpacity
          onPress={() => router.push('/(non-auth)/sign-in')}
          className="hover:scale-105 transition-transform"
        >
          <Text className="text-center text-white underline mt-2 hover:text-blue-200">
            Already have an account? Sign in
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
