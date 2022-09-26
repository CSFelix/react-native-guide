import Reactotron from 'reactotron-react-native';

// as far we just use Reactotron in Dev Environment
// we set this if-clause to check out if the application
// is really running in Dev Env
if (__DEV__) {
  const tron = Reactotron
    .configure({ host: 'localhost' })
    .useReactNative()
    .connect();

  // yes, we can add new properties into 'console' object!!
  console.tron = tron;

  // this command is like 'console.clear', but in Reactotron
  tron.clear();
}
