import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import CustomHeader from '../componentes/customHeader';

const videos = [
  { id: '1', title: 'Por que no debes ir a la cachana #1', views: '2.4K', date: 'Hace 3 días' },
  { id: '2', title: 'Por que no debes ir a la cachana #2', views: '2.4K', date: 'Hace 3 días' },
  { id: '3', title: 'Por que no debes ir a la cachana #3', views: '2.4K', date: 'Hace 3 días' },
  { id: '4', title: 'Por que no debes ir a la cachana #4', views: '2.4K', date: 'Hace 3 días' },
  { id: '5', title: 'Por que no debes ir a la cachana #5', views: '2.4K', date: 'Hace 3 días' },
];

export default function ProfileScreen() {
  const renderItem = ({ item }) => (
    <View style={styles.videoItem}>
      <View style={styles.thumbnail} />
      <View style={styles.videoInfo}>
        <Text style={styles.videoTitle}>{item.title}</Text>
        <Text style={styles.videoMeta}>{item.views} vistas · {item.date}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <CustomHeader title="Perfil" />
      <View style={styles.profileCard}>
        <Image
          source={{ uri: 'https://st.depositphotos.com/1032561/1294/i/450/depositphotos_12940042-stock-photo-casual-man-from-profile-isolated.jpg' }} // Reemplaza con imagen real
          style={styles.avatar}
        />
        <Text style={styles.name}>Ekker777</Text>
        <Text style={styles.email}>ejemplo@gmail.com</Text>
        <Text style={styles.phone}>+52 612 220 3165</Text>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Editar perfil</Text>
        </TouchableOpacity>
        <View style={styles.statsRow}>
          <Text style={styles.stat}><Text style={styles.statNumber}>74</Text> Videos</Text>
          <Text style={styles.stat}><Text style={styles.statNumber}>134</Text> Suscripciones</Text>
          <Text style={styles.stat}><Text style={styles.statNumber}>89</Text> Suscritos</Text>
        </View>
      </View>
      <Text style={styles.videosHeader}>Videos</Text>
      <FlatList
        data={videos}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  profileCard: {
    backgroundColor: '#1E1E1E',
    margin: 16,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  name: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  email: {
    color: '#ccc',
  },
  phone: {
    color: '#ccc',
    marginBottom: 8,
  },
  editButton: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 12,
  },
  editButtonText: {
    fontWeight: 'bold',
    color: '#000',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  stat: {
    color: '#ccc',
    fontSize: 14,
  },
  statNumber: {
    color: '#FFD700',
    fontWeight: 'bold',
    fontSize: 16,
  },
  videosHeader: {
    color: '#FFD700',
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginBottom: 10,
  },
  videoItem: {
    flexDirection: 'row',
    marginBottom: 12,
    backgroundColor: '#1A1A1A',
    padding: 10,
    borderRadius: 8,
  },
  thumbnail: {
    width: 80,
    height: 60,
    backgroundColor: '#333',
    borderRadius: 4,
    marginRight: 10,
  },
  videoInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  videoTitle: {
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  videoMeta: {
    color: '#aaa',
    fontSize: 12,
  },
});
