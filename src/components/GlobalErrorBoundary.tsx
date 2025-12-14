import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type Props = { children: React.ReactNode };
type State = { hasError: boolean; error?: Error };

export default class GlobalErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('GlobalErrorBoundary', error, info);
  }

  reset = () => this.setState({ hasError: false, error: undefined });

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Something went wrong</Text>
          {__DEV__ && <Text>{this.state.error?.message}</Text>}
          <TouchableOpacity onPress={this.reset}>
            <Text>TRY AGAIN</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, marginBottom: 10 },
});
