package edu.miu.cs.cs590.accountservice.Services;

import edu.miu.cs.cs590.accountservice.Models.Payment;
import edu.miu.cs.cs590.accountservice.Repositories.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    public Payment save(Payment payment) {
        return paymentRepository.save(payment);
    }
}
