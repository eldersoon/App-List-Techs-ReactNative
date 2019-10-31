import React, { Component } from 'react';
import { 
    View, 
    Text, 
    FlatList,
    TouchableOpacity,
    StyleSheet    
} from 'react-native';
import api from '../services/api';

export default class Main extends Component {
    static navigationOptions = {
        title: 'Techs',
    };

    state = {
        productInfo: [],
        docs: [],
        page: 1
    }

    //this method load when page is loaded
    componentDidMount(){
        this.loadProducts();//'this' only work if has as arrow function
    }

    loadProducts = async (page = 1) => {
        const response = await api.get(`/products?${page}`);

        const { docs, ...productInfo } = response.data;

        this.setState({ 
            docs:[...this.state.docs, ...docs], 
            productInfo, 
            page 
        });
    }

    loadMore = () => {
        const { page, productInfo} = this.state;

        if(page === productInfo.pages) return;

        const pageNumber = page + 1;

        this.loadProducts(pageNumber);
    }

    renderItem = ({ item }) => (
        <View style={styles.prodContainer}>
            <Text style={styles.prodTitle}>{item.title}</Text>
            <Text style={styles.proDescription}>{item.description}</Text>

            <TouchableOpacity 
                onPress={()=>{
                    this.props.navigation.navigate('Product', { product: item })
                }} 
                style={styles.prodButton}
            >
                <Text style={styles.prodButtonText}>Learn about</Text>
            </TouchableOpacity>
        </View>
    )

    render(){
        return(
            <View style={styles.container}>
                <FlatList
                    contentContainerStyle={styles.list}
                    data={this.state.docs}
                    keyExtractor={item => item._id}
                    renderItem={this.renderItem}
                    onEndReached={this.loadMore}
                    onEndReachedThreshold={0.1}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    
    container:{
        backgroundColor: '#836FFF',
    },  

    prodContainer: {
        flex: 1,
        backgroundColor: '#1C1C1C',
        marginTop: 5,
        padding: 10,
        borderRadius: 5,
    },

    list: {
        padding: 20,
    },
    
    prodTitle: {
        color:'#fff',
        fontSize: 18,
        fontWeight: 'bold'
    },

    proDescription: {
        color:'#C0C0C0',
        fontSize: 14,
        lineHeight: 20
    },

    prodButton: {
        backgroundColor: '#836FFF',
        height: 42,
        marginTop: 5,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',   
    },

    prodButtonText: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
    }
});