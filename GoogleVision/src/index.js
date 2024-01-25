import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import { API_KEY } from './config';
import { ScrollView } from 'react-native';


const DetectText = () => {
    const [imageUri, setImageUri] = useState(null);
    const [detectedText, setDetectedText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        console.log(detectedText);
    }, [detectedText]);

    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.canceled) {
                setImageUri(result.assets[0].uri);
                setDetectedText(''); // Reset detected text when a new image is picked
            }
        } catch (error) {
            console.error('Error picking an image:', error);
        }
    };

    const analyzeImage = async () => {
        if (!imageUri) {
            alert('Please pick an image first');
            return;
        }

        try {
            setIsLoading(true);
            const apiURL = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;
            const base64ImageData = await FileSystem.readAsStringAsync(imageUri, {
                encoding: FileSystem.EncodingType.Base64,
            });

            const requestData = {
                requests: [
                    {
                        image: { content: base64ImageData },
                        features: [{ type: 'TEXT_DETECTION', maxResults: 1 }],
                    },
                ],
            };

            const apiResponse = await axios.post(apiURL, requestData);
            const detectedText = apiResponse.data.responses[0].fullTextAnnotation.text;
            setDetectedText(detectedText);
        } catch (error) {
            console.error('Error analyzing image:', error);
            alert('Error analyzing image. Please try later');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text>DAuth Network - Oyster Project</Text>
            <Text style={styles.title}>Receipt Scanner</Text>
            {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
            <TouchableOpacity onPress={pickImage} style={styles.button}>
                <Text style={styles.text}>Choose an Image</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={analyzeImage} style={styles.button}>
                <Text style={styles.text}>Read Your Receipt</Text>
            </TouchableOpacity>
            {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
            {detectedText.length > 0 && (
                <View style={styles.detectedTextView}>
                    <Text style={styles.label}>Detected Text:</Text>
                    <ScrollView>
                        <Text style={styles.outputtext}>{detectedText}</Text>
                    </ScrollView>
                </View>
            )}
        </ScrollView>
    );
};

export default DetectText;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        margin: 20,
    },
    image: {
        width: '90%', // Responsive width
        height: 300, // Fixed height
        resizeMode: 'contain',
        marginVertical: 20,
    },
    button: {
        backgroundColor: '#DDDDDD',
        padding: 10,
        borderRadius: 10,
        margin: 10,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    label: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
    },
    outputtext: {
        fontSize: 18,
        marginTop: 10,
    },
    detectedTextView: {
        marginTop: 20,
    },
});
