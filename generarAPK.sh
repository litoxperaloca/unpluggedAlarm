cd /home/lito/PorMiBarrioAPPs/
rm -rf ./platforms/android/build/outputs/apk/PMB.apk
cordova build --release android
cd platforms/android/build/outputs/apk/
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore android-armv7-release-unsigned.apk alias_name

