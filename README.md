# Maldives Fish Market App

A React Native mobile application that digitizes the fish market in Male, Maldives, connecting fishermen with customers through a seamless mobile platform.

## About

This app serves as a digital marketplace for fresh fish, allowing fishermen to list their daily catch and customers to browse, search, and purchase fish with convenient pickup or delivery options.

## Features

### For Fishermen
- **User Authentication**: Secure registration and login system
- **Fish Listing Management**: Add, edit, and delete fish listings
- **Real-time Updates**: View sales status of posted fish
- **Personal Dashboard**: See only your own fish listings
- **Automatic Sold Status**: Fish automatically marked as sold when purchased

### For Customers
- **User Authentication**: Secure registration and login system
- **Browse Fish**: View all available fish from all fishermen
- **Search Functionality**: Find specific fish by name
- **Shopping Cart**: Add multiple fish to cart before purchasing
- **Flexible Delivery Options**: 
  - Pickup: Free collection from fish market
  - Delivery: Home delivery for MVR 10 fee
- **Secure Payment**: Simulated card payment process
- **Order Confirmation**: Clear success messages with next steps

## Technology Stack

- **Framework**: React Native with Expo
- **Navigation**: React Navigation v6 (Native Stack Navigator)
- **State Management**: React Context API
- **Local Storage**: AsyncStorage for data persistence
- **UI**: Custom styled components with React Native

## Prerequisites

Before running this project, ensure you have:

- Node.js (v14 or higher)
- npm or yarn package manager
- Expo CLI
- Expo Go app on your mobile device (iOS or Android)

## Installation

1. **Clone the repository**
```bash
   git clone https://github.com/Shaihan-Fathhulla/MaldivesFishMarket.git
   cd MaldivesFishMarket
```

2. **Install dependencies**
```bash
   npm install @react-native-async-storage/async-storage
   npm install @react-navigation/native @react-navigation/native-stack
   npx expo install react-native-screens react-native-safe-area-context
```

3. **Start the development server**
```bash
   npx expo start
```

4. **Run on your device**
   - Open the Expo Go app on your phone
   - Scan the QR code displayed in your terminal
   - The app will load on your device

## Project Structure
```
MaldivesFishMarket/
├── App.js                           # Main app entry point with navigation
├── package.json                     # Project dependencies
├── README.md                        # This file
└── src/
    ├── components/                  # Reusable UI components
    │   └── FishCard.js              # Fish listing card component
    ├── context/                     # React Context for state management
    │   └── AuthContext.js           # Authentication context
    ├── screens/                     # All app screens
    │   ├── RoleSelectionScreen.js   # Choose fisherman or customer
    │   ├── AuthScreen.js            # Login/Register screen
    │   ├── FishermanHomeScreen.js   # Fisherman dashboard
    │   ├── AddEditFishScreen.js     # Add/Edit fish form
    │   ├── CustomerHomeScreen.js    # Customer marketplace
    │   ├── CartScreen.js            # Shopping cart
    │   ├── DeliveryOptionScreen.js  # Choose pickup/delivery
    │   ├── AddressInputScreen.js    # Delivery address form
    │   ├── PaymentScreen.js         # Payment details form
    │   └── PurchaseSuccessScreen.js # Order confirmation
    ├── styles/                      # Styling
    │   └── globalStyles.js          # Global styles and colors
    └── utils/                       # Helper functions
        └── storage.js               # AsyncStorage helper functions
```

## User Guide

### Getting Started as a Fisherman

1. **Launch the app** and select "I want to SELL fish"
2. **Register** with your full name, username, and password
3. **Login** with your credentials
4. **Add fish** by clicking "+ Add New Fish"
5. **Enter details**: Fish name, weight (kg), and price (MVR)
6. **Manage listings**: Edit or delete your fish as needed
7. **View sales**: Fish automatically marked as sold when purchased

### Getting Started as a Customer

1. **Launch the app** and select "I want to BUY fish"
2. **Register** with your full name, username, and password
3. **Login** with your credentials
4. **Browse fish** available from all fishermen
5. **Search** for specific fish using the search bar
6. **Add to cart** by clicking on fish you want to purchase
7. **Review cart** and remove items if needed
8. **Choose delivery option**: Pickup (free) or Delivery (+MVR 10)
9. **Enter payment details** (simulation only - no real charges)
10. **Complete purchase** and receive confirmation

## Data Storage

This app uses **AsyncStorage** for local data persistence:
- **Users**: All registered fishermen and customers
- **Fish Listings**: All posted fish with details
- **Cart**: Temporary cart items per session

**Note**: Data is stored locally on your device and will persist between app sessions.

## Design Features

- **Intuitive UI**: Clear, user-friendly interface
- **Role-based Navigation**: Different experiences for fishermen vs customers
- **Real-time Updates**: Immediate reflection of changes
- **Responsive Design**: Works on various screen sizes
- **Visual Feedback**: Alerts and confirmations for user actions

## App Flow
```
Role Selection → Auth (Login/Register) → User Type Dashboard

Fisherman Flow:
Home → Add/Edit Fish → View Listings → Logout

Customer Flow:
Home → Search/Browse → Add to Cart → Cart → 
Delivery Option → Address (if delivery) → Payment → Success
```

## Testing the App

### Test Fisherman Account
1. Register as fisherman with any credentials
2. Add several fish with different names and prices
3. Try editing and deleting fish
4. Log out and log back in to verify data persistence

### Test Customer Account
1. Register as customer with any credentials
2. Search for fish by name
3. Add multiple fish to cart
4. Remove items from cart
5. Complete purchase with both pickup and delivery options
6. Verify fish disappear from marketplace after purchase

## Troubleshooting

### App won't start
- Clear cache: `npx expo start --clear`
- Reinstall dependencies: `rm -rf node_modules && npm install`

### Data not persisting
- AsyncStorage requires proper permissions
- Check for console errors in terminal

### Navigation issues
- Ensure all screen names match exactly
- Check that navigation props are passed correctly

## Limitations

- **No backend**: All data stored locally (not shared between devices)
- **No real payment**: Payment system is simulated for prototype purposes
- **No image uploads**: Fish listings use text descriptions only
- **Single device**: Each device has its own separate data

## Future Enhancements

- Backend API integration with database
- Real payment gateway integration
- Image upload for fish listings
- Push notifications for new listings
- Rating and review system
- Order history tracking
- Multiple language support (Dhivehi/English)
- GPS location for delivery tracking

**Note**: This is a prototype application designed to demonstrate functionality. It does not process real payments or connect to external services.
