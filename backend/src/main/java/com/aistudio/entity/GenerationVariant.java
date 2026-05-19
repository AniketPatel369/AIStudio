package com.aistudio.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "generation_variants")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class GenerationVariant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "generation_id", nullable = false)
    private Generation generation;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "upscale_url")
    private String upscaleUrl;

    private Integer width;

    private Integer height;
}
