import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { increaseCount, decreaseCount, removeItem } from './cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const cartArray = Object.values(cartItems); // Convert object to array

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart</Text>

      {cartArray.length === 0 ? (
        <Text style={styles.emptyCart}>Your cart is empty</Text>
      ) : (
        <FlatList
          data={cartArray}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text>Price: ${item.price}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => dispatch(decreaseCount(item.id))}>
                  <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.count}>{item.count}</Text>
                <TouchableOpacity style={styles.button} onPress={() => dispatch(increaseCount(item.id))}>
                  <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.removeButton} onPress={() => dispatch(removeItem(item.id))}>
                <Text style={styles.buttonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8f8f8' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  emptyCart: { fontSize: 18, textAlign: 'center', marginTop: 50 },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 3,
  },
  productName: { fontSize: 18, fontWeight: 'bold' },
  buttonContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  button: { backgroundColor: '#007bff', padding: 10, borderRadius: 5, marginHorizontal: 5 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  count: { fontSize: 18, fontWeight: 'bold', marginHorizontal: 5 },
  removeButton: { backgroundColor: 'red', padding: 10, borderRadius: 5, marginTop: 10, alignItems: 'center' },
});

export default Cart;
