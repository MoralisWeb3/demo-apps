import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useMoralis, useMoralisWeb3Api, useMoralisWeb3ApiCall } from "react-moralis";
import { useWalletConnect } from "./WalletConnect";

const styles = StyleSheet.create({
  center: { alignItems: "center", justifyContent: "center" },
  white: { backgroundColor: "white" },
  margin: { marginBottom: 20 },
  marginLarge: { marginBottom: 35 },
});

function Web3ApiExample(): JSX.Element {
  const { Moralis } = useMoralis();
  const {
    account: { getTokenBalances },
  } = useMoralisWeb3Api();
  const { data, isFetching, error } = useMoralisWeb3ApiCall(getTokenBalances);

  useEffect(() => {
    Moralis.Web3API.account.getTokenBalances({ address: "" }).then(console.log);
  }, []);

  if (isFetching) {
    return (
      <View style={styles.marginLarge}>
        <Text>Fetching token-balances...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.marginLarge}>
        <Text>Error:</Text>
        <Text>{JSON.stringify(error)}</Text>
      </View>
    );
  }

  return (
    <View style={styles.marginLarge}>
      <Text>Tokens</Text>
      <Text>{JSON.stringify(data)}</Text>
    </View>
  );
}

function UserExample(): JSX.Element {
  const { user } = useMoralis();

  return (
    <View style={styles.marginLarge}>
      <Text>UserName: {user.getUsername()}</Text>
      <Text>Email: {user.getEmail() ?? "-"}</Text>
      <Text>Address: {user.get("ethAddress")}</Text>
    </View>
  );
}

function App(): JSX.Element {
  const connector = useWalletConnect();
  const { authenticate, authError, isAuthenticating, isAuthenticated, logout, Moralis } = useMoralis();

  return (
    <View style={[StyleSheet.absoluteFill, styles.center, styles.white]}>
      <View style={styles.marginLarge}>
        {authError && (
          <>
            <Text>Authentication error:</Text>
            <Text style={styles.margin}>{authError.message}</Text>
          </>
        )}
        {isAuthenticating && <Text style={styles.margin}>Authenticating...</Text>}
        {!isAuthenticated && (
          // @ts-ignore
          <TouchableOpacity onPress={() => authenticate({ connector })}>
            <Text>Authenticate</Text>
          </TouchableOpacity>
        )}
        {isAuthenticated && (
          <TouchableOpacity onPress={() => logout()}>
            <Text>Logout</Text>
          </TouchableOpacity>
        )}
      </View>
      {isAuthenticated && (
        <View>
          <UserExample />
          <Web3ApiExample />
        </View>
      )}
    </View>
  );
}

export default App;
