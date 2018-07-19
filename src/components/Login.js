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
      FlatList

} from 'react-native'
import { StackNavigator } from 'react-navigation'

export default class Login extends React.Component{
      constructor(props){
            super(props)
         
            this.state = {
                  username: '',
                  password: ''
            }
            this._sendLogin = this._sendLogin.bind(this)
            this._storeData = this._storeData.bind(this)
       
      }
       async componentWillMount(){
         AsyncStorage.setItem('name', 'I like to save it.', () => {
               console.log("set item success")
               AsyncStorage.getItem("name", (error, result) => {
                     console.log("get result " + result)
                     console.log("get result " + error)
               })
         });
       }      

      componentDidMount(){
            this._loadInitialState().done()
      }

      _storeData =  async (data) => {
            try {                
                  await AsyncStorage.setItem('@userSV',JSON.stringify(data))
            } catch (error) {
                console.log(error)
            }
      }

      async _loadInitialState(){
            let value = await AsyncStorage.getItem('@userSV')
        
            if(value !== null){

                  this.props.navigation.navigate('Produtos')
            }
      }

       _sendLogin(){
           console.log('foi')
            fetch('http://10.0.2.2:8000/api/login', {
                  method:'POST',
                  headers:{
                        'accept': 'application/json',
                        'Content-Type': 'application/json'
                  },
                  body:JSON.stringify({
                     email:'professormarcos2@gamil.com',
                     password:'123mudar'   
                  })
            })
            .then( response => response.json())
            .then(  res => {
               if(res.success === true){             
                        this._storeData(res.data)           
                
               } else {
                     Alert.alert('Dados incorretos')
               }
            }).catch( error => console.log(error))
      }



      render(){
            return(
                  <KeyboardAvoidingView behavior='padding' style={styles.wrapper}>
                        <View style={styles.container}>
                              <View style={styles.header}>
                                    <Image style={{ width:190, height:190 }} source={require('../imgs/logo.jpeg')}/>
                              </View>
                              <TextInput placeholder="Login" placeholder="E-MAIL"
                                    underlineColorAndroid='transparent'
                                    style={styles.TextInput}                                    
                                    keyboardType='email-address'
                                    onChangeText= { (username)=> this.setState({username}) }
                              />

                               <TextInput placeholder="Senha" placeholder="SENHA"
                                    underlineColorAndroid='transparent'
                                    style={styles.TextInput}
                                    secureTextEntry={true}
                                 
                                    onChangeText = { (password) => { this.setState({password}) } }
                              />

                              <TouchableOpacity style={styles.button}
                                    onPress={()=> this._sendLogin()}
                              >
                                    <Text style={styles.textButton}>ACESSAR</Text>
                              </TouchableOpacity>


                        </View>
                  </KeyboardAvoidingView>
            );
      }
}

const styles = StyleSheet.create({
      wrapper:{
            flex: 1,
      },
      container:{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#FFF',
            paddingLeft: 40,
            paddingRight: 40,
      },
      header:{
            marginBottom: 20,
      },
      TextInput:{
            alignSelf: 'stretch',
            padding: 16,
            marginBottom: 20,
            backgroundColor: '#333',
            color:'#FFF',
            borderRadius: 5,
      },
      button:{
            backgroundColor: 'red',
            alignSelf: 'stretch',
            alignItems: 'center',
            padding: 20,
            borderRadius: 5,
           
      },
      textButton:{
            color:'#FFF',
            fontWeight: 'bold',
      }
})