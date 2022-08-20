import { NavigationActions, StackActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

function goBack() {
  _navigator.dispatch(
    NavigationActions.back({})
  );
}

function resetState(routeName) {
  _navigator.dispatch(
    StackActions.reset({
      index: 0,
      key: null,
      actions: [
        NavigationActions.navigate({
          routeName: 'AppNavigator',
          key: null,
          action:
            NavigationActions.navigate({ routeName }),
        })]
    })
  );
}

export default {
  navigate,
  setTopLevelNavigator,
  goBack,
  resetState
};