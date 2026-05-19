package com.aistudio.repository;

import com.aistudio.entity.Generation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface GenerationRepository extends JpaRepository<Generation, Long> {

    Optional<Generation> findByUuid(String uuid);

    Page<Generation> findByUserIdOrderByCreatedAtDesc(Long userId, Pageable pageable);

    @Query("SELECT COUNT(g) FROM Generation g WHERE g.user.id = :userId AND g.status = 'SUCCESS' AND g.createdAt >= :since")
    long countSuccessfulSince(@Param("userId") Long userId, @Param("since") LocalDateTime since);

    @Query("SELECT COUNT(g) FROM Generation g WHERE g.user.id = :userId")
    long countByUserId(@Param("userId") Long userId);

    @Query("SELECT COUNT(g) FROM Generation g WHERE g.user.id = :userId AND g.status = 'SUCCESS'")
    long countSuccessfulByUserId(@Param("userId") Long userId);
}
