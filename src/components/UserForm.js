import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import * as Yup from 'yup';
import { Formik } from 'formik';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().required('Phone is required'),
  website: Yup.string().url('Invalid URL'),
});

const UserForm = ({ initialValues, onSubmit, isSubmitting, error }) => {
  const defaultValues = {
    name: '',
    email: '',
    phone: '',
    website: '',
    ...initialValues,
  };

  return (
    <Formik
      initialValues={defaultValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.container}>
          {error && <Text style={styles.error}>{error}</Text>}
          
          <TextInput
            style={styles.input}
            placeholder="Name"
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            value={values.name}
          />
          {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}
          
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            keyboardType="email-address"
          />
          {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}
          
          <TextInput
            style={styles.input}
            placeholder="Phone"
            onChangeText={handleChange('phone')}
            onBlur={handleBlur('phone')}
            value={values.phone}
            keyboardType="phone-pad"
          />
          {touched.phone && errors.phone && <Text style={styles.error}>{errors.phone}</Text>}
          
          <TextInput
            style={styles.input}
            placeholder="Website"
            onChangeText={handleChange('website')}
            onBlur={handleBlur('website')}
            value={values.website}
            keyboardType="url"
          />
          {touched.website && errors.website && <Text style={styles.error}>{errors.website}</Text>}
          
          <Button
            title={isSubmitting ? 'Submitting...' : 'Submit'}
            onPress={handleSubmit}
            disabled={isSubmitting}
          />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  error: {
    color: 'red',
    marginBottom: 8,
  },
});

export default UserForm;