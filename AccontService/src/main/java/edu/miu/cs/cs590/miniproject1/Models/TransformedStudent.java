package edu.miu.cs.cs590.miniproject1.Models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Digits;
import javax.validation.constraints.Max;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="student")
public class TransformedStudent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public TransformedStudent(String firstName, String lastName, @Digits(integer = 1, fraction = 1) @Max(value = 4) double gpa, Date DOB) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gpa = gpa;
        this.DOB = DOB;
    }

    private String firstName;
    private String lastName;

    @Digits(integer = 1, fraction = 1)
    @Max(value = 4)
    private double gpa;

    private Date DOB; // First day of the year

}

