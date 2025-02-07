import React,{useState, useEffect, useLayoutEffect} from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity,Image } from 'react-native';
import { GetProducts } from '../Api/apiCalls';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { addItem,removeItem } from '../Redux/cartSlice';

function Home() {

  const [productData, setProductData] = useState([]);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const cartCount = useSelector(state => state.cart.totalCount);
  const productCount = useSelector((state) => state.cart.items || 0);
  


  useLayoutEffect(() => {
    navigation.setOptions({
        headerRight: () => (
            <TouchableOpacity 
                onPress={() => navigation.navigate("Cart")} 
                style={{ marginRight: 15, padding: 5 }}
            >
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    🛒 {cartCount > 0 ? `(${cartCount})` : ""}
                </Text>
            </TouchableOpacity>
        ),
    });
}, [navigation, cartCount]);


useEffect(()=>{

  GetProducts()
  .then(response => {
    setProductData(response)
    console.log(response)
  })
  .catch(error => {
    console.log(error);
  });

 },[]);

 const renderItem = ({ item }) => (
  <View style={styles.card}>
    <Image source={{ uri: item.image }} style={styles.image} />
    <Text style={styles.title} numberOfLines={2}>
      {item.title}
    </Text>
    <Text style={styles.price}>${item.price}</Text>
    <Text style={styles.rating}>⭐ {item.rating.rate} ({item.rating.count} reviews)</Text>

    <View style={styles.cartControls}>
        <TouchableOpacity style={styles.button}
         onPress={() => dispatch(removeItem(item.id))}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <View>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                     {productCount > 0 ? `(${productCount})` : ""}
          </Text>
        </View>
        <TouchableOpacity style={styles.button}
         onPress={() => dispatch(addItem(item.id))}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>    
  </View>
);

  return (
    
    <View style={styles.container}>


<FlatList
        data={productData}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />

      
       
    </View>
  )
}

export default Home;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  row: {
    justifyContent: 'space-between', 
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 7,
    padding: 10,
    marginBottom: 10,
    width: '48%',
    alignItems: 'center',
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginTop: 5,
  },
  price: {
    fontSize: 16,
    color: '#28a745',
    fontWeight: 'bold',
    marginTop: 5,
  },
  rating: {
    fontSize: 12,
    color: '#ffa41b',
    marginTop: 5,
  },

  cartControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  button: {
    backgroundColor: 'green',
    //padding: 8,
    borderRadius: 15,
    marginHorizontal: 10,
    width:40
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 25,
    fontWeight: '900',
    padding:2,
    marginLeft:12
  },
  quantity: {
    fontSize: 15,
    fontWeight: 'bold',
  },
 
})
