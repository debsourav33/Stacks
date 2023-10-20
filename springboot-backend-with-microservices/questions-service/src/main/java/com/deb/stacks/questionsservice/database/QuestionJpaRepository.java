package com.deb.stacks.questionsservice.database;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.deb.stacks.questionsservice.models.Question;

@Repository
public interface QuestionJpaRepository extends JpaRepository<Question, Long>{
    
}
