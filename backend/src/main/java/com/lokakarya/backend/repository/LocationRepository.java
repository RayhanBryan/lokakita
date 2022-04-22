package com.lokakarya.backend.repository;

import java.util.List;

import com.lokakarya.backend.entity.Location;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface LocationRepository extends JpaRepository<Location, Long> {

    Page<Location> findAll(Pageable page);

    List<Location> findByStreetAddressContainingIgnoreCase(String streetAddress);

    Page<Location> findBystreetAddressContainingIgnoreCase(String streetAddress, Pageable paging);

    List<Location> findByCityContainingIgnoreCase(String city);

    List<Location> findByStateProvinceContainingIgnoreCase(String stateProvince);

    @Query(value = "SELECT * FROM LOCATIONS l" +
            " LEFT JOIN " + " COUNTRIES c " +
            " ON l.COUNTRY_ID = "
            + "c.COUNTRY_ID WHERE LOWER(c.COUNTRY_NAME) LIKE LOWER(CONCAT(CONCAT('%', :pCountryName), '%'))", nativeQuery = true)
    List<Location> findByCountryNameContainingIgnoreCase(@Param("pCountryName") String countryName);

    @Query(value = "SELECT DISTINCT STATE_PROVINCE FROM LOCATIONS l WHERE l.country_id = :pCountryId", nativeQuery = true)
    List<String> findStateProvinceByCountry(@Param("pCountryId") String countryId);

    @Query(value = "SELECT * FROM REGIONS r WHERE REGIONS r.region_name = :pRegionName", nativeQuery = true)
    List<String> findByRegionName(@Param("pRegionName") String reionName);
}
