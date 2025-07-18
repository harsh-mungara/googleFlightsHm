import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { useFlight } from '../context/FlightContext';
import Icon from 'react-native-vector-icons/Ionicons';

const FlightResultsScreen = () => {
  const { searchResults, isLoading, error, searchParams } = useFlight();

  const renderFlightItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.flightCard}>
      <View style={styles.flightHeader}>
        <Text style={styles.airline}>{item.airline}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>

      <View style={styles.flightRoute}>
        <View style={styles.flightTime}>
          <Text style={styles.time}>{item.departure.time}</Text>
          <Text style={styles.airport}>{item.departure.airport}</Text>
        </View>

        <View style={styles.flightDuration}>
          <View style={styles.durationLine}>
            <View style={styles.durationDot} />
            <View style={styles.durationLineInner} />
            <View style={styles.durationDot} />
          </View>
          <Text style={styles.duration}>{item.duration}</Text>
          <Text style={styles.stops}>
            {item.stops === 0 ? 'Direct' : `${item.stops} stop${item.stops > 1 ? 's' : ''}`}
          </Text>
        </View>

        <View style={styles.flightTime}>
          <Text style={styles.time}>{item.arrival.time}</Text>
          <Text style={styles.airport}>{item.arrival.airport}</Text>
        </View>
      </View>

      <View style={styles.flightFooter}>
        <Text style={styles.flightNumber}>{item.flightNumber}</Text>
        <TouchableOpacity style={styles.selectButton}>
          <Text style={styles.selectButtonText}>Select</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Searching for flights...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Icon name="alert-circle" size={48} color="#ff6b6b" />
          <Text style={styles.errorTitle}>Search Failed</Text>
          <Text style={styles.errorMessage}>{error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Flight Results</Text>
        <Text style={styles.headerSubtitle}>
          {searchParams.origin} → {searchParams.destination}
        </Text>
        <Text style={styles.resultCount}>
          {searchResults.length} flight{searchResults.length !== 1 ? 's' : ''} found
        </Text>
      </View>

      <FlatList
        data={searchResults}
        renderItem={renderFlightItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="alert-circle" size={48} color="#ff6b6b" />
            <Text style={styles.emptyTitle}>No flights found</Text>
            <Text style={styles.emptyMessage}>
              Try adjusting your search criteria or dates
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  resultCount: {
    fontSize: 14,
    color: '#999',
  },
  listContainer: {
    padding: 20,
  },
  flightCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  flightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  airline: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  flightRoute: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  flightTime: {
    flex: 1,
  },
  time: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  airport: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  flightDuration: {
    flex: 1,
    alignItems: 'center',
  },
  durationLine: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  durationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#007AFF',
  },
  durationLineInner: {
    flex: 1,
    height: 2,
    backgroundColor: '#ddd',
    marginHorizontal: 8,
  },
  duration: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  stops: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  flightFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flightNumber: {
    fontSize: 14,
    color: '#666',
  },
  selectButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 6,
  },
  selectButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginTop: 15,
    marginBottom: 10,
  },
  errorMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginTop: 15,
    marginBottom: 10,
  },
  emptyMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default FlightResultsScreen; 