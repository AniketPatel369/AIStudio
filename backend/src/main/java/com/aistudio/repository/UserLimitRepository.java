package com.aistudio.repository;

import com.aistudio.entity.UserLimit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserLimitRepository extends JpaRepository<UserLimit, Long> {

    Optional<UserLimit> findByUserId(Long userId);
}
