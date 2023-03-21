import { useState, useEffect } from 'react';
import { Text, View, Button, Alert } from 'react-native';
import * as localAuthentication from 'expo-local-authentication';

import { styles } from './styles';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function verifyAvaiableAuthentication(){
    const compatible = await localAuthentication.hasHardwareAsync();
    console.log(compatible);

    const types = await localAuthentication.supportedAuthenticationTypesAsync();
    console.log(types.map(type => localAuthentication.AuthenticationType[type]));
  }

  async function handleAuthentication(){
    const isBiometricEnrolled = await localAuthentication.isEnrolledAsync();

    if(!isBiometricEnrolled){
      return Alert.alert('Login', 'Nenhuma biometria encontrada. Por favor, cadastre no dispositivo!');
    }

    const auth = await localAuthentication.authenticateAsync({
      promptMessage: 'Login com Biometria',
      fallbackLabel: 'Biometria não reconhecida'
    });

    setIsAuthenticated(auth.success);
  }

  useEffect(() => {
    verifyAvaiableAuthentication();
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Usuário conectado: { isAuthenticated ? 'Sim' : 'Não'}
      </Text>

      <Button
      title="Entrar"
      onPress={handleAuthentication} 
      />

    </View>
  );
}
