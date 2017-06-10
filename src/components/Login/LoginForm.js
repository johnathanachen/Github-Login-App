/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import FBSDK, { LoginManager, AccessToken } from 'react-native-fbsdk'
import firebase from 'firebase'

var config = {
  apiKey: 'AIzaSyDgFCtxFj3fiBqZpZZb1v6u6794CqqoXqo',
  authDomain: 'fir-authentication-1856a.firebaseapp.com/',
  databaseURL: 'https://fir-authentication-1856a.firebaseio.com/'
}

const firebaseRef = firebase.initializeApp(config)

export default class LoginForm extends Component {

  _fbAuth() {
    LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(function(result) {
      if (result.isCancelled) {
        console.log('Login cancelled');
      } else {

        AccessToken.getCurrentAccessToken().then((accessTokenData) => {
          const credential = firebase.auth.FacebookAuthProvider.credential(accessTokenData.accessToken)
          firebase.auth().signInWithCredential(credential).then((result) => {
            // Promise was successful
          }, (error) => {
            // Promise was rejected
            console.log(error)
          })
        }, (error => {
          console.log('Some error occured ' + error);
        }))
      }
    },
    function(error) {
      alert('Login fail with error ' + error);
    }
  );
}

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
        />
        <TextInput
          placeholder="username or email"
          placeholderTextColor="rgba(255,255,255,0.7)"
          returnKeyType="next"
          onSubmitEditing={() => this.passwordInput.focus()}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
        />
        <TextInput
          placeholder="password"
          placeholderTextColor="rgba(255,255,255,0.7)"
          returnKeyType="go"
          secureTextEntry
          style={styles.input}
          ref={(input) => this.passwordInput = input}
        />

        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonFbContainer}
          onPress={this._fbAuth}>
          <Text style={styles.buttonFbText}>Log in with Facebook</Text>
        </TouchableOpacity>
        <Text style={styles.create}>Create an account</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  input: {
    height: 50,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 10,
    color: '#FFF',
    paddingHorizontal: 10,
    borderRadius: 3
  },
  buttonContainer: {
    backgroundColor: '#2980b9',
    paddingVertical: 15,
    marginBottom: 10,
    borderRadius: 3
  },
  buttonText: {
    textAlign: 'center',
    color:'#FFFFFF',
    fontWeight: '700'
  },
  buttonFbContainer: {
    backgroundColor: '#4267b2',
    paddingVertical: 15,
    borderRadius: 3,
    marginBottom: 20,
  },
  buttonFbText: {
    textAlign: 'center',
    color:'#FFFFFF',
  },
  create: {
    textAlign: 'center',
    color:'#bdc3c7',
    fontStyle: 'italic',
  }
});
