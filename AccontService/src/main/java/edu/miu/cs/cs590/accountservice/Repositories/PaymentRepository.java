package edu.miu.cs.cs590.accountservice.Repositories;

import edu.miu.cs.cs590.accountservice.Models.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
@Transactional
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    Optional<Payment> findByUserId(Payment payment);

    @Modifying
    @Query("UPDATE Payment pm SET pm.preferred=false WHERE pm.user.id = :userId AND pm.id <> :pmId")
    void updatePreferredPayments(@Param("userId") Long UserId, @Param("pmId") Long pmId);


    @Query("SELECT pm FROM  Payment pm  WHERE pm.user.id = :userId AND pm.preferred = true")
    Optional<Payment> getUserPreferredPayment(@Param("userId") Long UserId);
}