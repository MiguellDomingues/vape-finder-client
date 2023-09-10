import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
//import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, } from '@apollo/client'
import * as Realm from "realm-web";
import { BrowserRouter } from "react-router-dom";
import { ATLAS_INFO } from './utils'

// Check out app.js for examples of how to run GraphQL operations


// To set up your app:
//
// 1. Link a cluster that includes the MongoDB Atlas sample data sets
// 2. Configure permissions for the ``sample_mflix.movies`` collection. For this
//    demo, you can assign full read/write permissions to the default role.
// 3. Generate a collection schema for the ``sample_mflix.movies`` collection.
// 4. Enable anonymous authentication
// 5. Deploy your changes
//
// Once your app is set up, replace the value of APP_ID with your App ID

// Connect to your MongoDB Realm app
const app = new Realm.App(ATLAS_INFO.APP_ID);

// Gets a valid Realm user access token to authenticate requests
async function getValidAccessToken() {
  // Guarantee that there's a logged in user with a valid access token
  if (!app.currentUser) {
    // If no user is logged in, log in an anonymous user. The logged in user will have a valid
    // access token.
    await app.logIn(Realm.Credentials.anonymous());
  } else {
    // An already logged in user's access token might be stale. To guarantee that the token is
    // valid, we refresh the user's custom data which also refreshes their access token.
    await app.currentUser.refreshCustomData();
  }
  
  return app.currentUser.accessToken;
}

const client = new ApolloClient({
  link: new HttpLink({
    uri: ATLAS_INFO.URI,
    // We define a custom fetch handler for the Apollo client that lets us authenticate GraphQL requests.
    // The function intercepts every Apollo HTTP request and adds an Authorization header with a valid
    // access token before sending the request.
    fetch: async (uri, options) => {
      const accessToken = await getValidAccessToken();
      options.headers.Authorization = `Bearer ${accessToken}`;
      return fetch(uri, options);
    },
  }),
  cache: new InMemoryCache({
    typePolicies: {
      tagmetadata: {
        keyFields: ["type_name"],
      },
      Query: {
        fields: {
          getSortedProducts: {
           read(existing, { args, toReference }) { //read() is always executed before the callout, and then again after callout, and then merge() is called
            //console.log("CACHE READ: args: ", args, " existing: ", existing)
            //debugger;
            return existing;      
          },
          //keyArgs: ["input", ["categories","brands","last_product_ids","stores","last_product_price","limit","sort_by"]] //the values of these args in input{} determine the cache retreival key
            keyArgs: ["input", ["categories","brands","stores","sort_by"]], //this pattern is how to define keys nested within an object:(input:{categories, brands, stores, sort_by,})          
            merge(existing = [], incoming) {
              console.log("CACHE MERGE: existing: ", existing.length, " incoming: ", incoming)
              return [...existing, ...incoming];
            },
          }
        }
      }
    }
  }),
  defaultOptions: {
      watchQuery: {
        nextFetchPolicy(currentFetchPolicy) {
          return currentFetchPolicy;
        },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
  </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals(console.log);
