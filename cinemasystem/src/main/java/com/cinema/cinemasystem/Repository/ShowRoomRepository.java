package com.cinema.cinemasystem.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.cinema.cinemasystem.model.ShowRoom;

public interface ShowRoomRepository extends JpaRepository<ShowRoom, Long>{
    
}
