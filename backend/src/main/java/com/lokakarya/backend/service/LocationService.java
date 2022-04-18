package com.lokakarya.backend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import com.lokakarya.backend.entity.Country;
import com.lokakarya.backend.entity.Location;
import com.lokakarya.backend.repository.CountryRepository;
import com.lokakarya.backend.repository.LocationRepository;
import com.lokakarya.backend.util.PaginationList;
import com.lokakarya.backend.wrapper.LocationWrapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class LocationService {
    
    @Autowired
	LocationRepository locationRepository;

	@Autowired
	CountryRepository countryRepository;

    private Location toEntity(LocationWrapper wrapper) {
		Location entity = new Location();
		if (wrapper.getLocationId() != null) {
			entity = locationRepository.getById(wrapper.getLocationId());
		}
		Optional<Country>optionalCoun = countryRepository.findById(wrapper.getCountryId());
		Country country = optionalCoun.isPresent() ? optionalCoun.get() : null;
		entity.setCountry(country);
		entity.setCity(wrapper.getCity());
		entity.setCreatedDate(wrapper.getCreatedDate());
		entity.setPostalCode(wrapper.getPostalCode());
		entity.setStateProvince(wrapper.getStateProvince());
		entity.setStreetAddress(wrapper.getStreetAddress());

		return entity;
	}

	private LocationWrapper toWrapper(Location entity) {
		LocationWrapper wrapper = new LocationWrapper();
		wrapper.setLocationId(entity.getLocationId());
		wrapper.setCity(entity.getCity());
		wrapper.setCountryId(entity.getCountry() != null ? entity.getCountry().getCountryId() : null);
		wrapper.setCountryName(entity.getCountry() != null ? entity.getCountry().getCountryName() : null);
		wrapper.setCreatedDate(entity.getCreatedDate());
		wrapper.setPostalCode(entity.getPostalCode());
		wrapper.setStateProvince(entity.getStateProvince());
		wrapper.setStreetAddress(entity.getStreetAddress());
		
		return wrapper;
	}

	private List<LocationWrapper> toWrapperList(List<Location> entityList){
		List<LocationWrapper> wrapperList = new ArrayList<LocationWrapper>();
		for(Location entity : entityList) {
			LocationWrapper wrapper = toWrapper(entity);
			wrapperList.add(wrapper);
		}
		return wrapperList;
	}
	
	public PaginationList<LocationWrapper, Location> findaAllWithPagination(int page, int size){
		Pageable paging = PageRequest.of(page, size);
		Page<Location> locationPage = locationRepository.findAll(paging);
		List<Location> locationList = locationPage.getContent();
		List<LocationWrapper> locationWrapperList = toWrapperList(locationList);
		return new PaginationList<LocationWrapper, Location>(locationWrapperList, locationPage);
	}
		
	public PaginationList<LocationWrapper, Location> findByStreetAddressContaining(String streetAddress, int page, int size){
		Pageable paging = PageRequest.of(page, size);
		Page<Location> locationPage = locationRepository.findBystreetAddressContainingIgnoreCase(streetAddress, paging);
		List<Location> locationList = locationPage.getContent();
		List<LocationWrapper> locationWrapperList = toWrapperList(locationList);
		return new PaginationList<LocationWrapper, Location>(locationWrapperList, locationPage);
	}

    public LocationWrapper getByLocationId(Long locationId) {
		Location location = locationRepository.getById(locationId);
		return toWrapper(location);
	}

	// retrieve
	public List<LocationWrapper> findAll() {
		List<Location> locationList = locationRepository.findAll();
		return toWrapperList(locationList);
	}

	// create and update
	public LocationWrapper save(LocationWrapper wrapper) {
		Location location = locationRepository.save(toEntity(wrapper));
		return toWrapper(location);
	}

	// delete
	public void delete(Long id) {
		locationRepository.deleteById(id);
	}
    
}
