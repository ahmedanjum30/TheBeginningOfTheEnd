import React from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  Switch,
  Button,
  ScrollView,
} from 'react-native';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { customerSchema } from '../../validations/(main)/customers';

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

export default function CustomerFormModal({
  visible,
  onClose,
  onSubmit,
  editing,
  initialValues,
}: {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: CustomerForm) => void;
  editing: CustomerForm | null;
  initialValues: CustomerForm;
}) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CustomerForm>({
    resolver: yupResolver(customerSchema),
    defaultValues: initialValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'guaranters',
  });

  React.useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset, visible]);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View className="flex-1 justify-center items-center bg-black/40 px-4">
        <View className="w-full max-w-md bg-white rounded-2xl p-8 shadow-lg max-h-[90vh]">
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
                    <>
                      <TextInput
                        placeholder="Name"
                        className="bg-gray-100 rounded px-4 py-2 mb-2"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                      {errors.guaranters && errors.guaranters[idx]?.name && (
                        <Text className="text-red-500 mb-1">
                          {errors.guaranters[idx]?.name?.message}
                        </Text>
                      )}
                    </>
                  )}
                />
                <Controller
                  control={control}
                  name={`guaranters.${idx}.email`}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <>
                      <TextInput
                        placeholder="Email (optional)"
                        className="bg-gray-100 rounded px-4 py-2 mb-2"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        keyboardType="email-address"
                        autoCapitalize="none"
                      />
                      {errors.guaranters && errors.guaranters[idx]?.email && (
                        <Text className="text-red-500 mb-1">
                          {errors.guaranters[idx]?.email?.message}
                        </Text>
                      )}
                    </>
                  )}
                />
                <Controller
                  control={control}
                  name={`guaranters.${idx}.cnic`}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <>
                      <TextInput
                        placeholder="CNIC"
                        className="bg-gray-100 rounded px-4 py-2 mb-2"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                      {errors.guaranters && errors.guaranters[idx]?.cnic && (
                        <Text className="text-red-500 mb-1">
                          {errors.guaranters[idx]?.cnic?.message}
                        </Text>
                      )}
                    </>
                  )}
                />
                <Controller
                  control={control}
                  name={`guaranters.${idx}.phone`}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <>
                      <TextInput
                        placeholder="Phone"
                        className="bg-gray-100 rounded px-4 py-2 mb-2"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        keyboardType="phone-pad"
                      />
                      {errors.guaranters && errors.guaranters[idx]?.phone && (
                        <Text className="text-red-500 mb-1">
                          {errors.guaranters[idx]?.phone?.message}
                        </Text>
                      )}
                    </>
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
              <Button title="Cancel" color="#64748b" onPress={onClose} />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
