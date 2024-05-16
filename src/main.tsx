import ReactDOM from 'react-dom/client'
import App from './App/App.tsx'
import './index.scss'
import {Provider} from "react-redux";
import store from "./store";
import {ToastProvider} from "react-toast-notifications";
import ToastComponent from "./components/Toast/Toast.component.tsx";
import ToastContainer from "./components/Toast/ToastContainer.component.tsx";
import {ApolloProvider} from "@apollo/client";
import client from "./gql/apolloClient.ts";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ApolloProvider client={client}>

    <ToastProvider components={{Toast:ToastComponent,ToastContainer:ToastContainer}
    }  placement={"bottom-right"} newestOnTop={true} >
    <Provider store={store}>
        <App />
    </Provider>
    </ToastProvider>
    </ApolloProvider>
)
