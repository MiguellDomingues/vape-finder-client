import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
    query FindProduct($query: ProductQueryInput!, $limit: Int,$sortBy: ProductSortByInput) {
        products(query: $query, limit: $limit,sortBy: $sortBy)  {
            _id, source_id,  source_url, last_updated, 
            brand, category_str, name, img_src, price, info_url
             
        }   
    }
`;

export const GET_SEARCH_TYPES = gql`
    query FindTagmetadatum($query: TagmetadatumQueryInput!) {  
        tagmetadata(query: $query) {
            type_name, 
                tags{
                    tag_name, product_count
                }  
        }       
    }
`;