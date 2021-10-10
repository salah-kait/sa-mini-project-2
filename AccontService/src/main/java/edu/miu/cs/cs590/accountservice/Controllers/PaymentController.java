package edu.miu.cs.cs590.accountservice.Controllers;

import edu.miu.cs.cs590.accountservice.Models.Payment;
import edu.miu.cs.cs590.accountservice.Security.CurrentUser;
import edu.miu.cs.cs590.accountservice.Security.UserPrincipal;
import edu.miu.cs.cs590.accountservice.Services.PaymentService;
import edu.miu.cs.cs590.accountservice.Services.UserService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/payment")
public class PaymentController {

    @Autowired
    PaymentService paymentService;

    @Autowired
    UserService userService;

    @PostMapping
    public ResponseEntity<?> payment(@Valid @RequestBody Payment payment, @CurrentUser UserPrincipal userPrincipal) throws NotFoundException {
        payment.setUser(userService.getUserById(userPrincipal.getId()));
        return ResponseEntity.ok(paymentService.save(payment));
    }
}
