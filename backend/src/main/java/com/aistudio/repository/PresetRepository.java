package com.aistudio.repository;

import com.aistudio.entity.Preset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PresetRepository extends JpaRepository<Preset, Long> {

    List<Preset> findByCategoryAndEnabledTrue(Preset.PresetCategory category);

    List<Preset> findByEnabledTrue();
}
