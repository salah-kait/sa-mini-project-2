package edu.miu.cs.cs590.accountservice.Models;

import edu.miu.cs.cs590.accountservice.Models.enums.PaymentMethod;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.NaturalId;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;


@Entity
@Table(name = "user_payments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @NaturalId
    private PaymentMethod paymentType;

    @NotBlank
    @Size(max = 4, min = 2)
    private String CCV;

    @NotBlank
    @Size(max = 16, min = 12)
    private String paymentMethodIdentifierNumber;

    private Boolean preferred;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id")
    private User user;
}
