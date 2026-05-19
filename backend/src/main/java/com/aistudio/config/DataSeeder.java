package com.aistudio.config;

import com.aistudio.entity.*;
import com.aistudio.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataSeeder {

    private static final Logger logger = LoggerFactory.getLogger(DataSeeder.class);

    @Bean
    CommandLineRunner seedData(ProviderRepository providerRepo,
                               ModelRepository modelRepo,
                               PresetRepository presetRepo) {
        return args -> {
            // Only seed if empty
            if (providerRepo.count() > 0) {
                logger.info("Database already seeded, skipping...");
                return;
            }

            logger.info("Seeding default data...");

            // ── Providers ─────────────────────────────
            Provider pollinations = providerRepo.save(Provider.builder()
                    .name("Pollinations").code("pollinations").enabled(true).priority(1)
                    .apiUrl("https://image.pollinations.ai").build());

            Provider nvidia = providerRepo.save(Provider.builder()
                    .name("NVIDIA NIMs").code("nvidia").enabled(true).priority(2)
                    .apiUrl("https://ai.api.nvidia.com").build());

            Provider huggingface = providerRepo.save(Provider.builder()
                    .name("HuggingFace").code("huggingface").enabled(true).priority(3)
                    .apiUrl("https://api-inference.huggingface.co").build());

            Provider togetherai = providerRepo.save(Provider.builder()
                    .name("TogetherAI").code("togetherai").enabled(true).priority(4)
                    .apiUrl("https://api.together.xyz").build());

            // ── Models ────────────────────────────────
            modelRepo.save(AiModel.builder().provider(pollinations).name("FLUX Schnell")
                    .code("flux-schnell").modelType(AiModel.ModelType.IMAGE)
                    .freeTier(true).maxResolution("1024x1024").build());

            modelRepo.save(AiModel.builder().provider(nvidia).name("SDXL")
                    .code("sdxl").modelType(AiModel.ModelType.IMAGE)
                    .freeTier(false).maxResolution("1024x1024").build());

            modelRepo.save(AiModel.builder().provider(huggingface).name("JuggernautXL")
                    .code("juggernautxl").modelType(AiModel.ModelType.IMAGE)
                    .freeTier(true).maxResolution("1024x1024").build());

            modelRepo.save(AiModel.builder().provider(togetherai).name("RealVisXL")
                    .code("realvisxl").modelType(AiModel.ModelType.IMAGE)
                    .freeTier(false).maxResolution("1024x1024").build());

            modelRepo.save(AiModel.builder().provider(pollinations).name("Real-ESRGAN")
                    .code("real-esrgan").modelType(AiModel.ModelType.ENHANCEMENT)
                    .freeTier(true).maxResolution("4096x4096").build());

            // ── Presets ───────────────────────────────
            // Lighting
            presetRepo.save(Preset.builder().category(Preset.PresetCategory.LIGHTING)
                    .name("Softbox").prompt("professional softbox studio lighting, soft diffused light, even illumination")
                    .negativePrompt("harsh shadows, overexposed, underexposed").build());
            presetRepo.save(Preset.builder().category(Preset.PresetCategory.LIGHTING)
                    .name("Luxury Rim Light").prompt("luxury rim lighting, edge highlights, premium product photography lighting")
                    .negativePrompt("flat lighting, no highlights").build());
            presetRepo.save(Preset.builder().category(Preset.PresetCategory.LIGHTING)
                    .name("Cinematic").prompt("cinematic dramatic lighting, moody atmosphere, volumetric light rays")
                    .negativePrompt("flat, boring, overlit").build());
            presetRepo.save(Preset.builder().category(Preset.PresetCategory.LIGHTING)
                    .name("Golden Hour").prompt("golden hour warm sunlight, sunset glow, warm tones, natural light")
                    .negativePrompt("cold, blue, artificial").build());
            presetRepo.save(Preset.builder().category(Preset.PresetCategory.LIGHTING)
                    .name("Studio White").prompt("clean white studio lighting, bright even illumination, commercial grade")
                    .negativePrompt("shadows, moody, dark").build());
            presetRepo.save(Preset.builder().category(Preset.PresetCategory.LIGHTING)
                    .name("Moody Dark").prompt("moody low-key lighting, dark atmosphere, dramatic shadows, mystery")
                    .negativePrompt("bright, overexposed, flat").build());

            // Aesthetic
            presetRepo.save(Preset.builder().category(Preset.PresetCategory.AESTHETIC)
                    .name("Apple Style").prompt("Apple product photography style, clean minimalist, premium white background, elegant")
                    .negativePrompt("cluttered, busy, cheap looking").build());
            presetRepo.save(Preset.builder().category(Preset.PresetCategory.AESTHETIC)
                    .name("Nike Style").prompt("Nike commercial style, bold dynamic composition, athletic energy, high contrast")
                    .negativePrompt("static, boring, lifeless").build());
            presetRepo.save(Preset.builder().category(Preset.PresetCategory.AESTHETIC)
                    .name("Minimal Luxury").prompt("minimal luxury aesthetic, understated elegance, premium materials, sophisticated")
                    .negativePrompt("flashy, cheap, cluttered").build());
            presetRepo.save(Preset.builder().category(Preset.PresetCategory.AESTHETIC)
                    .name("Korean Commercial").prompt("Korean commercial photography, soft dreamy aesthetic, pastel tones, K-beauty style")
                    .negativePrompt("harsh, aggressive, dark").build());
            presetRepo.save(Preset.builder().category(Preset.PresetCategory.AESTHETIC)
                    .name("Cyberpunk").prompt("cyberpunk neon aesthetic, futuristic, neon lights, sci-fi atmosphere, edgy")
                    .negativePrompt("natural, organic, vintage").build());

            // Background
            presetRepo.save(Preset.builder().category(Preset.PresetCategory.BACKGROUND)
                    .name("Marble").prompt("luxurious white marble surface, premium stone texture, elegant backdrop")
                    .negativePrompt("cheap, plastic, wood").build());
            presetRepo.save(Preset.builder().category(Preset.PresetCategory.BACKGROUND)
                    .name("Acrylic Black").prompt("sleek black acrylic surface, reflective glossy black, premium dark backdrop")
                    .negativePrompt("matte, textured, bright").build());
            presetRepo.save(Preset.builder().category(Preset.PresetCategory.BACKGROUND)
                    .name("Gradient").prompt("smooth color gradient background, seamless blend, studio gradient backdrop")
                    .negativePrompt("sharp edges, patterns, textures").build());
            presetRepo.save(Preset.builder().category(Preset.PresetCategory.BACKGROUND)
                    .name("Wooden").prompt("natural wood texture surface, rustic wooden backdrop, warm organic")
                    .negativePrompt("plastic, artificial, cold").build());

            // Camera
            presetRepo.save(Preset.builder().category(Preset.PresetCategory.CAMERA)
                    .name("Macro").prompt("macro close-up photography, extreme detail, shallow depth of field, crisp focus")
                    .negativePrompt("wide angle, distorted, blurry").build());
            presetRepo.save(Preset.builder().category(Preset.PresetCategory.CAMERA)
                    .name("85mm Portrait").prompt("85mm portrait lens, beautiful bokeh, professional product portrait, creamy background")
                    .negativePrompt("wide angle, fisheye, distorted").build());
            presetRepo.save(Preset.builder().category(Preset.PresetCategory.CAMERA)
                    .name("Top Angle").prompt("top-down flat lay photography, overhead view, organized composition")
                    .negativePrompt("side angle, tilted, perspective").build());

            // Color Scheme
            presetRepo.save(Preset.builder().category(Preset.PresetCategory.COLOR_SCHEME)
                    .name("Warm Gold").prompt("warm golden color palette, luxurious gold tones, amber warmth")
                    .negativePrompt("cold, blue, desaturated").build());
            presetRepo.save(Preset.builder().category(Preset.PresetCategory.COLOR_SCHEME)
                    .name("Monochrome").prompt("black and white monochrome, elegant grayscale, high contrast B&W")
                    .negativePrompt("colorful, vibrant, saturated").build());
            presetRepo.save(Preset.builder().category(Preset.PresetCategory.COLOR_SCHEME)
                    .name("Pastel").prompt("soft pastel color palette, gentle muted colors, dreamy aesthetic")
                    .negativePrompt("bold, harsh, neon, dark").build());

            logger.info("Database seeded with {} providers, {} models, {} presets",
                    providerRepo.count(), modelRepo.count(), presetRepo.count());
        };
    }
}
