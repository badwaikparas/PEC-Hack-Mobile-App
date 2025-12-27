import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, ActivityIndicator, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function FoodAnalyzer() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  

  const pickImage = async (useCamera = false) => {
    // Request permissions
    const permissionResult = useCamera 
      ? await ImagePicker.requestCameraPermissionsAsync() 
      : await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera/gallery is required!");
      return;
    }

    const result = useCamera 
      ? await ImagePicker.launchCameraAsync({ base64: true, quality: 0.7 })
      : await ImagePicker.launchImageLibraryAsync({ base64: true, quality: 0.7 });

    if (!result.canceled) {
      const asset = result.assets[0];
      const base64 = result.assets[0].base64;
      setImage(asset.uri);
      analyzeImage(asset);
    }
  };

  const analyzeImage = async (image) => {
    setLoading(true);
    setResult(null);
  
    try {
      const formData = new FormData();
  
      formData.append('image', {
        uri: image.uri,          // ✅ KEEP file://
        name: 'food.jpg',
        type: image.mimeType || 'image/jpeg',
      });
  
      const response = await fetch(
        'https://pec-hacks-backend.onrender.com/process-image',
        {
          method: 'POST',
          body: formData,
          headers: {
            Accept: 'application/json',
          },
        }
      );
  
      if (!response.ok) {
        const text = await response.text();
        throw new Error(text);
      }
  
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Upload failed. Check network & backend.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.headerCard}>
        <View style={styles.iconWrapper}>
          <Ionicons name="restaurant" size={28} color="#2E7D8F" />
        </View>
        <Text style={styles.title}>AI Food Analyzer</Text>
        <Text style={styles.subtitle}>Capture your meal to get detailed nutrition insights</Text>
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => pickImage(true)}
          activeOpacity={0.8}
        >
          <Ionicons name="camera" size={24} color="#FFFFFF" />
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, styles.secondaryButton]} 
          onPress={() => pickImage(false)}
          activeOpacity={0.8}
        >
          <Ionicons name="images" size={24} color="#FFFFFF" />
          <Text style={styles.buttonText}>Upload Gallery</Text>
        </TouchableOpacity>
      </View>

      {image && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.preview} />
          <TouchableOpacity 
            style={styles.removeImageButton}
            onPress={() => {
              setImage(null);
              setResult(null);
            }}
          >
            <Ionicons name="close-circle" size={30} color="#E63946" />
          </TouchableOpacity>
        </View>
      )}

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2E7D8F" />
          <Text style={styles.loadingText}>Analyzing your meal...</Text>
        </View>
      )}

      {result && (
        <View style={styles.resultCard}>
          <View style={styles.resultHeader}>
            <Ionicons name="checkmark-circle" size={32} color="#2E7D8F" />
            <Text style={styles.resultTitle}>Analysis Complete</Text>
          </View>
          
          <View style={styles.summaryCard}>
            <Text style={styles.summary}>{result?.brief_summary}</Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Ionicons name="flame" size={24} color="#FF6B35" />
              <Text style={styles.statLabel}>Calories</Text>
              <Text style={styles.statValue}>{result?.total_calories} kcal</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="heart" size={24} color="#2E7D8F" />
              <Text style={styles.statLabel}>Health Rating</Text>
              <Text style={styles.statValue}>{result?.health_rating_1_to_10}/10</Text>
            </View>
          </View>
          
          <View style={styles.section}>
            <View style={styles.sectionTitle}>
              <Ionicons name="list" size={20} color="#2E7D8F" />
              <Text style={styles.sectionTitleText}>Breakdown</Text>
            </View>
            {result?.items?.map((item, index) => (
              <View key={index} style={styles.itemBox}>
                <View style={styles.itemHeader}>
                  <Ionicons name="nutrition" size={20} color="#2E7D8F" />
                  <Text style={styles.itemName}>{item.name}</Text>
                </View>
                <Text style={styles.itemQuantity}>{item.quantity_estimate}</Text>
                <View style={styles.nutrientsContainer}>
                  <View style={styles.nutrientBadge}>
                    <Text style={styles.nutrientLabel}>Protein</Text>
                    <Text style={styles.nutrientValue}>{item.nutrients.protein_g}g</Text>
                  </View>
                  <View style={styles.nutrientBadge}>
                    <Text style={styles.nutrientLabel}>Carbs</Text>
                    <Text style={styles.nutrientValue}>{item.nutrients.carbs_g}g</Text>
                  </View>
                  <View style={styles.nutrientBadge}>
                    <Text style={styles.nutrientLabel}>Fats</Text>
                    <Text style={styles.nutrientValue}>{item.nutrients.fat_g}g</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
          
          <View style={styles.verificationCard}>
            <Ionicons name="shield-checkmark" size={20} color="#2E7D8F" />
            <Text style={styles.verifyText}>{result["Is this really the right meal?"]}</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  iconWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E8F4F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A3A4A',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  button: {
    flex: 1,
    backgroundColor: '#2E7D8F',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#2E7D8F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  secondaryButton: {
    backgroundColor: '#1A5A6B',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  preview: {
    width: '100%',
    height: 280,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
  },
  removeImageButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginBottom: 20,
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  resultCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A3A4A',
  },
  summaryCard: {
    backgroundColor: '#E8F4F8',
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
  },
  summary: {
    fontSize: 16,
    color: '#1A3A4A',
    lineHeight: 24,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
    marginBottom: 4,
    fontWeight: '500',
  },
  statValue: {
    fontSize: 20,
    color: '#2E7D8F',
    fontWeight: '700',
  },
  section: {
    marginTop: 10,
  },
  sectionTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 15,
  },
  sectionTitleText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A3A4A',
  },
  itemBox: {
    backgroundColor: '#F8F9FA',
    padding: 15,
    borderRadius: 15,
    marginBottom: 12,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A3A4A',
    flex: 1,
  },
  itemQuantity: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
    marginLeft: 28,
  },
  nutrientsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  nutrientBadge: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  nutrientLabel: {
    fontSize: 11,
    color: '#666',
    marginBottom: 4,
    fontWeight: '500',
  },
  nutrientValue: {
    fontSize: 14,
    color: '#2E7D8F',
    fontWeight: '700',
  },
  verificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#E8F4F8',
    padding: 15,
    borderRadius: 15,
    marginTop: 15,
  },
  verifyText: {
    flex: 1,
    fontSize: 14,
    color: '#1A3A4A',
    fontWeight: '500',
  },
});