import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import CustomHeader from "../componentes/customHeader";
import { getProfile } from "../navegacion/api";
import axios from "axios";

export default function ProfileScreen() {
  const [profile, setProfile] = useState(null);
  const [userVideos, setUserVideos] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile(); // GET /account
        setProfile(response.data);

        // Luego que cargamos el perfil, cargamos videos del usuario
        if (response.data?.uuid) {
          fetchUserVideos(response.data.uuid);
        }
      } catch (error) {
        console.error("Error al cargar perfil:", error);
      }
    };

    const fetchUserVideos = async (userId) => {
      try {
        // Asumo que tienes un endpoint que retorna videos por userId
        const res = await axios.get(
          `http://192.168.1.80:30000/video/get-by-user/${userId}`
        );

        // Formateamos videos, adapta según la respuesta real
        const videosData = res.data?.data?.data || [];
        const formattedVideos = videosData.map((item) => ({
          id: item.id.toString(),
          title: item.title,
          views: item.views || "0",
          date: new Date(item.createdAt).toLocaleDateString() || "---",
        }));

        setUserVideos(formattedVideos);
      } catch (error) {
        console.error("Error al cargar videos del usuario:", error);
      }
    };

    fetchProfile();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.videoItem}>
      <View style={styles.thumbnail} />
      <View style={styles.videoInfo}>
        <Text style={styles.videoTitle}>{item.title}</Text>
        <Text style={styles.videoMeta}>
          {item.views} vistas · {item.date}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <CustomHeader title="Perfil" />
      <View style={styles.profileCard}>
        <Image
          source={{ uri: "https://via.placeholder.com/80" }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{profile?.email || "Cargando..."}</Text>
        <Text style={styles.email}>UUID: {profile?.uuid || "---"}</Text>
        <Text style={styles.phone}>
          Miembro desde:{" "}
          {profile?.createdAt
            ? new Date(profile.createdAt).toLocaleDateString()
            : "---"}
        </Text>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Editar perfil</Text>
        </TouchableOpacity>
        <View style={styles.statsRow}>
          <Text style={styles.stat}>
            <Text style={styles.statNumber}>{userVideos.length}</Text> Videos
          </Text>
          <Text style={styles.stat}>
            <Text style={styles.statNumber}>134</Text> Suscripciones
          </Text>
          <Text style={styles.stat}>
            <Text style={styles.statNumber}>89</Text> Suscritos
          </Text>
        </View>
      </View>

      <Text style={styles.videosHeader}>Videos Subidos</Text>
      <FlatList
        data={userVideos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
        ListEmptyComponent={
          <Text style={{ color: "#888", textAlign: "center", marginTop: 20 }}>
            No has subido videos todavía.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  profileCard: {
    backgroundColor: "#1E1E1E",
    margin: 16,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  name: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  email: {
    color: "#ccc",
  },
  phone: {
    color: "#ccc",
    marginBottom: 8,
  },
  editButton: {
    backgroundColor: "#FFD700",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 12,
  },
  editButtonText: {
    fontWeight: "bold",
    color: "#000",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  stat: {
    color: "#ccc",
    fontSize: 14,
  },
  statNumber: {
    color: "#FFD700",
    fontWeight: "bold",
    fontSize: 16,
  },
  videosHeader: {
    color: "#FFD700",
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 16,
    marginBottom: 10,
  },
  videoItem: {
    flexDirection: "row",
    marginBottom: 12,
    backgroundColor: "#1A1A1A",
    padding: 10,
    borderRadius: 8,
  },
  thumbnail: {
    width: 80,
    height: 60,
    backgroundColor: "#333",
    borderRadius: 4,
    marginRight: 10,
  },
  videoInfo: {
    flex: 1,
    justifyContent: "center",
  },
  videoTitle: {
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 4,
  },
  videoMeta: {
    color: "#aaa",
    fontSize: 12,
  },
});
