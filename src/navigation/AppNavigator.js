import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UsersListScreen from '../../UsersListScreen';
import UserFormScreen from '../screens/UserFormScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="UsersList" 
        component={UsersListScreen} 
        options={{ title: 'Users' }}
      />
      <Stack.Screen 
        name="UserForm" 
        component={UserFormScreen} 
        options={{ title: 'Add/Edit User' }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;