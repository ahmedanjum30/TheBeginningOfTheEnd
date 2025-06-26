import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
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
import { signInSchema } from '@/validations/(auth)/sign-in';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';

export default function SignIn() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInSchema),
    defaultValues: signInSchema.cast({}),
  });

  const onSubmit = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace('/(main)');
    } catch (err) {
      alert((err as Error).message || 'Error signing in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={['#1e3a8a', '#3b82f6', '#ef4444']}
      className="flex-1 justify-center items-center px-4"
    >
      {/* Centered Card */}
      <View className="w-full max-w-md bg-black/20 rounded-2xl p-8">
        <Text className="text-4xl font-bold text-white text-center mb-8">
          Welcome Back
        </Text>

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

        {/* Sign In Button */}
        <TouchableOpacity
          disabled={loading}
          onPress={handleSubmit(onSubmit)}
          className={`
        mt-6 mb-4 rounded-full py-3 bg-white/90
        hover:bg-white hover:border hover:border-purple-500 hover:scale-105
        transition-all ${loading ? 'opacity-70' : ''}
      `}
        >
          {loading ? (
            <ActivityIndicator color="#6B46C1" />
          ) : (
            <Text className="text-center text-lg font-semibold text-purple-700">
              Sign In
            </Text>
          )}
        </TouchableOpacity>

        {/* Sign Up Link */}
        <TouchableOpacity
          onPress={() => router.push('/(auth)/sign-up')}
          className="hover:scale-105 transition-transform"
        >
          <Text className="text-center text-white underline mt-2 hover:text-blue-200">
            Don’t have an account? Sign up
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
