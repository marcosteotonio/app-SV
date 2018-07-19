import React from 'react'
import {
      StyleSheet,
      Text,
      View,
      TextInput,
      KeyboardAvoidingView,
      TouchableOpacity,
      AsyncStorage,
      Image,
      Alert,
      ScrollView,
      Dimensions,
      FlatList

} from 'react-native'
import {
      StackNavigator
} from 'react-navigation'

export default class Produtos extends React.Component {
      constructor(props) {
            super(props)
            this.state = {
                  lista: [],
                  produtos: ''
            }
          this.renderItem = this.renderItem.bind(this)
           
      }
      componentWillMount() {        

            fetch('http://10.0.2.2:8000/api/planos',{
                  method: 'GET',
                  headers: {
                        'accept': 'application/json',
                        'Content-Type': 'application/json'
                  }

            }).then(response => response.json())
            .then(resp => {
               
                  this.setState({
                        lista: resp.data
                  })
            }).then( resp => {
                  this._listaProdutos()
            })


      }

      renderItem = ({item, index}) => {
            return(<TouchableOpacity key={index} style={styles.produtos}>
                                    <Text key={item.nomeplano}>{item.nomeplano}</Text>
                            </TouchableOpacity>)
      }
     

      render() {
            return (
                  <View style={styles.container}>
                  <FlatList
                      data={this.state.lista}  
                      render={this.renderItem}
                        numColumns={2}
                  />
                 
                  </View>
            )
      }
}
const {width, height} = Dimensions.get('window')
const styles = StyleSheet.create({
      container : {
            flex:1,
    
      },
      produtos:{
            padding: 10,
            borderWidth: 1,
            marginBottom: 10,
            width: 150,
            height:150
      }
})