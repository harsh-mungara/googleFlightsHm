import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFlight } from '../context/FlightContext';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';

const SearchScreen = () => {
  const navigation = useNavigation();
  const { searchParams, setSearchParams, searchFlights } = useFlight();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateType, setDateType] = useState<'departure' | 'return'>('departure');

  const handleSearch = () => {
    if (!searchParams.origin || !searchParams.destination || !searchParams.departureDate) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    searchFlights();
    navigation.navigate('FlightResults' as never);
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const dateString = selectedDate.toISOString().split('T')[0];
      if (dateType === 'departure') {
        setSearchParams({ ...searchParams, departureDate: dateString });
      } else {
        setSearchParams({ ...searchParams, returnDate: dateString });
      }
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Select Date';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.title}>{'Search Flights'}</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>{'From'}</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter origin airport"
              value={searchParams.origin}
              onChangeText={(text) => setSearchParams({ ...searchParams, origin: text })}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>{'To'}</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter destination airport"
              value={searchParams.destination}
              onChangeText={(text) => setSearchParams({ ...searchParams, destination: text })}
            />
          </View>

          <View style={styles.tripTypeContainer}>
            <Text style={styles.label}>{'Trip Type'}</Text>
            <View style={styles.tripTypeButtons}>
              <TouchableOpacity
                style={[
                  styles.tripTypeButton,
                  !searchParams.returnDate && styles.tripTypeButtonActive,
                ]}
                onPress={() => setSearchParams({ ...searchParams, returnDate: undefined })}
              >
                <Text
                  style={[
                    styles.tripTypeButtonText,
                    !searchParams.returnDate && styles.tripTypeButtonTextActive,
                  ]}
                >
                  {'One Way'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.tripTypeButton,
                  searchParams.returnDate && styles.tripTypeButtonActive,
                ]}
                onPress={() => setSearchParams({ ...searchParams, returnDate: '' })}
              >
                <Text
                  style={[
                    styles.tripTypeButtonText,
                    searchParams.returnDate && styles.tripTypeButtonTextActive,
                  ]}
                >
                 {'Round Trip'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.dateContainer}>
            <View style={styles.dateInput}>
              <Text style={styles.label}>{'Departure'}</Text>
              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => {
                  setDateType('departure');
                  setShowDatePicker(true);
                }}
              >
                <Text style={styles.dateButtonText}>
                  {formatDate(searchParams.departureDate)}
                </Text>
                <Icon name="calendar" size={20} color="#666" />
              </TouchableOpacity>
            </View>

            {searchParams.returnDate !== undefined && (
              <View style={styles.dateInput}>
                <Text style={styles.label}>{'Return'}</Text>
                <TouchableOpacity
                  style={styles.dateButton}
                  onPress={() => {
                    setDateType('return');
                    setShowDatePicker(true);
                  }}
                >
                  <Text style={styles.dateButtonText}>
                    {formatDate(searchParams.returnDate)}
                  </Text>
                  <Icon name="calendar" size={20} color="#666" />
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>{'Passengers'}</Text>
            <View style={styles.passengerContainer}>
              <TouchableOpacity
                style={styles.passengerButton}
                onPress={() =>
                  setSearchParams({
                    ...searchParams,
                    passengers: Math.max(1, searchParams.passengers - 1),
                  })
                }
              >
                <Icon name="remove" size={20} color="#007AFF" />
              </TouchableOpacity>
              <Text style={styles.passengerCount}>{searchParams.passengers}</Text>
              <TouchableOpacity
                style={styles.passengerButton}
                onPress={() =>
                  setSearchParams({
                    ...searchParams,
                    passengers: searchParams.passengers + 1,
                  })
                }
              >
                <Icon name="add" size={20} color="#007AFF" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>{'Cabin Class'}</Text>
            <View style={styles.cabinClassContainer}>
              {['economy', 'premium', 'business', 'first'].map((cabin) => (
                <TouchableOpacity
                  key={cabin}
                  style={[
                    styles.cabinClassButton,
                    searchParams.cabinClass === cabin && styles.cabinClassButtonActive,
                  ]}
                  onPress={() => setSearchParams({ ...searchParams, cabinClass: cabin })}
                >
                  <Text
                    style={[
                      styles.cabinClassButtonText,
                      searchParams.cabinClass === cabin && styles.cabinClassButtonTextActive,
                    ]}
                  >
                    {cabin.charAt(0).toUpperCase() + cabin.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>{'Search Flights'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {showDatePicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
          minimumDate={new Date()}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#ffffff',
  },
  tripTypeContainer: {
    marginBottom: 20,
  },
  tripTypeButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  tripTypeButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  tripTypeButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  tripTypeButtonText: {
    fontSize: 14,
    color: '#666',
  },
  tripTypeButtonTextActive: {
    color: '#ffffff',
    fontWeight: '600',
  },
  dateContainer: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 20,
  },
  dateInput: {
    flex: 1,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    backgroundColor: '#ffffff',
  },
  dateButtonText: {
    fontSize: 16,
    color: '#1a1a1a',
  },
  passengerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  passengerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  passengerCount: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  cabinClassContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  cabinClassButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cabinClassButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  cabinClassButtonText: {
    fontSize: 12,
    color: '#666',
  },
  cabinClassButtonTextActive: {
    color: '#ffffff',
    fontWeight: '600',
  },
  searchButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  searchButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SearchScreen; 