package com.aistudio.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "generation_logs")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class GenerationLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "generation_id", nullable = false)
    private Generation generation;

    @Column(name = "step_name")
    private String stepName;

    @Column(name = "log_message", columnDefinition = "TEXT")
    private String logMessage;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
}
