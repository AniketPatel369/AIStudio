package com.aistudio.repository;

import com.aistudio.entity.AiModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ModelRepository extends JpaRepository<AiModel, Long> {

    Optional<AiModel> findByCode(String code);

    List<AiModel> findByProviderIdAndEnabledTrue(Long providerId);

    List<AiModel> findByEnabledTrue();

    List<AiModel> findByModelType(AiModel.ModelType modelType);
}
