import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
  Image,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import CustomHeader from '../componentes/customHeader';
import { useNavigation } from '@react-navigation/native';

const videos = [
  {
    id: '1',
    title: 'First Shop Blueprint???',
    author: 'Nedel Ayon',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnailUrl: 'https://i.ytimg.com/vi/goF_ssLM2EA/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLC1Vg25ITU1uoMIuVw8jZ9LArxChQ',
  },
  {
    id: '2',
    title: 'Yahir emmanuel romo palomino, te estamos buscando',
    author: 'ANX Entertainment',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnailUrl: 'https://i.ytimg.com/vi/FAKTGAlmS0c/hqdefault.jpg?sqp=-oaymwExCOADEI4CSFryq4qpAyMIARUAAIhCGAHwAQH4Ac4FgALQBYoCDAgAEAEYZSBMKD8wDw==&rs=AOn4CLB5Ga-C1HmLZlhFBUwvm1ubCxMOFg',
  },
  {
    id: '3',
    title: 'Can You Play Balatro with 1000 Jokers?',
    author: 'Pelirrojo gei',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnailUrl: 'https://i.ytimg.com/vi/RCPy9qEZnfs/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLB0j3QuGLoFogOZo2MHWJG8YZHkTA',
  },
];

export default function VideosScreen() {
  const [showFilters, setShowFilters] = useState(false);
  const [canal, setCanal] = useState('');
  const [fecha, setFecha] = useState('Hoy');
  const [duracion, setDuracion] = useState('Corta');
  const navigation = useNavigation();

  const toggleFilters = () => setShowFilters(!showFilters);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('VideoPlayer', { video: item })}
      style={styles.videoCard}
    >
      <Image source={{ uri: item.thumbnailUrl }} style={styles.videoThumbnail} />
      <View style={styles.videoInfo}>
        <Text style={styles.videoTitle}>{item.title}</Text>
        <Text style={styles.videoAuthor}>{item.author}</Text>
      </View>
    </TouchableOpacity>
  );

  const CheckBox = ({ label, checked, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.checkboxContainer}>
      <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
        {checked && <Text style={styles.checkboxCheckmark}>✓</Text>}
      </View>
      <Text style={styles.checkboxLabel}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <CustomHeader title="Videos" />

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar videos..."
          placeholderTextColor="#888"
        />
        <TouchableOpacity onPress={toggleFilters}>
          <Entypo name="dots-three-vertical" size={20} color="#FFD700" />
        </TouchableOpacity>
      </View>

      <Modal transparent visible={showFilters} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.filterModal}>
            <Text style={styles.filterTitle}>Filtros</Text>

            <Text style={styles.sectionTitle}>Fecha</Text>
            <CheckBox label="Hoy" checked={fecha === 'Hoy'} onPress={() => setFecha('Hoy')} />
            <CheckBox label="Última semana" checked={fecha === 'Última semana'} onPress={() => setFecha('Última semana')} />
            <CheckBox label="Hace un mes" checked={fecha === 'Hace un mes'} onPress={() => setFecha('Hace un mes')} />

            <Text style={styles.sectionTitle}>Duración</Text>
            <CheckBox label="Corta" checked={duracion === 'Corta'} onPress={() => setDuracion('Corta')} />
            <CheckBox label="Larga" checked={duracion === 'Larga'} onPress={() => setDuracion('Larga')} />

            <Text style={styles.sectionTitle}>Canal</Text>
            <TextInput
              style={styles.input}
              value={canal}
              onChangeText={setCanal}
              placeholder="Nombre del canal..."
              placeholderTextColor="#888"
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={toggleFilters}>
                <Text style={styles.cancelText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.acceptButton]} onPress={toggleFilters}>
                <Text style={styles.acceptText}>Aceptar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <FlatList
        data={videos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111' },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#2A2A2A',
    color: '#fff',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginRight: 10,
  },
  videoCard: {
    backgroundColor: '#1E1E1E',
    marginHorizontal: 25,
    marginVertical: 10,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  videoThumbnail: {
    height: 150,
    width: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  videoInfo: { padding: 10 },
  videoTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  videoAuthor: { color: '#aaa', marginTop: 2 },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterModal: {
    width: '85%',
    backgroundColor: '#222',
    borderRadius: 15,
    padding: 20,
  },
  filterTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  sectionTitle: {
    color: '#FFD700',
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#FFD700',
    borderRadius: 3,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#FFD700',
  },
  checkboxCheckmark: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
  },
  checkboxLabel: {
    color: '#fff',
    fontSize: 14,
  },
  input: {
    backgroundColor: '#333',
    borderRadius: 5,
    padding: 8,
    color: '#fff',
    marginTop: 5,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  cancelButton: {
    backgroundColor: '#444',
  },
  acceptButton: {
    backgroundColor: '#FFD700',
  },
  cancelText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  acceptText: {
    color: '#000',
    fontWeight: 'bold',
  },
});
