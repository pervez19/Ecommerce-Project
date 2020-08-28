package com.application.ecommerce.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="country")
@Data
public class Country {
    @Id
    @Column(name="id")
    @SequenceGenerator(name="sequence",sequenceName="COUNTRY_SEQ",allocationSize=1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="sequence")
    private int id;

    @Column(name="code")
    private String code;

    @Column(name="name")
    private String name;

    @OneToMany(mappedBy="country",cascade=CascadeType.ALL)
    @JsonIgnore
    private List<State> states;
}
