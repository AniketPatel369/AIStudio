package com.aistudio.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "user_limits")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class UserLimit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(name = "daily_generation_count")
    @Builder.Default
    private Integer dailyGenerationCount = 0;

    @Column(name = "last_reset_date")
    @Builder.Default
    private LocalDate lastResetDate = LocalDate.now();

    @Column(name = "fingerprint_hash")
    private String fingerprintHash;

    @Column(name = "ip_hash")
    private String ipHash;

    @Builder.Default
    private Boolean blocked = false;
}
