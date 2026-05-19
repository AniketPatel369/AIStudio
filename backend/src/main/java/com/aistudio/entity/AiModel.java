package com.aistudio.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "models")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class AiModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "provider_id", nullable = false)
    private Provider provider;

    @Column(nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String code;

    @Enumerated(EnumType.STRING)
    @Column(name = "model_type", nullable = false)
    private ModelType modelType;

    @Builder.Default
    private Boolean enabled = true;

    @Column(name = "free_tier")
    @Builder.Default
    private Boolean freeTier = true;

    @Column(name = "max_resolution")
    private String maxResolution;

    @Column(name = "supports_ip_adapter")
    @Builder.Default
    private Boolean supportsIpAdapter = false;

    public enum ModelType {
        TEXT, IMAGE, ENHANCEMENT
    }
}
