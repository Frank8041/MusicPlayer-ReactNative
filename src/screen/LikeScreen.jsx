import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AntDesign from "react-native-vector-icons/AntDesign";
import { fontSize, iconSizes, spacing } from '../constants/dimensions';
import Fontisto from "react-native-vector-icons/Fontisto";
import { fontFamilies } from '../constants/fonts';
import SongCard from '../components/SongCard';
import FloatingPlayer from '../components/FloatingPlayer';
import useLikeSongs from '../store/likeStore';
import { useNavigation, useTheme } from '@react-navigation/native';
import TrackPlayer from 'react-native-track-player';

const LikeScreen = () => {
    const { colors } = useTheme();

    const navigation = useNavigation();
    const { likedSongs, addToLiked } = useLikeSongs();
    const handleGoBack = () => {
        navigation.goBack();
    };

    const handlePlayTrack = async(selectedTrack, songs = likedSongs) => {      
    //make a queue and play the song
    const trackIndex = songs.findIndex((track) => track.url === selectedTrack.url);

    //if track doesnt exist
    if(trackIndex === -1) {
        return;
    }

    const beforeTracks = songs.slice(0, trackIndex);
    const afterTracks = songs.slice(trackIndex + 1);

    await TrackPlayer.reset();

    await TrackPlayer.add(selectedTrack);
    await TrackPlayer.add(afterTracks);
    await TrackPlayer.add(beforeTracks);

    await TrackPlayer.play();
    
    }

    return (
        <View style={[styles.container, {backgroundColor: colors.background}]}>
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={handleGoBack}>
                <AntDesign                
                    name={"arrowleft"} 
                    color={colors.iconPrimary} 
                    size={iconSizes.md} 
                />
            </TouchableOpacity>

            <TouchableOpacity>
                <Fontisto
                    name={"equalizer"} 
                    color={colors.iconPrimary} 
                    size={iconSizes.md}
                />
            </TouchableOpacity>
        </View>

        <Text style={[styles.headingText, {color: colors.textPrimary}]}>
            Liked Songs
        </Text>
        
        <FlatList             
            data={likedSongs}
            renderItem={({ item }) => <SongCard containerStyle={{
                width: "47%"
            }}
            imageStyle={{
                height: 160,
                width: 160,
            }}
            item = {item}
            handlePlay={(item) => {
                handlePlayTrack(item);
            }}
            />}
            numColumns={2}
            contentContainerStyle={{
                paddingBottom: 500,
                paddingHorizontal: spacing.lg,
            }}
            columnWrapperStyle={{
                justifyContent: "space-between",
                marginVertical: spacing.lg
            }}
        />

        <FloatingPlayer />
        </View>
    )
}

export default LikeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,        
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",        
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
    },
    headingText: {
        fontSize: fontSize.xl,        
        fontFamily: fontFamilies.bold,
        padding: spacing.md
    }
})