package com.lokakarya.backend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import com.lokakarya.backend.entity.Country;
import com.lokakarya.backend.entity.Location;
import com.lokakarya.backend.exception.BusinessException;
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
	
	//FIND ALL WITH PAGINATION
	public PaginationList<LocationWrapper, Location> findaAllWithPagination(int page, int size){
		Pageable paging = PageRequest.of(page, size);
		Page<Location> locationPage = locationRepository.findAll(paging);
		List<Location> locationList = locationPage.getContent();
		List<LocationWrapper> locationWrapperList = toWrapperList(locationList);
		return new PaginationList<LocationWrapper, Location>(locationWrapperList, locationPage);
	}
	
	// FIND BY STREET ADDRESS WITH PAGINATION
	public PaginationList<LocationWrapper, Location> findByStreetAddressContaining(String streetAddress, int page, int size){
		Pageable paging = PageRequest.of(page, size);
		Page<Location> locationPage = locationRepository.findBystreetAddressContainingIgnoreCase(streetAddress, paging);
		List<Location> locationList = locationPage.getContent();
		List<LocationWrapper> locationWrapperList = toWrapperList(locationList);
		return new PaginationList<LocationWrapper, Location>(locationWrapperList, locationPage);
	}

	// FIND BY STREET ADDRESS
	public List<LocationWrapper> getByStreetAddress(String streetAddress) {
		List<Location> streetAddressList = locationRepository.findByStreetAddressContainingIgnoreCase(streetAddress);
		return toWrapperList(streetAddressList);
	}

	// FIND BY CITY
	public List<LocationWrapper> getByCity(String city) {
		List<Location> cityList = locationRepository.findByCityContainingIgnoreCase(city);
		return toWrapperList(cityList);
	}

	// FIND BY STATE PROVINCE
	public List<LocationWrapper> getByStateProvince(String stateProvince) {
		List<Location> stateProvinceList = locationRepository.findByStateProvinceContainingIgnoreCase(stateProvince);
		return toWrapperList(stateProvinceList);
	}

	// FIND BY COUNTRY NAME
	public List<LocationWrapper> getByCountryName(String countryName) {
		List<Location> countryNameList = locationRepository.findByCountryNameContainingIgnoreCase(countryName);
		return toWrapperList(countryNameList);
	}

	// FIND BY LOCATION ID
	public LocationWrapper getByLocationId(Long locationId) {
		if (locationId == null)
			throw new BusinessException("ID cannot be null.");
		Optional<Location> location = locationRepository.findById(locationId);
		if (!location.isPresent())
			throw new BusinessException("Location with id " + locationId + " is not found.");
		return toWrapper(location.get());
	}
    // public LocationWrapper getByLocationId(Long locationId) {
	// 	Location location = locationRepository.getById(locationId);
	// 	return toWrapper(location);
	// }

	// FIND ALL
	public List<LocationWrapper> findAll() {
		List<Location> locationList = locationRepository.findAll();
		return toWrapperList(locationList);
	}

	// CREATE AND UPDATE
	public LocationWrapper save(LocationWrapper wrapper) {
		Location location = locationRepository.save(toEntity(wrapper));
		return toWrapper(location);
	}

	// DELETE
	public void delete(Long locationId) {
		if (locationId == null)
			throw new BusinessException("ID cannot be null.");
		Optional<Location> entity = locationRepository.findById(locationId);
		if (!entity.isPresent())
			throw new BusinessException("Location with ID " + locationId + " is not found");
		locationRepository.deleteById(locationId);
	}
	// public void delete(Long id) {
	// 	locationRepository.deleteById(id);
	// }
    
}
