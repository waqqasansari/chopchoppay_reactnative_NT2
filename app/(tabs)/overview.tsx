import { StyleSheet, Text, View } from 'react-native';

export default function OverviewScreen() {
    return (
        <View style={styles.container}>
            <Text>Overview Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
