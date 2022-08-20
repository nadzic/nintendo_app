import React from 'react';
import { Provider } from 'react-redux';
import CodePush from 'react-native-code-push';
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from 'nintendoapp/js/redux/reduxConfigureStore';
import { AppNavigationContainer } from 'nintendoapp/AppNavigationContainer';
import NavigationService from 'nintendoapp/js/utils/navigation';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={false} persistor={persistor}>
          <AppNavigationContainer
              ref={navigatorRef => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}
          />
        </PersistGate>
      </Provider>
    );
  }
}

const codePushOptions = {
  installMode: CodePush.InstallMode.ON_NEXT_RESTART,
  checkFrequency: CodePush.CheckFrequency.ON_APP_START,
  updateDialog: null,
};

CodePush.getUpdateMetadata().then((update) => {
  if (update) {
    console.log("\n\n\n\n\n\n", update, "hi\n\n\n\n\n")
  } else {
    console.log("\n\n\n\n\n\n none hi\n\n\n\n\n")
  }
});

// export default App;
export default CodePush(codePushOptions)(App);
