package com.application.ecommerce.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration
public class MyRestConfig implements RepositoryRestConfigurer {

    private EntityManager entityManager;

    @Autowired
    public  MyRestConfig(EntityManager entityManager)
    {
        this.entityManager=entityManager;
    }


    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        HttpMethod[] theUnsupportedAction={HttpMethod.DELETE,HttpMethod.POST,HttpMethod.PUT};

//        disableHttpMethods(State.class,config, theUnsupportedAction);
//        disableHttpMethods(Country.class,config, theUnsupportedAction);
//        disableHttpMethods(ProductCategory.class,config, theUnsupportedAction);
//        disableHttpMethods(Product.class,config, theUnsupportedAction);

        exposeIds(config);
    }

    private void disableHttpMethods(Class theClass,RepositoryRestConfiguration config, HttpMethod[] theUnsupportedAction) {
        config.getExposureConfiguration()
                .forDomainType(theClass)
                .withItemExposure(((metdata, httpMethods) -> httpMethods.disable(theUnsupportedAction)))
                .withCollectionExposure(((metdata, httpMethods) -> httpMethods.disable(theUnsupportedAction)));
    }

    private void exposeIds(RepositoryRestConfiguration config) {
        Set<EntityType<?>> entitys=entityManager.getMetamodel().getEntities();

        List<Class> entityClasses=new ArrayList<>();

        for(EntityType tempEntityType: entitys)
        {
            entityClasses.add(tempEntityType.getJavaType());

        }

        Class[] domainTypes=entityClasses.toArray(new Class[0]);
        config.exposeIdsFor(domainTypes);
    }


}