import { createStackNavigator } from 'react-navigation';

import Main from './pages/main';
import Product from './pages/product';

export default createStackNavigator({
    Main,
    Product
}, {
    navigationOptions: {
        headerStyle: {
            backgroundColor: '#483D8B'
        },

        headerTintColor: '#FFF'
    }
});