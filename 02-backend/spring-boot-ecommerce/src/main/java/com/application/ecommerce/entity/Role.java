package com.application.ecommerce.entity;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "role")
public class Role {

    @Id
    @Column(name="id")
    @GeneratedValue(strategy= GenerationType.SEQUENCE)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(length = 20, name="name")
    private ERole name;

    @ManyToMany(fetch=FetchType.LAZY, cascade= {CascadeType.DETACH,
            CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH
    })

    @JoinTable(name="USERS_ROLE",
            joinColumns=@JoinColumn(name="ROLE_ID"),
            inverseJoinColumns=@JoinColumn(name="USER_ID"))
    private List<User> employees;


    public Role()
    {

    }

    public Role(ERole name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ERole getName() {
        return name;
    }

    public void setName(ERole name) {
        this.name = name;
    }

    public List<User> getEmployees() {
        return employees;
    }

    public void setEmployees(List<User> employees) {
        this.employees = employees;
    }
}
