package edu.miu.cs.cs590.miniproject1.Payload.Response;

import edu.miu.cs.cs590.miniproject1.Security.UserPrincipal;
import lombok.Getter;

@Getter
public class JwtAuthenticationResponse {
    private String accessToken;
    private String tokenType = "Bearer";
    private UserPrincipal user ;

    public JwtAuthenticationResponse(String accessToken, UserPrincipal userDetails) {
        this.accessToken = accessToken;
        this.user = userDetails;
    }
}
