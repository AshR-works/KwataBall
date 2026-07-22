"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AppNavigator;
const native_1 = require("@react-navigation/native");
const bottom_tabs_1 = require("@react-navigation/bottom-tabs");
const HomeScreen_1 = __importDefault(require("../screens/home/HomeScreen"));
const ExploreScreen_1 = __importDefault(require("../screens/explore/ExploreScreen"));
const Tab = (0, bottom_tabs_1.createBottomTabNavigator)();
function AppNavigator() {
    return (<native_1.NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen_1.default}/>
        <Tab.Screen name="Explore" component={ExploreScreen_1.default}/>
      </Tab.Navigator>
    </native_1.NavigationContainer>);
}
//# sourceMappingURL=AppNavigation.js.map