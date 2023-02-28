import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
    query GetProducts($last_product_id: ID!, $category: String!, $stores: [String!], $brands: [String!], $page: Int) {
        getProducts(last_product_id: $last_product_id, category: $category, stores: $stores, brands: $brands, page: $page) {
            id, source_id,  source_url, last_updated
            info{
                brand, category_str, name, img_src, price, info_url
            }   
        }   
    }
`;

export const GET_SEARCH_TYPES = gql`
    query GetSearchTypes {  
        getSearchTypes {
        type_name, 
            tags{
              tag_name, product_count
            }  
        }       
    }
`;

/*
export const GET_INIT = gql`
query GetInit {  
    getInit{
        getSearchTypes{
        type_name, 
        tags{tag_name, product_count}
        }  
   
        getInitProducts{
            id, source_id,  source_url, last_updated 
            info{brand, category_str, name, img_src, price, info_url}
            }
    }
 }
`;
*/
