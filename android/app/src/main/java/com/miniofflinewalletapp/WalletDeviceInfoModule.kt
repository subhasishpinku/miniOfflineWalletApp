package com.miniofflinewalletapp

import android.content.Context
import android.net.ConnectivityManager
import android.net.NetworkCapabilities
import android.os.BatteryManager
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class WalletDeviceInfoModule(
  private val context: ReactApplicationContext
) : ReactContextBaseJavaModule(context) {

  override fun getName(): String = "WalletDeviceInfo"

  @ReactMethod
  fun getBattery(promise: Promise) {
    try {
      val batteryManager =
        context.getSystemService(Context.BATTERY_SERVICE) as BatteryManager

      val level =
        batteryManager.getIntProperty(BatteryManager.BATTERY_PROPERTY_CAPACITY)

      promise.resolve(level)
    } catch (e: Exception) {
      promise.reject("BATTERY_ERROR", e.message)
    }
  }

  @ReactMethod
  fun getNetwork(promise: Promise) {
    try {
      val cm =
        context.getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager

      val network = cm.activeNetwork
      val caps = cm.getNetworkCapabilities(network)

      val type = when {
        caps == null -> "NONE"
        caps.hasTransport(NetworkCapabilities.TRANSPORT_WIFI) -> "WIFI"
        caps.hasTransport(NetworkCapabilities.TRANSPORT_CELLULAR) -> "MOBILE"
        else -> "UNKNOWN"
      }

      promise.resolve(type)
    } catch (e: Exception) {
      promise.reject("NETWORK_ERROR", e.message)
    }
  }
}
