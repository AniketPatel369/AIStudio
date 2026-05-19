package com.aistudio.repository;

import com.aistudio.entity.Provider;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProviderRepository extends JpaRepository<Provider, Long> {

    Optional<Provider> findByCode(String code);

    List<Provider> findByEnabledTrueOrderByPriorityAsc();
}
