# Google Flights Clone

A React Native mobile application that replicates Google Flights functionality with authentication and real-time flight search using the Sky Scrapper API.

## Features

### 🔐 Authentication
- **Firebase Authentication**: Secure user registration and login
- **Email/Password**: Traditional authentication method
- **Password Reset**: Forgot password functionality
- **User Profile**: Display user information and settings

### ✈️ Flight Search
- **Real-time Search**: Integration with Sky Scrapper API
- **Advanced Filters**: Origin, destination, dates, passengers, cabin class
- **Trip Types**: One-way and round-trip options
- **Flight Results**: Detailed flight information with pricing

### 🎨 UI/UX
- **Navigation**: Tab-based navigation with stack navigation
- **Loading States**: Proper loading indicators and error handling

### 📱 Screens
- **Home Screen**: Welcome dashboard with quick actions and popular destinations
- **Search Screen**: Comprehensive flight search form
- **Flight Results**: Display search results with flight details
- **Profile Screen**: User account management and settings

### Run the Application

#### Android
```bash
# Start Metro bundler
npx react-native start

# Run on Android
npx react-native run-android
```

#### iOS
```bash
# Install iOS dependencies
cd ios && pod install && cd ..

# Run on iOS
npx react-native run-ios
```

## Project Structure

```
src/google-flights-clone/
├── App.tsx                    # Main application component
├── context/                   # React Context providers
│   ├── AuthContext.tsx       # Authentication state management
│   └── FlightContext.tsx     # Flight search state management
├── hooks/                     # Custom React hooks
│   └── useAuth.ts            # Authentication hook
├── navigation/                # Navigation configuration
│   ├── AuthNavigator.tsx     # Authentication flow navigation
│   └── MainNavigator.tsx     # Main app navigation
├── screens/                   # Application screens
│   ├── auth/                 # Authentication screens
│   │   ├── LoginScreen.tsx
│   │   ├── SignUpScreen.tsx
│   │   └── ForgotPasswordScreen.tsx
│   ├── HomeScreen.tsx        # Home dashboard
│   ├── SearchScreen.tsx      # Flight search form
│   ├── FlightResultsScreen.tsx # Search results
│   └── ProfileScreen.tsx     # User profile
└── services/                  # API services
    └── flightService.ts      # Sky Scrapper API integration
```

## API Integration

The application integrates with the Sky Scrapper API to provide real-time flight search capabilities:

### Endpoints Used
- **Flight Search**: `/api/v1/flights/search`
- **Airport Suggestions**: `/api/v1/flights/airports`

### Features
- Real-time flight pricing
- Multiple cabin class options
- Flexible date selection
- Passenger count management
- Round-trip and one-way options

## Authentication Flow

1. **Sign Up**: Users create accounts with email and password
2. **Sign In**: Existing users authenticate with credentials
3. **Password Reset**: Users can reset passwords via email
4. **Profile Management**: Users can view and manage their accounts