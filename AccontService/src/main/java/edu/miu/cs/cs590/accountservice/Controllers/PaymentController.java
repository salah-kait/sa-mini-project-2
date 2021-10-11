package edu.miu.cs.cs590.accountservice.Controllers;

import edu.miu.cs.cs590.accountservice.Models.Payment;
import edu.miu.cs.cs590.accountservice.Repositories.PaymentRepository;
import edu.miu.cs.cs590.accountservice.Security.CurrentUser;
import edu.miu.cs.cs590.accountservice.Security.UserPrincipal;
import edu.miu.cs.cs590.accountservice.Services.PaymentService;
import edu.miu.cs.cs590.accountservice.Services.UserService;
import javassist.NotFoundException;
import jdk.nashorn.internal.runtime.options.Option;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/payment")
public class PaymentController {

    @Autowired
    PaymentService paymentService;

    @Autowired
    PaymentRepository paymentRepository;

    @Autowired
    UserService userService;

    @PostMapping
    public ResponseEntity<?> payment(@Valid @RequestBody Payment payment, @CurrentUser UserPrincipal userPrincipal) throws NotFoundException {
        payment.setUser(userService.getUserById(userPrincipal.getId()));
        payment = paymentService.save(payment);
        if(payment.getPreferred()){
            paymentRepository.updatePreferredPayments(userPrincipal.getId(),payment.getId());
        }
        return ResponseEntity.ok(payment);
    }

    @GetMapping("/preferred")
    public ResponseEntity<?> Preferred( @CurrentUser UserPrincipal userPrincipal) throws NotFoundException {

       Optional<Payment> payment = paymentRepository.getUserPreferredPayment(userPrincipal.getId());

        return ResponseEntity.ok(payment.get());
    }
}
