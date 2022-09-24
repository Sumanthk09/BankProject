package com.example.demo.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.TransactionDetails;
@Repository
public interface TransactionRepo extends JpaRepository<TransactionDetails, String>
{

	List<TransactionDetails> findBySender(String sender);
	List<TransactionDetails> findByStatus(String status);
	List<TransactionDetails> findByInblacklist(String blackStatus);
	TransactionDetails findByTid(String tid);

}
