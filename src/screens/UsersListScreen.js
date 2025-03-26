import React, { useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, removeUser, setCurrentPage } from '../store/usersSlice';
import UserItem from '../components/UserItem';

const UsersListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { users, loading, error, currentPage } = useSelector(state => state.users);

  useEffect(() => {
    dispatch(getUsers(currentPage));
  }, [dispatch, currentPage]);

  const handleDelete = (id) => {
    dispatch(removeUser(id));
  };

  const handleEdit = (user) => {
    navigation.navigate('UserForm', { user });
  };

  const handleAdd = () => {
    navigation.navigate('UserForm');
  };

  const handleNextPage = () => {
    dispatch(setCurrentPage(currentPage + 1));
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button title="Add User" onPress={handleAdd} />
      
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <UserItem 
            user={item} 
            onDelete={handleDelete} 
            onEdit={handleEdit} 
          />
        )}
      />
      
      <View style={styles.pagination}>
        <Button 
          title="Previous" 
          onPress={handlePrevPage} 
          disabled={currentPage === 1}
        />
        <Text style={styles.pageNumber}>{currentPage}</Text>
        <Button 
          title="Next" 
          onPress={handleNextPage} 
          disabled={users.length < 10} // Assuming 10 items per page
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  pageNumber: {
    marginHorizontal: 20,
    fontSize: 18,
  },
});

export default UsersListScreen;