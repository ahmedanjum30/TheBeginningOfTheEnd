import React, { useForm, Controller, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { customerSchema } from '@/validations/(main)/customers';
import {
  View,
  Text,
  TextInput,
  Switch,
  Button,
  ScrollView,
  Alert,
  ActivityIndicator,
  Modal,
  Pressable,
} from 'react-native';
import { useEffect, useState } from 'react';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';
import { firestore } from '@/src/firebase';

// Firestore collection name
const CUSTOMERS_COLLECTION = 'customers';

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

export default function Customers() {
  const [customers, setCustomers] = useState<CustomerForm[]>([]);
  const [editing, setEditing] = useState<CustomerForm | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerForm | null>(
    null,
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CustomerForm>({
    resolver: yupResolver(customerSchema),
    defaultValues: customerSchema.cast({}),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'guaranters',
  });

  // Real-time Firestore listener
  useEffect(() => {
    setLoading(true);
    const q = query(
      collection(firestore, CUSTOMERS_COLLECTION),
      orderBy('name'),
    );
    const unsub = onSnapshot(
      q,
      (snapshot) => {
        setCustomers(
          snapshot.docs.map(
            (doc) => ({ id: doc.id, ...doc.data() }) as CustomerForm,
          ),
        );
        setLoading(false);
      },
      (err) => {
        console.log(err.message);
        setError('Failed to load customers');
        setLoading(false);
      },
    );
    return () => unsub();
  }, []);

  const onSubmit = async (data: CustomerForm) => {
    setError(null);
    try {
      if (editing) {
        await updateDoc(
          doc(firestore, CUSTOMERS_COLLECTION, editing.id!),
          data,
        );
        setEditing(null);
      } else {
        await addDoc(collection(firestore, CUSTOMERS_COLLECTION), data);
      }
      setShowForm(false);
      reset(customerSchema.cast({}));
    } catch {
      setError('Failed to save customer');
    }
  };

  const onEdit = (customer: CustomerForm) => {
    setEditing(customer);
    setShowForm(true);
    reset(customer);
  };

  const onDelete = (id: string) => {
    Alert.alert('Delete Customer', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteDoc(doc(firestore, CUSTOMERS_COLLECTION, id));
          } catch {
            setError('Failed to delete customer');
          }
        },
      },
    ]);
  };

  const onCancel = () => {
    setEditing(null);
    setShowForm(false);
    reset(customerSchema.cast({}));
  };

  // --- UI ---
  return (
    <View className="flex-1 bg-white px-4 py-6">
      <Text className="text-3xl font-bold mb-6 text-center">Customers</Text>
      {error && <Text className="text-red-600 text-center mb-2">{error}</Text>}
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#0a7ea4" />
        </View>
      ) : (
        <>
          <Button
            title="Add Customer"
            onPress={() => {
              setShowForm(true);
              setEditing(null);
              reset({
                cnic: '',
                name: '',
                email: '',
                phone: '',
                policeVerification: false,
                guaranters: [],
              });
            }}
          />
          {customers.length === 0 && (
            <Text className="mt-8 text-center text-gray-500">
              No customers yet.
            </Text>
          )}
          <ScrollView className="mt-6">
            {customers.map((cust) => (
              <Pressable
                key={cust.id}
                onPress={() => setSelectedCustomer(cust)}
                className="mb-4"
              >
                <View
                  className="p-4 rounded-xl bg-white shadow border border-gray-100"
                  style={{ elevation: 2 }}
                >
                  <Text className="font-semibold text-lg mb-1">
                    {cust.name}
                  </Text>
                  <Text className="text-gray-700 mb-1">
                    Phone: {cust.phone}
                  </Text>
                  {cust.guaranters && cust.guaranters.length > 0 && (
                    <Text className="text-gray-600 mb-2">
                      Guaranters:{' '}
                      {cust.guaranters.map((g: Guaranter) => g.name).join(', ')}
                    </Text>
                  )}
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </>
      )}
      {/* Add/Edit Modal */}
      <Modal
        visible={showForm}
        animationType="slide"
        transparent
        className="m-height-[80dvh] overflow-y-auto"
      >
        <View className="flex-1 justify-center items-center bg-black/40 px-4">
          <View className="w-full max-w-md bg-white rounded-2xl p-8 shadow-lg">
            <Text className="text-2xl font-bold mb-4 text-center">
              {editing ? 'Edit Customer' : 'Add Customer'}
            </Text>
            <Controller
              control={control}
              name="cnic"
              render={({ field: { onChange, onBlur, value } }) => (
                <View className="mb-4">
                  <TextInput
                    placeholder="CNIC"
                    className="bg-gray-100 rounded px-4 py-3"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                  {errors.cnic && (
                    <Text className="text-red-500 mt-1">
                      {errors.cnic.message}
                    </Text>
                  )}
                </View>
              )}
            />
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value } }) => (
                <View className="mb-4">
                  <TextInput
                    placeholder="Name"
                    className="bg-gray-100 rounded px-4 py-3"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                  {errors.name && (
                    <Text className="text-red-500 mt-1">
                      {errors.name.message}
                    </Text>
                  )}
                </View>
              )}
            />
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <View className="mb-4">
                  <TextInput
                    placeholder="Email (optional)"
                    className="bg-gray-100 rounded px-4 py-3"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                  {errors.email && (
                    <Text className="text-red-500 mt-1">
                      {errors.email.message}
                    </Text>
                  )}
                </View>
              )}
            />
            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, onBlur, value } }) => (
                <View className="mb-4">
                  <TextInput
                    placeholder="Phone"
                    className="bg-gray-100 rounded px-4 py-3"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    keyboardType="phone-pad"
                  />
                  {errors.phone && (
                    <Text className="text-red-500 mt-1">
                      {errors.phone.message}
                    </Text>
                  )}
                </View>
              )}
            />
            <Controller
              control={control}
              name="policeVerification"
              render={({ field: { onChange, value } }) => (
                <View className="mb-6 flex-row items-center">
                  <Text className="mr-4">Police Verification</Text>
                  <Switch value={value} onValueChange={onChange} />
                </View>
              )}
            />
            {/* Guaranters Section */}
            <Text className="text-lg font-semibold mb-2 mt-4">Guaranters</Text>
            {fields.map((field, idx) => (
              <View
                key={field.id}
                className="mb-4 p-3 rounded bg-gray-50 border border-gray-200"
              >
                <Text className="font-semibold mb-2">Guaranter #{idx + 1}</Text>
                <Controller
                  control={control}
                  name={`guaranters.${idx}.name`}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      placeholder="Name"
                      className="bg-gray-100 rounded px-4 py-2 mb-2"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name={`guaranters.${idx}.email`}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      placeholder="Email (optional)"
                      className="bg-gray-100 rounded px-4 py-2 mb-2"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  )}
                />
                <Controller
                  control={control}
                  name={`guaranters.${idx}.cnic`}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      placeholder="CNIC"
                      className="bg-gray-100 rounded px-4 py-2 mb-2"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name={`guaranters.${idx}.phone`}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      placeholder="Phone"
                      className="bg-gray-100 rounded px-4 py-2 mb-2"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      keyboardType="phone-pad"
                    />
                  )}
                />
                <Button
                  title="Remove"
                  color="#dc2626"
                  onPress={() => remove(idx)}
                />
              </View>
            ))}
            <Button
              title="Add Guaranter"
              onPress={() =>
                append({ name: '', email: '', cnic: '', phone: '' })
              }
            />
            <View className="flex-row gap-2 justify-center mt-2">
              <Button
                title={editing ? 'Update' : 'Create'}
                onPress={handleSubmit(onSubmit)}
              />
              <Button title="Cancel" color="#64748b" onPress={onCancel} />
            </View>
          </View>
        </View>
      </Modal>
      {/* Customer Details Modal */}
      <Modal
        visible={!!selectedCustomer}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setSelectedCustomer(null)}
      >
        <View className="flex-1 bg-white px-4 py-6">
          {selectedCustomer && (
            <ScrollView>
              <Text className="text-3xl font-bold mb-4 text-center">
                Customer Details
              </Text>
              <Text className="text-lg font-semibold mb-2">
                {selectedCustomer.name}
              </Text>
              <Text className="mb-1">CNIC: {selectedCustomer.cnic}</Text>
              <Text className="mb-1">Phone: {selectedCustomer.phone}</Text>
              {selectedCustomer.email && (
                <Text className="mb-1">Email: {selectedCustomer.email}</Text>
              )}
              <Text className="mb-1">
                Police Verification:{' '}
                {selectedCustomer.policeVerification ? 'Yes' : 'No'}
              </Text>
              <Text className="text-lg font-semibold mt-4 mb-2">
                Guaranters
              </Text>
              {selectedCustomer.guaranters &&
              selectedCustomer.guaranters.length > 0 ? (
                selectedCustomer.guaranters.map((g, idx) => (
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
                    onEdit(selectedCustomer);
                    setSelectedCustomer(null);
                  }}
                />
                <Button
                  title="Delete"
                  color="#dc2626"
                  onPress={() => {
                    onDelete(selectedCustomer.id!);
                    setSelectedCustomer(null);
                  }}
                />
              </View>
            </ScrollView>
          )}
          <Button title="Close" onPress={() => setSelectedCustomer(null)} />
        </View>
      </Modal>
    </View>
  );
}
