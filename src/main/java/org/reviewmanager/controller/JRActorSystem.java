package org.reviewmanager.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/actors")
public class JRActorSystem {

	@GetMapping("/status")
	public @ResponseBody String getActorStatus(){
		return "This is actor starting point...";
	}
	
}
