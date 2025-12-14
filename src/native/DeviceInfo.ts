
import { NativeModules } from 'react-native';

type DeviceInfoType = {
  getBattery(): Promise<number>;
  getNetwork(): Promise<string>;
};

const NativeDeviceInfo = NativeModules.WalletDeviceInfo;

if (__DEV__) {
  console.log(
    'WalletDeviceInfo native:',
    NativeDeviceInfo,
    NativeDeviceInfo && Object.keys(NativeDeviceInfo)
  );
}

const DeviceInfo: DeviceInfoType = NativeDeviceInfo
  ? {
      getBattery: () => NativeDeviceInfo.getBattery(),
      getNetwork: () => NativeDeviceInfo.getNetwork(),
    }
  : {
      getBattery: async () => {
        throw new Error('WalletDeviceInfo native module not linked');
      },
      getNetwork: async () => {
        throw new Error('WalletDeviceInfo native module not linked');
      },
    };

export default DeviceInfo;

