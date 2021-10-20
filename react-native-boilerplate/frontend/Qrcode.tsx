import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import QR from 'react-native-qrcode-svg';

export type QrcodeProps = {
  readonly uri?: string;
  readonly size?: number;
};

const padding = 15;

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  mt: {
    marginTop: 50,
  },
  qr: {
    padding,
    backgroundColor: 'white',
    overflow: 'hidden',
    borderRadius: padding,
  },
});

export default function Qrcode({
  size = 400,
  uri,
}: QrcodeProps): JSX.Element {
  if(!uri){
    return null
  }
  return (
    <View style={[{ width: size, height: size }, styles.center, styles.qr, styles.mt]}>
      {typeof uri === 'string' && !!uri.length && (
        // @ts-ignore
        <QR  logoSize={size * 0.2} value={uri} size={size - padding * 2 } />
      )}
    </View>
  );
}