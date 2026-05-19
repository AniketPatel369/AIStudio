package com.aistudio.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "presets")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class Preset {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PresetCategory category;

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String prompt;

    @Column(name = "negative_prompt", columnDefinition = "TEXT")
    private String negativePrompt;

    private String thumbnail;

    @Builder.Default
    private Boolean enabled = true;

    public enum PresetCategory {
        LIGHTING, AESTHETIC, BACKGROUND, CAMERA, COLOR_SCHEME
    }
}
