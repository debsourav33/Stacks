package com.deb.stacks.questionsservice.models;

import org.springframework.http.HttpStatus;

import io.micrometer.common.lang.Nullable;

public class Result<T> {
    private HttpStatus status;
    
    @Nullable
    private String error;
    @Nullable
    private T result;
    
    public Result(HttpStatus status, String error, T result) {
        this.status = status;
        this.error = error;
        this.result = result;
    }

    public HttpStatus getStatus() {
        return status;
    }

    public String getError() {
        return error;
    }

    public T getResult() {
        return result;
    }
}
