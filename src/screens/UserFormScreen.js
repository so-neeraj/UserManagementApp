import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createUser, editUser } from '../store/usersSlice';
import UserForm from '../components/UserForm';

const UserFormScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { user } = route.params || {};
  const [isSubmitting, setIsSubmitting] = useState(false);
  const error = useSelector(state => state.users.error);

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      if (user) {
        await dispatch(editUser({ id: user.id, userData: values }));
      } else {
        await dispatch(createUser(values));
      }
      navigation.goBack();
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <UserForm 
        initialValues={user} 
        onSubmit={handleSubmit} 
        isSubmitting={isSubmitting}
        error={error}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default UserFormScreen;