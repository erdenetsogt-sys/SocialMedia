import ReactDOM from "react-dom/client";
// import * as serviceworker from "./serviceworker";
import App from "./App";

// ReactDOM.render(ApolloProvider, document.getElementById("root"));
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
// serviceworker.register();
