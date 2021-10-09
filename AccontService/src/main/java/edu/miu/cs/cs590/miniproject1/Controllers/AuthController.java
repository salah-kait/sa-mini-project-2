package edu.miu.cs.cs590.miniproject1.Controllers;

import edu.miu.cs.cs590.miniproject1.Exception.AppException;
import edu.miu.cs.cs590.miniproject1.Models.Role;
import edu.miu.cs.cs590.miniproject1.Models.User;
import edu.miu.cs.cs590.miniproject1.Models.enums.RoleName;
import edu.miu.cs.cs590.miniproject1.Payload.Requests.LoginRequest;
import edu.miu.cs.cs590.miniproject1.Payload.Requests.SignUpRequest;
import edu.miu.cs.cs590.miniproject1.Payload.Response.ApiResponse;
import edu.miu.cs.cs590.miniproject1.Payload.Response.JwtAuthenticationResponse;
import edu.miu.cs.cs590.miniproject1.Repositories.RoleRepository;
import edu.miu.cs.cs590.miniproject1.Security.JwtTokenProvider;
import edu.miu.cs.cs590.miniproject1.Security.UserPrincipal;
import edu.miu.cs.cs590.miniproject1.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.Collections;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserService userService;

    @Autowired
    RoleRepository roleRepository;


    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtTokenProvider tokenProvider;


    @PostMapping("/verify-token")
    public ResponseEntity<?> verifyToken(Authentication authentication) {
        return ResponseEntity.ok((UserPrincipal)authentication.getPrincipal());
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsernameOrEmail(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication);
        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt,(UserPrincipal)authentication.getPrincipal()));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
        try{
            if(userService.existsByUsername(signUpRequest.getUsername())) {
                return new ResponseEntity(new ApiResponse(false, "Username is already taken!"),
                        HttpStatus.BAD_REQUEST);
            }

            if(userService.existsByEmail(signUpRequest.getEmail())) {
                return new ResponseEntity(new ApiResponse(false, "Email Address already in use!"),
                        HttpStatus.BAD_REQUEST);
            }

            // Creating user's account
            User user = new User(signUpRequest.getName(), signUpRequest.getUsername(),
                    signUpRequest.getEmail(), signUpRequest.getPassword());

            user.setPassword(passwordEncoder.encode(user.getPassword()));

            RoleName userRoleName = signUpRequest.getRole();
            Role userRole = roleRepository.findByName(userRoleName)
                    .orElseThrow(() -> new AppException("User Role not set."+signUpRequest.getRole()));

            user.setRoles(Collections.singleton(userRole));

            User result = userService.save(user);

            //notificationServiceFactory.getService(NotificationType.Email).sendNotification(result,"Welcome to MIU Job Portal","Welcome "+result.getName()+" to MIU Job Portal");

            URI location = ServletUriComponentsBuilder
                    .fromCurrentContextPath().path("/users/{username}")
                    .buildAndExpand(result.getUsername()).toUri();

            return ResponseEntity.created(location).body(new ApiResponse(true, "User registered successfully"));

        }catch (Exception e){
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage()));
        }
    }
}
