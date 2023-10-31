package com.deb.stacks.questionsservice.database;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.deb.stacks.questionsservice.models.Question;

@Repository
public interface QuestionJpaRepository extends JpaRepository<Question, Long>{
    List<Question> findByOwner(String owner);
}
