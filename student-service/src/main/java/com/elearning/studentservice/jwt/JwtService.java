package com.elearning.studentservice.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JwtService {

    private static final String SECRET_KEY =
            "mysecretkeymysecretkeymysecretkey12";

    private Key getSignKey() {

        return Keys.hmacShaKeyFor(
                SECRET_KEY.getBytes()
        );
    }

    public String generateToken(
            Long studentId,
            String firstName,
            String lastName,
            String email
    ) {

        Map<String, Object> claims =
                new HashMap<>();

        claims.put(
                "studentId",
                studentId
        );

        claims.put(
                "firstName",
                firstName
        );

        claims.put(
                "lastName",
                lastName
        );

        return Jwts.builder()

                .setClaims(claims)

                .setSubject(email)

                .setIssuedAt(new Date())

                .setExpiration(
                        new Date(
                                System.currentTimeMillis()
                                        + 1000 * 60 * 60
                        )
                )

                .signWith(
                        getSignKey(),
                        SignatureAlgorithm.HS256
                )

                .compact();
    }

    public String extractEmail(String token) {

        Claims claims = Jwts.parserBuilder()

                .setSigningKey(getSignKey())

                .build()

                .parseClaimsJws(token)

                .getBody();

        return claims.getSubject();
    }
}