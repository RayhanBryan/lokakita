package com.lokakarya.backend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.transaction.annotation.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.lokakarya.backend.entity.Country;
import com.lokakarya.backend.entity.Region;
import com.lokakarya.backend.repository.CountryRepository;
import com.lokakarya.backend.repository.RegionRepository;
import com.lokakarya.backend.util.PaginationList;
import com.lokakarya.backend.wrapper.CountryWrapper;

@Service
@Transactional
public class CountryService {

	@Autowired
	CountryRepository countryRepository;

	@Autowired
	RegionRepository regionRepository;

	public CountryWrapper getByCountryId(String countryId) {
		Country country = countryRepository.getById(countryId);
		return toWrapper(country);
	}

	public List<CountryWrapper> findAll() {
		List<Country> countryList = countryRepository.findAll();
		return toWrapperList(countryList);
	}

	public void delete(String countryId) {
		countryRepository.deleteById(countryId);

	}

	private CountryWrapper toWrapper(Country entity) {
		CountryWrapper wrapper = new CountryWrapper();
		wrapper.setCountryId(entity.getCountryId());
		wrapper.setCountryName(entity.getCountryName());
		wrapper.setRegionId(entity.getRegion() != null ? entity.getRegion().getRegionId() : null);
		wrapper.setRegionName(entity.getRegion() != null ? entity.getRegion().getRegionName() : null);

		return wrapper;
	}

	private List<CountryWrapper> toWrapperList(List<Country> entityList) {
		List<CountryWrapper> wrapperList = new ArrayList<CountryWrapper>();
		for (Country entity : entityList) {
			CountryWrapper wrapper = toWrapper(entity);
			wrapperList.add(wrapper);
		}
		return wrapperList;
	}

	public CountryWrapper save(CountryWrapper wrapper) {
		Country country = countryRepository.save(toEntity(wrapper));
		return toWrapper(country);
	}

	private Country toEntity(CountryWrapper wrapper) {
		Country entity = new Country();
		entity.setCountryId(wrapper.getCountryId());
		entity.setCountryName(wrapper.getCountryName());
		if (wrapper.getRegionId() != null) {
			Optional<Region> optionalReg = regionRepository.findById(wrapper.getRegionId());
			Region region = optionalReg.isPresent() ? optionalReg.get() : null;
			entity.setRegion(region);
		}
		return entity;
	}

	public PaginationList<CountryWrapper, Country> findAllWithPagination(int page, int size) {
		Pageable paging = PageRequest.of(page, size);
		Page<Country> countryPage = countryRepository.findAll(paging);
		List<Country> countryList = countryPage.getContent();
		List<CountryWrapper> countryWrapperList = toWrapperList(countryList);
		return new PaginationList<CountryWrapper, Country>(countryWrapperList, countryPage);
	}

	public PaginationList<CountryWrapper, Country> findByCountryNameContaining(String countryName, int page, int size) {
		Pageable paging = PageRequest.of(page, size);
		Page<Country> countryPage = countryRepository.findByCountryNameContainingIgnoreCase(countryName, paging);
		List<Country> countryList = countryPage.getContent();
		List<CountryWrapper> countryWrapperList = toWrapperList(countryList);
		return new PaginationList<CountryWrapper, Country>(countryWrapperList, countryPage);
	}

	//find CountryName without pagination
	public List<CountryWrapper> findByCountryNameContainingIgnoreCase(String countryName) {
		List<Country> countryList = countryRepository.findByCountryNameContainingIgnoreCase(countryName);
		return toWrapperList(countryList);
	}

	public List<CountryWrapper> findByRegionNameContainingIgnoreCase(String regionName) {
        List<Country> countryList = countryRepository.findByRegionNameContainingIgnoreCase(regionName);
        return toWrapperList(countryList);
    }

}
