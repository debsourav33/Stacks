package com.deb.stacks.answerservice.database;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.deb.stacks.answerservice.models.Answer;

@Repository
public interface AnswerJpaRepository extends JpaRepository<Answer,Long>{
    List<Answer> findByQuestionID(long questionId);

    List<Answer> findByUserId(String userId);
}
