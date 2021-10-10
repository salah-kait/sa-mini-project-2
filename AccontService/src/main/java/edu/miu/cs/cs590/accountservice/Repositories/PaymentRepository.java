package edu.miu.cs.cs590.accountservice.Repositories;

import edu.miu.cs.cs590.accountservice.Models.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    Optional<Payment> findByUserId(Payment payment);
}