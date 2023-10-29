package com.cinema.cinemasystem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.cinema.cinemasystem.service.AdminService;

import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;

@SpringBootApplication
public class CinemasystemApplication {

	@Autowired
	private AdminService adminService;

	public static void main(String[] args) {
		SpringApplication.run(CinemasystemApplication.class, args);
	}

	@PostConstruct
	@Transactional
	public void init() {
		//adminService.deleteAll();
		//adminService.autoCreate("Jonathan", "Dintino", "811049442", "password");
		//adminService.autoCreate("Tucker", "Copeland", "1234", "password");
	}

}
