package com.aistudio.dto;

import lombok.*;

import java.util.List;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class GenerationDTO {

    private String uuid;
    private String status;
    private String prompt;
    private String enhancedPrompt;
    private String outputImage;
    private String inputImage;
    private Long generationTime;
    private String failedReason;
    private String createdAt;
    private String providerName;
    private String modelName;
    private List<VariantDTO> variants;

    @Getter @Setter
    @NoArgsConstructor @AllArgsConstructor
    @Builder
    public static class VariantDTO {
        private String imageUrl;
        private String upscaleUrl;
        private Integer width;
        private Integer height;
    }
}
