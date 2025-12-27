import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface UserProfileProps {
  height: string;
  weight: string;
  age: string;
  gender: string;
  onUpdate: (data: { height: string; weight: string; age: string; gender: string }) => void;
}

export default function UserProfile({ height, weight, age, gender, onUpdate }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [localHeight, setLocalHeight] = useState(height);
  const [localWeight, setLocalWeight] = useState(weight);
  const [localAge, setLocalAge] = useState(age);
  const [localGender, setLocalGender] = useState(gender);
  const [showGenderModal, setShowGenderModal] = useState(false);

  const genders = ['Male', 'Female', 'Other', 'Prefer not to say'];

  const handleSave = () => {
    onUpdate({
      height: localHeight,
      weight: localWeight,
      age: localAge,
      gender: localGender,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setLocalHeight(height);
    setLocalWeight(weight);
    setLocalAge(age);
    setLocalGender(gender);
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile Information</Text>
        {!isEditing ? (
          <TouchableOpacity onPress={() => setIsEditing(true)} style={styles.editButton}>
            <Ionicons name="pencil" size={20} color="#2E7D8F" />
          </TouchableOpacity>
        ) : (
          <View style={styles.actionButtons}>
            <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
              <Ionicons name="close" size={20} color="#E63946" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
              <Ionicons name="checkmark" size={20} color="#2E7D8F" />
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.profileGrid}>
        <View style={styles.profileItem}>
          <View style={styles.iconContainer}>
            <Ionicons name="resize" size={24} color="#2E7D8F" />
          </View>
          <Text style={styles.label}>Height</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={localHeight}
              onChangeText={setLocalHeight}
              placeholder="e.g., 175 cm"
              keyboardType="numeric"
              placeholderTextColor="#999"
            />
          ) : (
            <Text style={styles.value}>{height || 'Not set'}</Text>
          )}
        </View>

        <View style={styles.profileItem}>
          <View style={styles.iconContainer}>
            <Ionicons name="scale" size={24} color="#2E7D8F" />
          </View>
          <Text style={styles.label}>Weight</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={localWeight}
              onChangeText={setLocalWeight}
              placeholder="e.g., 70 kg"
              keyboardType="numeric"
              placeholderTextColor="#999"
            />
          ) : (
            <Text style={styles.value}>{weight || 'Not set'}</Text>
          )}
        </View>

        <View style={styles.profileItem}>
          <View style={styles.iconContainer}>
            <Ionicons name="calendar" size={24} color="#2E7D8F" />
          </View>
          <Text style={styles.label}>Age</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={localAge}
              onChangeText={setLocalAge}
              placeholder="e.g., 25"
              keyboardType="numeric"
              placeholderTextColor="#999"
            />
          ) : (
            <Text style={styles.value}>{age || 'Not set'}</Text>
          )}
        </View>

        <View style={styles.profileItem}>
          <View style={styles.iconContainer}>
            <Ionicons name="person" size={24} color="#2E7D8F" />
          </View>
          <Text style={styles.label}>Gender</Text>
          {isEditing ? (
            <TouchableOpacity
              style={styles.genderButton}
              onPress={() => setShowGenderModal(true)}
            >
              <Text style={styles.genderText}>{localGender || 'Select Gender'}</Text>
              <Ionicons name="chevron-down" size={20} color="#2E7D8F" />
            </TouchableOpacity>
          ) : (
            <Text style={styles.value}>{gender || 'Not set'}</Text>
          )}
        </View>
      </View>

      <Modal
        visible={showGenderModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowGenderModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Gender</Text>
            {genders.map((g) => (
              <TouchableOpacity
                key={g}
                style={[
                  styles.genderOption,
                  localGender === g && styles.genderOptionSelected,
                ]}
                onPress={() => {
                  setLocalGender(g);
                  setShowGenderModal(false);
                }}
              >
                <Text
                  style={[
                    styles.genderOptionText,
                    localGender === g && styles.genderOptionTextSelected,
                  ]}
                >
                  {g}
                </Text>
                {localGender === g && (
                  <Ionicons name="checkmark" size={20} color="#2E7D8F" />
                )}
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowGenderModal(false)}
            >
              <Text style={styles.modalCloseText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A3A4A',
  },
  editButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#E8F4F8',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  cancelButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#FFE8E8',
  },
  saveButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#E8F4F8',
  },
  profileGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  profileItem: {
    width: '48%',
    marginBottom: 20,
    alignItems: 'center',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E8F4F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontWeight: '500',
  },
  value: {
    fontSize: 18,
    color: '#1A3A4A',
    fontWeight: '600',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#2E7D8F',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    color: '#1A3A4A',
    textAlign: 'center',
    backgroundColor: '#F8F9FA',
  },
  genderButton: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2E7D8F',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#F8F9FA',
  },
  genderText: {
    fontSize: 16,
    color: '#1A3A4A',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    paddingBottom: 40,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A3A4A',
    marginBottom: 20,
    textAlign: 'center',
  },
  genderOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#F8F9FA',
  },
  genderOptionSelected: {
    backgroundColor: '#E8F4F8',
    borderWidth: 2,
    borderColor: '#2E7D8F',
  },
  genderOptionText: {
    fontSize: 16,
    color: '#1A3A4A',
  },
  genderOptionTextSelected: {
    fontWeight: '600',
    color: '#2E7D8F',
  },
  modalCloseButton: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
  },
  modalCloseText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
});

