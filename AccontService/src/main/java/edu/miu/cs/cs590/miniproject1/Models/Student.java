package edu.miu.cs.cs590.miniproject1.Models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Digits;
import javax.validation.constraints.Max;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class Student {
    private String firstName;
    private String lastName;

    @Digits(integer = 1, fraction = 1)
    @Max(value = 4)
    private double gpa;

    private int age;

}
