package com.cinema.cinemasystem.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.cinema.cinemasystem.model.Movie;
import java.time.LocalDateTime;
import java.util.Set;


@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {
    List<Movie> findByTitle(String input);
    List<Movie> findByCategory(String input);
    List<Movie> findByComingSoon(Boolean isComingSoon);
    @Query("SELECT m FROM Movie m JOIN m.showTimes st " +
           "WHERE m.id <> :movieId AND st IN :showTimes " +
           "GROUP BY m HAVING COUNT(st) >= :count")
    List<Movie> findMoviesByOverlappingShowTimes(
        @Param("movieId") Long movieId,
        @Param("showTimes") Set<LocalDateTime> showTimes,
        @Param("count") long count
    );
}
