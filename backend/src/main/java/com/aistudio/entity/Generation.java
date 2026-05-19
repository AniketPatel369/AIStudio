package com.aistudio.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "generations")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class Generation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false, updatable = false)
    private String uuid;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "provider_id")
    private Provider provider;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "model_id")
    private AiModel model;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private GenerationStatus status = GenerationStatus.PENDING;

    @Column(columnDefinition = "TEXT")
    private String prompt;

    @Column(name = "enhanced_prompt", columnDefinition = "TEXT")
    private String enhancedPrompt;

    @Column(name = "output_image")
    private String outputImage;

    @Column(name = "input_image")
    private String inputImage;

    @Column(name = "generation_time")
    private Long generationTime;

    @Column(name = "failed_reason")
    private String failedReason;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "generation", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<GenerationVariant> variants = new ArrayList<>();

    @PrePersist
    public void prePersist() {
        if (uuid == null) {
            uuid = UUID.randomUUID().toString();
        }
    }

    public enum GenerationStatus {
        PENDING, PROCESSING, UPSCALING, SUCCESS, FAILED, REFUNDED
    }
}
