import {ApolloClient, InMemoryCache, from, HttpLink} from "@apollo/client";
import {onError} from "@apollo/client/link/error";
import {setContext} from "@apollo/client/link/context";
import {getToken} from "../utils/token.helper.ts";

const apiConfig = {
    graphUrl: import.meta.env.VITE_PUBLIC_GRAPHQL_ENDPOINT ,
}

const errorLink = onError(({graphQLErrors,networkError})=>{
    if(graphQLErrors){
        graphQLErrors.map((message,location,path)=>{
            console.log(`GQL ERR  `,message,` location : ${location} , path :`,path)
            console.error(message)
        })
    }
})
const handel =from([
    errorLink,
    new HttpLink({uri:apiConfig.graphUrl})
])
const authLink = setContext(()=>{
    return {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        }
    }
})
const client = new ApolloClient({
    cache:new  InMemoryCache() ,
    link:authLink.concat(handel),
});
export default client