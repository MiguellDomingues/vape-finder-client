import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',

  cache: new InMemoryCache({
    typePolicies: {
      SearchType: {
        keyFields: ["type_name"],
      },
      Query: {
        fields: {

          getProducts: {
           read(existing, { args, toReference }) {
            console.log("CACHE READ: existing: ", existing)
            return existing;
          },

            keyArgs: ["category", "stores", "brands",] ,              
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
      nextFetchPolicy(
        currentFetchPolicy,
        {
          // Either "after-fetch" or "variables-changed", indicating why the
          // nextFetchPolicy function was invoked.
          reason,
          // The rest of the options (currentFetchPolicy === options.fetchPolicy).
          options,
          // The original value of options.fetchPolicy, before nextFetchPolicy was
          // applied for the first time.
          initialPolicy,
          // The ObservableQuery associated with this client.watchQuery call.
          observable,
        }
      ) {
        console.log("////INSIDE NEXTFETCHPOLICY////")
        return currentFetchPolicy ;
      },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
