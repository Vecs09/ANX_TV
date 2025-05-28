import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Video } from 'expo-video'; // ✅ nuevo paquete
import CustomHeader from '../componentes/customHeader'; 

export default function UploadScreen() {
  const [video, setVideo] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [privacy, setPrivacy] = useState('public');

 const pickVideo = async () => {
  console.log('Intentando abrir galería...');
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Permiso denegado', 'Necesitas permitir acceso a la galería.');
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: [ImagePicker.MediaType.Video],
    allowsEditing: false,
    quality: 1,
  });

  console.log('Resultado:', result);

  if (!result.canceled && result.assets.length > 0) {
    setVideo(result.assets[0].uri);
  }
};

  const uploadVideo = () => {
    if (!video || !title) {
      Alert.alert('Faltan datos', 'Debes seleccionar un video y poner un título');
      return;
    }

    Alert.alert('Subido', 'Tu video ha sido subido exitosamente');
    setVideo(null);
    setTitle('');
    setDescription('');
    setPrivacy('public');
  };

  return (
    <View style={styles.container}>
      <CustomHeader title="Subir Video" />
      <KeyboardAvoidingView
        style={styles.contentContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.content}>
          <TouchableOpacity style={styles.videoPicker} onPress={pickVideo}>
            {video ? (
              <Video
                source={{ uri: video }}
                style={styles.videoPreview}
                resizeMode="cover"
                isMuted
                shouldPlay={false}
                useNativeControls
              />
            ) : (
              <Text style={styles.videoPickerText}>Toca para seleccionar un video</Text>
            )}
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="Título del video"
            placeholderTextColor="#777"
            value={title}
            onChangeText={setTitle}
          />

          <TextInput
            style={[styles.input, { height: 80 }]}
            placeholder="Descripción (opcional)"
            placeholderTextColor="#777"
            multiline
            value={description}
            onChangeText={setDescription}
          />

          <View style={styles.privacyContainer}>
            <Text style={styles.privacyLabel}>Privacidad:</Text>
            <TouchableOpacity onPress={() => setPrivacy('public')}>
              <Text style={privacy === 'public' ? styles.privacySelected : styles.privacyOption}>
                Público
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setPrivacy('private')}>
              <Text style={privacy === 'private' ? styles.privacySelected : styles.privacyOption}>
                Privado
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.uploadButton} onPress={uploadVideo}>
            <Text style={styles.uploadButtonText}>Subir video</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  contentContainer: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  videoPicker: {
    height: 150,
    width: '100%',
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333',
    overflow: 'hidden',
  },
  videoPickerText: {
    color: '#ccc',
    textAlign: 'center',
  },
  videoPreview: {
    width: '100%',
    height: '100%',
  },
  input: {
    width: '100%',
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333',
    color: '#fff',
  },
  privacyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  privacyLabel: {
    marginRight: 10,
    fontWeight: 'bold',
    color: '#fff',
  },
  privacyOption: {
    marginHorizontal: 8,
    color: '#aaa',
  },
  privacySelected: {
    marginHorizontal: 8,
    fontWeight: 'bold',
    color: '#FFD600',
  },
  uploadButton: {
    backgroundColor: '#FFD600',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
