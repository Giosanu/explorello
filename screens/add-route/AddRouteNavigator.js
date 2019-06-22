import { createAppContainer, createStackNavigator } from "react-navigation";
import AddRouteScreen from "./AddRouteScreen";
import AddRouteManually from "./AddRouteManually";
import EndAddRoute from "./EndAddRouteScreen";

export default createAppContainer(
  createStackNavigator({
    AddRouteLanding: { screen: AddRouteScreen },
    EndAddRoute: { screen: EndAddRoute },
    AddRouteManually: { screen: AddRouteManually }
  })
);
