package com.aistudio.service;

import com.aistudio.dto.UserDTO;
import com.aistudio.entity.User;
import com.aistudio.entity.UserLimit;
import com.aistudio.repository.UserLimitRepository;
import com.aistudio.repository.UserRepository;
import com.aistudio.security.JwtUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@Service
public class AuthService {

    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

    private final UserRepository userRepository;
    private final UserLimitRepository userLimitRepository;
    private final JwtUtils jwtUtils;

    public AuthService(UserRepository userRepository,
                       UserLimitRepository userLimitRepository,
                       JwtUtils jwtUtils) {
        this.userRepository = userRepository;
        this.userLimitRepository = userLimitRepository;
        this.jwtUtils = jwtUtils;
    }

    /**
     * Validates a Supabase token and creates/returns a local JWT.
     * In production, you'd verify the Supabase JWT against the Supabase JWT secret.
     * For now, we extract user info and issue our own token.
     */
    @Transactional
    public Map<String, Object> login(String supabaseToken) {
        // TODO: Verify supabaseToken against Supabase JWT secret
        // For now, decode without verification for development
        String email = jwtUtils.getEmailFromToken(supabaseToken);

        User user = userRepository.findByEmail(email)
                .orElseGet(() -> createNewUser(email, supabaseToken));

        String token = jwtUtils.generateToken(user.getEmail());

        return Map.of(
                "token", token,
                "user", toDTO(user)
        );
    }

    /**
     * Creates a new user from Supabase data.
     */
    private User createNewUser(String email, String token) {
        User user = User.builder()
                .email(email)
                .name(email.split("@")[0])
                .authProvider("google")
                .role(User.Role.USER)
                .status(User.Status.ACTIVE)
                .build();
        user = userRepository.save(user);

        // Create initial limits
        UserLimit limit = UserLimit.builder()
                .user(user)
                .dailyGenerationCount(0)
                .blocked(false)
                .build();
        userLimitRepository.save(limit);

        logger.info("Created new user: {}", email);
        return user;
    }

    public UserDTO getCurrentUser(User user) {
        return toDTO(user);
    }

    private UserDTO toDTO(User user) {
        return UserDTO.builder()
                .uuid(user.getUuid())
                .name(user.getName())
                .email(user.getEmail())
                .avatar(user.getAvatar())
                .role(user.getRole().name())
                .status(user.getStatus().name())
                .createdAt(user.getCreatedAt() != null ? user.getCreatedAt().toString() : null)
                .build();
    }
}
