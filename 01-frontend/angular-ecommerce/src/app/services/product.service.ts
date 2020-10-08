import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from "../common/product";
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*'})
};

@Injectable({
  providedIn: 'root'
})


export class ProductService {
 
 
  private baseUrl= 'http://localhost:8080/api/products';

  private categoryUrl='http://localhost:8080/api/product-category';

  private adminUrl= 'http://localhost:8080/api/admin';



  constructor(private httpClient:HttpClient) { }


  getProductList(theCategoryId:number):Observable<Product[]>{
     const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
     return this.getProducts(searchUrl);
  }


  getProductListPaginate(thePage:number,
                          thePageSize:number,
                          theCategoryId:number):Observable<GetResponseProducts>{
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
                    +`&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
 }
 
  getProductListPaginateforAdmin(thePage:number,
    thePageSize:number):Observable<GetResponseProducts>{
  const searchUrl = `${this.baseUrl}` +`?page=${thePage}&size=${thePageSize}`;
  return this.httpClient.get<GetResponseProducts>(searchUrl);
  }


  getProductCategory():Observable<ProductCategory[]> {
      return this.httpClient.get< GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response=>response._embedded.productCategory)
    );
  }

  getCategory(id:any):Observable<any> {
    const url=`${this.baseUrl}/${id}/category`;
    return this.httpClient.get(url);
}

 



  searchProducts(theKeyWord: string):Observable<Product[]> {

    const searchUrl=`${this.baseUrl}/search/findByNameContainingIgnoreCase?name=${theKeyWord}`;
    return this.getProducts(searchUrl);
  }

  searchProductsPaginate(thePage:number,
                        thePageSize:number,
                        theKeyWord: string):Observable<GetResponseProducts>{

        const searchUrl=`${this.baseUrl}/search/findByNameContainingIgnoreCase?name=${theKeyWord}`
                 +`&page=${thePage}&size=${thePageSize}`;

             return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProduct(theProductId: number):Observable<Product> {
    const productUrl=`${this.baseUrl}/${theProductId}`;
    return this.httpClient.get<Product>(productUrl);
  }



  getProductListForAdmin(): Observable<any> {  
    return this.httpClient.get(`${this.baseUrl}`);  
  }  
  
  createCategory(productCategory: ProductCategory): Observable<object> {
    console.log("productCategory : "+productCategory)
     
    return this.httpClient.post(`${this.adminUrl}/category`,{
      categoryName : productCategory.categoryName,
        });         
  }



  createProduct(product: Product): Observable<object> {  
    console.log("createProduct : "+product);
    return this.httpClient.post(`${this.adminUrl}/post`,{

          id : product.id,

          sku : product.sku,

          name : product.name,

          description :product.description,
            
          unitPrice : product.unitPrice,
            
          imageUrl : product.imageUrl,
            
          active : product.active,

          unitInStock : product.unitInStock,
            
          dateCreated :product.dateCreated,
            
          lastUpdate :product.lastUpdate,
 
          category : product.category
    }); 
  }  
  
  deleteProduct(id: number): Observable<any> {  
    return this.httpClient.delete <Product>(`${this.baseUrl}/${id}`);  
}  

deleteCategory(id: number): Observable<any> {  
  return this.httpClient.delete <ProductCategory>(`${this.categoryUrl}/${id}`);  
} 
  
  getProductForAdmin(id: number): Observable<Object> {  
    return this.httpClient.get(`${this.baseUrl}/${id}`);  
  }  
  
  updateProduct(id: number, value: any): Observable<Object> {  
    return this.httpClient.post(`${this.baseUrl}/${id}`, value);  
  }  







  // save(product): Observable<any> {
  //   console.log(product);
  //   return this.httpClient.post(this.baseUrl, {
  //     username: user.username,
  //     email: user.email,
  //     password: user.password
  //     sku;
  //   }, httpOptions);
  // }










  
}
interface GetResponseProducts{
  _embedded: {
    products:Product[];
  }
  page:{
    size: number;
    totalElements:number;
    totalPages:number;
    number:number;
  }
}


interface GetResponseProductCategory{
  _embedded: {
    productCategory:ProductCategory[];
  }
}
