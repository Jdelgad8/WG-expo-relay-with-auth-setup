import 'react-native-url-polyfill/auto';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { DragonsList } from './components/DragonsList';
import { WunderGraphRelayProvider } from './lib/wundergraph';
import { Suspense } from 'react';
import { createClient } from './.wundergraph/generated/client';

const client = createClient();

export default function App() {

	return (
		<WunderGraphRelayProvider>
			<Suspense>
				<View style={styles.container}>
					<DragonsList />
					<Button
						title="Login with Google"
						onPress={() => {
							client.login('google');
						}} />
				</View>
			</Suspense>
			<StatusBar style="auto" />
		</WunderGraphRelayProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
