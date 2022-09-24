package com.example.demo.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.blacklist;
@Repository
public interface blackList extends JpaRepository<blacklist, String>{

	blacklist findByName(String receiver);

}
