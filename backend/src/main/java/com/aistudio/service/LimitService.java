package com.aistudio.service;

import com.aistudio.entity.User;
import com.aistudio.entity.UserLimit;
import com.aistudio.repository.UserLimitRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Map;

@Service
public class LimitService {

    private static final Logger logger = LoggerFactory.getLogger(LimitService.class);

    private final UserLimitRepository userLimitRepository;

    @Value("${aistudio.limits.free-daily}")
    private int freeDailyLimit;

    public LimitService(UserLimitRepository userLimitRepository) {
        this.userLimitRepository = userLimitRepository;
    }

    /**
     * Checks if a user can generate (hasn't exceeded daily limit).
     */
    public boolean canGenerate(User user) {
        UserLimit limit = getOrCreateLimit(user);

        if (limit.getBlocked()) {
            return false;
        }

        // Reset if new day
        if (limit.getLastResetDate().isBefore(LocalDate.now())) {
            limit.setDailyGenerationCount(0);
            limit.setLastResetDate(LocalDate.now());
            userLimitRepository.save(limit);
        }

        return limit.getDailyGenerationCount() < freeDailyLimit;
    }

    /**
     * Increments the daily generation count.
     */
    @Transactional
    public void incrementCount(User user) {
        UserLimit limit = getOrCreateLimit(user);
        limit.setDailyGenerationCount(limit.getDailyGenerationCount() + 1);
        userLimitRepository.save(limit);
    }

    /**
     * Returns current limit status for a user.
     */
    public Map<String, Object> getLimitStatus(User user) {
        UserLimit limit = getOrCreateLimit(user);

        // Reset if new day
        if (limit.getLastResetDate().isBefore(LocalDate.now())) {
            limit.setDailyGenerationCount(0);
            limit.setLastResetDate(LocalDate.now());
            userLimitRepository.save(limit);
        }

        int remaining = Math.max(0, freeDailyLimit - limit.getDailyGenerationCount());

        return Map.of(
                "dailyLimit", freeDailyLimit,
                "used", limit.getDailyGenerationCount(),
                "remaining", remaining,
                "blocked", limit.getBlocked(),
                "lastResetDate", limit.getLastResetDate().toString()
        );
    }

    private UserLimit getOrCreateLimit(User user) {
        return userLimitRepository.findByUserId(user.getId())
                .orElseGet(() -> {
                    UserLimit newLimit = UserLimit.builder()
                            .user(user)
                            .dailyGenerationCount(0)
                            .blocked(false)
                            .build();
                    return userLimitRepository.save(newLimit);
                });
    }

    /**
     * Scheduled task to reset all daily limits at midnight UTC.
     */
    @Scheduled(cron = "0 0 0 * * *")
    @Transactional
    public void resetDailyLimits() {
        logger.info("Resetting all daily generation limits");
        userLimitRepository.findAll().forEach(limit -> {
            limit.setDailyGenerationCount(0);
            limit.setLastResetDate(LocalDate.now());
        });
    }
}
