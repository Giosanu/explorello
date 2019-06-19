import { createAppContainer, createStackNavigator } from "react-navigation";
import AddRouteScreen from "./AddRouteScreen";
import AddRouteManually from "./AddRouteManually";

export default createAppContainer(
  createStackNavigator({
    AddRouteLanding: { screen: AddRouteScreen },
    AddRouteManually: { screen: AddRouteManually }
  })
);
