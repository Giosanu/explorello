package com.explorello;

import android.app.Application;

import com.facebook.react.ReactApplication;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.database.RNFirebaseDatabasePackage;
import io.invertase.firebase.functions.RNFirebaseFunctionsPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import dk.madslee.imageSequence.RCTImageSequencePackage;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.agontuk.RNFusedLocation.RNFusedLocationPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import android.support.annotation.NonNull;
import com.facebook.FacebookSdk;
import com.facebook.CallbackManager;
import com.facebook.appevents.AppEventsLogger;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }
  @Override
  public void onCreate() {
      super.onCreate();
      FacebookSdk.sdkInitialize(getApplicationContext());
      AppEventsLogger.activateApp(this);
  }
  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new RNFirebasePackage(),
          new RNFirebaseDatabasePackage(),
          new RNFirebaseFunctionsPackage(),
          new RCTImageSequencePackage(),
          new MapsPackage(),
          new RNGestureHandlerPackage(),
          new RNFusedLocationPackage(),
          new FBSDKPackage(mCallbackManager),
          new RNGoogleSigninPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  // @Override
  // public void onCreate() {
  //   super.onCreate();
  //   SoLoader.init(this, /* native exopackage */ false);
  // }
}
