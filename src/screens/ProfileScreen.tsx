import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { useAuth } from '../hooks/useAuth';
import Icon from 'react-native-vector-icons/Ionicons';

const ProfileScreen = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: signOut,
        },
      ]
    );
  };

  const menuItems = [
    {
      title: 'My Bookings',
      icon: 'bookmark',
      action: () => {},
    },
    {
      title: 'Saved Flights',
      icon: 'heart',
      action: () => {},
    },
    {
      title: 'Price Alerts',
      icon: 'notifications',
      action: () => {},
    },
    {
      title: 'Payment Methods',
      icon: 'card',
      action: () => {},
    },
    {
      title: 'Travel Preferences',
      icon: 'settings',
      action: () => {},
    },
    {
      title: 'Help & Support',
      icon: 'help-circle',
      action: () => {},
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>
              {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
            </Text>
          </View>
          <Text style={styles.userName}>{user?.displayName || 'User'}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={item.action}
            >
              <View style={styles.menuItemLeft}>
                <Icon name={item.icon as any} size={24} color="#007AFF" />
                <Text style={styles.menuItemText}>{item.title}</Text>
              </View>
              <Icon name="chevron-forward" size={20} color="#ccc" />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.signOutContainer}>
          <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
            <Icon name="log-out-outline" size={24} color="#ff6b6b" />
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  profileHeader: {
    backgroundColor: '#ffffff',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
  },
  menuContainer: {
    backgroundColor: '#ffffff',
    marginTop: 20,
    borderRadius: 12,
    marginHorizontal: 20,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    color: '#1a1a1a',
    marginLeft: 15,
  },
  signOutContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ff6b6b',
  },
  signOutText: {
    fontSize: 16,
    color: '#ff6b6b',
    fontWeight: '600',
    marginLeft: 10,
  },
  appInfo: {
    alignItems: 'center',
    padding: 20,
    marginTop: 20,
  },
  appVersion: {
    fontSize: 14,
    color: '#999',
  },
});

export default ProfileScreen; 