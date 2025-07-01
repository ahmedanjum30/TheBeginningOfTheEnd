import React from 'react';
import { Modal, View, Text, Button, ScrollView } from 'react-native';

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

export default function CustomerDetailsModal({
  customer,
  visible,
  onClose,
  onEdit,
  onDelete,
}: {
  customer: CustomerForm | null;
  visible: boolean;
  onClose: () => void;
  onEdit: (customer: CustomerForm) => void;
  onDelete: (id: string) => void;
}) {
  if (!customer) return null;
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-white px-4 py-6">
        <ScrollView>
          <Text className="text-3xl font-bold mb-4 text-center">
            Customer Details
          </Text>
          <Text className="text-lg font-semibold mb-2">{customer.name}</Text>
          <Text className="mb-1">CNIC: {customer.cnic}</Text>
          <Text className="mb-1">Phone: {customer.phone}</Text>
          {customer.email && (
            <Text className="mb-1">Email: {customer.email}</Text>
          )}
          <Text className="mb-1">
            Police Verification: {customer.policeVerification ? 'Yes' : 'No'}
          </Text>
          <Text className="text-lg font-semibold mt-4 mb-2">Guaranters</Text>
          {customer.guaranters && customer.guaranters.length > 0 ? (
            customer.guaranters.map((g: Guaranter, idx: number) => (
              <View
                key={idx}
                className="mb-3 p-3 rounded bg-gray-50 border border-gray-200"
              >
                <Text className="font-semibold">{g.name}</Text>
                <Text>CNIC: {g.cnic}</Text>
                <Text>Phone: {g.phone}</Text>
                {g.email && <Text>Email: {g.email}</Text>}
              </View>
            ))
          ) : (
            <Text className="text-gray-500">No guaranters</Text>
          )}
          <View className="flex-row gap-2 justify-center mt-4">
            <Button
              title="Edit"
              onPress={() => {
                onEdit(customer);
                onClose();
              }}
            />
            <Button
              title="Delete"
              color="#dc2626"
              onPress={() => {
                onDelete(customer.id!);
                onClose();
              }}
            />
          </View>
          <Button title="Close" onPress={onClose} />
        </ScrollView>
      </View>
    </Modal>
  );
}
