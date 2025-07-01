import React from 'react';
import { Pressable, View, Text } from 'react-native';

type Guaranter = {
  name: string;
  email: string;
  cnic: string;
  phone: string;
};

type CustomerForm = {
  id?: string;
  cnic: string;
  name: string;
  email: string;
  phone: string;
  policeVerification: boolean;
  guaranters: Guaranter[];
};

export default function CustomerRow({
  customer,
  onPress,
}: {
  customer: CustomerForm;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} className="mb-4">
      <View
        className="p-4 rounded-xl bg-white shadow border border-gray-100"
        style={{ elevation: 2 }}
      >
        <Text className="font-semibold text-lg mb-1">{customer.name}</Text>
        <Text className="text-gray-700 mb-1">Phone: {customer.phone}</Text>
        {customer.guaranters && customer.guaranters.length > 0 && (
          <Text className="text-gray-600 mb-2">
            {`Guaranters: ${customer.guaranters.map((g: Guaranter) => g.name).join(', ')}`}
          </Text>
        )}
      </View>
    </Pressable>
  );
}
