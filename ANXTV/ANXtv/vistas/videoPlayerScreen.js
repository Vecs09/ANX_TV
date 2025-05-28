import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Video } from 'expo-av';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const suggestedVideos = [
  { id: '1', title: 'Por que no debes ir a cachana #1', author: 'canelo', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
  { id: '2', title: 'Por que no debes ir a cachana #2', author: 'canelo', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
  { id: '3', title: 'Por que no debes ir a cachana #3', author: 'canelo', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
];

export default function VideoPlayerScreen({ route }) {
  const { video } = route.params;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Video
        source={{ uri: video.videoUrl }}
        useNativeControls
        resizeMode="contain"
        style={styles.video}
      />

      <ScrollView style={styles.detailsContainer}>
        <Text style={styles.title}>{video.title}</Text>
        <Text style={styles.stats}>305,769 vistas · Hace 2 días · Público</Text>

        <View style={styles.actionsRow}>
          <Action icon="thumbs-up" label="76K" />
          <Action icon="thumbs-down" label="0.1K" />
          <Action icon="plus" label="Guardar" />
        </View>

        <View style={styles.channelCard}>
          <Image
            source={{ uri: 'https://img.asmedia.epimg.net/resizer/v2/LNDQCEBF45BTXD4T3FEFLH5R44.png?auth=d35e34c78b3a6a0c0587a65db655fdca43cffe8fbc6d4e139c291a533b32b056&width=1472&height=1104&smart=true' }}
            style={styles.channelImage}
          />
          <View style={styles.channelDetails}>
            <Text style={styles.channelName}>{video.author}</Text>
            <Text style={styles.subscribers}>12M suscriptores</Text>
          </View>
          <TouchableOpacity style={styles.subscribeButton}>
            <Text style={styles.subscribeText}>Suscribirse</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.suggestedTitle}>Videos</Text>
        {suggestedVideos.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.suggestedVideo}
            onPress={() => navigation.replace('VideoPlayer', { video: item })}
          >
            <Image
              source={{ uri: 'https://placekitten.com/300/180' }}
              style={styles.suggestedThumbnail}
            />
            <View style={styles.suggestedInfo}>
              <Text style={styles.suggestedTitleText}>{item.title}</Text>
              <Text style={styles.suggestedMeta}>2.4K vistas · hace 3 días</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const Action = ({ icon, label }) => (
  <TouchableOpacity style={styles.action}>
    <Feather name={icon} size={20} color="#fff" />
    <Text style={styles.actionLabel}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  video: { width: '100%', height: 250 },
  detailsContainer: { padding: 12 },
  title: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  stats: { color: '#aaa', marginVertical: 4 },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  action: { alignItems: 'center' },
  actionLabel: { color: '#fff', fontSize: 12, marginTop: 4 },

  channelCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    padding: 12,
    borderRadius: 10,
    marginVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  channelImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  channelDetails: {
    flex: 1,
    marginLeft: 12,
  },
  channelName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  subscribers: {
    color: '#ccc',
    fontSize: 13,
    marginTop: 2,
  },
  subscribeButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 3,
  },
  subscribeText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
  },

  // Videos sugeridos
  suggestedTitle: {
    fontSize: 20,
    color: '#FFD700',
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  suggestedVideo: {
    flexDirection: 'row',
    marginBottom: 12,
    backgroundColor: '#1a1a1a',
    padding: 8,
    borderRadius: 10,
  },
  suggestedThumbnail: {
    width: 120,
    height: 70,
    borderRadius: 8,
    backgroundColor: '#444',
  },
  suggestedInfo: {
    marginLeft: 10,
    justifyContent: 'center',
    flex: 1,
  },
  suggestedTitleText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  suggestedMeta: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 2,
  },
});
