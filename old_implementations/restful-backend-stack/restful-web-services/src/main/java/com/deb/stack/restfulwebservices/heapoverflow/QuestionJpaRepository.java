package com.deb.stack.restfulwebservices.heapoverflow;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionJpaRepository extends JpaRepository<Question, Long>{
}
