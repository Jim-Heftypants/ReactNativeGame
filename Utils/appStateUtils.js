import { AppState } from "react-native";

let count = 0;
export default function setAppState() {
    if (++count > 1) return;
    let appState = AppState.currentState;
    AppState.addEventListener("change",
        nextAppState => {
            if (appState.match(/inactive|background/) && nextAppState === "active") {
                console.log("App has come to the foreground!");
            }
            if (appState === "active" && nextAppState.match(/inactive|background/)) {
                console.log("App has been sent to the background!");

            }
            appState = nextAppState;
        }
    );
}