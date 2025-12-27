import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, ActivityIndicator, Platform } from 'react-native';
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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>AI Food Tracker</Text>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => pickImage(true)}>
          <Text style={styles.buttonText}>📸 Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={() => pickImage(false)}>
          <Text style={styles.buttonText}>🖼️ Upload Gallery</Text>
        </TouchableOpacity>
      </View>

      {image && <Image source={{ uri: image }} style={styles.preview} />}

      {loading && <ActivityIndicator size="large" color="#4CAF50" style={{ marginTop: 20 }} />}

      {result && (
        <View style={styles.resultCard}>
          <Text style={styles.summary}>{result?.brief_summary}</Text>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Calories:</Text>
            <Text style={styles.statValue}>{result?.total_calories} kcal</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Health Rating:</Text>
            <Text style={styles.statValue}>{result?.health_rating_1_to_10}/10</Text>
          </View>
          
          <Text style={styles.sectionTitle}>Breakdown:</Text>
          {result?.items?.map((item, index) => (
            <View key={index} style={styles.itemBox}>
              <Text style={styles.itemName}>{item.name} ({item.quantity_estimate})</Text>
              <Text style={styles.itemNutrients}>
                Proteins: {item.nutrients.protein_g}g | Carbs: {item.nutrients.carbs_g}g | Fats: {item.nutrients.fat_g}g
              </Text>
            </View>
          ))}
          
          <Text style={styles.verifyText}>Verification: {result["Is this really the right meal?"]}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center', backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, marginTop: 40 },
  buttonContainer: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  button: { backgroundColor: '#4CAF50', padding: 15, borderRadius: 10, flex: 1, alignItems: 'center' },
  secondaryButton: { backgroundColor: '#2196F3' },
  buttonText: { color: 'white', fontWeight: 'bold' },
  preview: { width: '100%', height: 250, borderRadius: 15, marginBottom: 20 },
  resultCard: { backgroundColor: 'white', padding: 20, borderRadius: 15, width: '100%', elevation: 3 },
  summary: { fontSize: 16, fontStyle: 'italic', marginBottom: 15, textAlign: 'center' },
  statRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  statLabel: { fontWeight: '600' },
  statValue: { color: '#4CAF50', fontWeight: 'bold' },
  sectionTitle: { marginTop: 15, fontWeight: 'bold', borderBottomWidth: 1, borderBottomColor: '#eee' },
  itemBox: { marginVertical: 8 },
  itemName: { fontWeight: '500' },
  itemNutrients: { fontSize: 12, color: '#666' },
  verifyText: { marginTop: 15, fontSize: 12, color: '#e91e63', textAlign: 'center' }
});