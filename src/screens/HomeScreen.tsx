import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../hooks/useAuth';
import Icon from 'react-native-vector-icons/Ionicons';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();

  const popularDestinations = [
    { name: 'New York', code: 'NYC', image: '🌆' },
    { name: 'London', code: 'LHR', image: '🇬🇧' },
    { name: 'Tokyo', code: 'NRT', image: '🇯🇵' },
    { name: 'Paris', code: 'CDG', image: '🇫🇷' },
    { name: 'Dubai', code: 'DXB', image: '🇦🇪' },
    { name: 'Singapore', code: 'SIN', image: '🇸🇬' },
  ];

  const quickActions = [
    { title: 'Search Flights', icon: 'search', action: () => navigation.navigate('Search' as never) },
    { title: 'My Bookings', icon: 'bookmark', action: () => {} },
    { title: 'Flight Status', icon: 'airplane', action: () => {} },
    { title: 'Price Alerts', icon: 'notifications', action: () => {} },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.greeting}>
            Hello, {user?.displayName || 'Traveler'}!
          </Text>
          <Text style={styles.subtitle}>Where would you like to go today?</Text>
        </View>

        <View style={styles.quickSearchContainer}>
          <TouchableOpacity
            style={styles.quickSearchButton}
            onPress={() => navigation.navigate('Search' as never)}
          >
            <Icon name="search" size={24} color="#007AFF" />
            <Text style={styles.quickSearchText}>Search for flights</Text>
            <Icon name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={styles.actionCard}
                onPress={action.action}
              >
                <Icon name={action.icon as any} size={24} color="#007AFF" />
                <Text style={styles.actionText}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Destinations</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {popularDestinations.map((destination, index) => (
              <TouchableOpacity
                key={index}
                style={styles.destinationCard}
                onPress={() => {
                  navigation.navigate('Search' as never);
                }}
              >
                <Text style={styles.destinationEmoji}>{destination.image}</Text>
                <Text style={styles.destinationName}>{destination.name}</Text>
                <Text style={styles.destinationCode}>{destination.code}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Searches</Text>
          <View style={styles.recentSearchItem}>
            <View style={styles.recentSearchInfo}>
              <Text style={styles.recentSearchRoute}>NYC → LHR</Text>
              <Text style={styles.recentSearchDate}>Dec 15, 2024</Text>
            </View>
            <TouchableOpacity style={styles.recentSearchButton}>
              <Text style={styles.recentSearchButtonText}>Search Again</Text>
            </TouchableOpacity>
          </View>
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
  header: {
    padding: 20,
    backgroundColor: '#ffffff',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  quickSearchContainer: {
    padding: 20,
  },
  quickSearchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickSearchText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#666',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 15,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    textAlign: 'center',
  },
  destinationCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginRight: 15,
    minWidth: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  destinationEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  destinationName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    textAlign: 'center',
  },
  destinationCode: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  recentSearchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recentSearchInfo: {
    flex: 1,
  },
  recentSearchRoute: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  recentSearchDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  recentSearchButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 6,
  },
  recentSearchButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default HomeScreen; 