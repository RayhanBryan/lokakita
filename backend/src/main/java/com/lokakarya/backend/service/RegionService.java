package com.lokakarya.backend.service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import com.lokakarya.backend.entity.Region;
import com.lokakarya.backend.repository.RegionRepository;
import com.lokakarya.backend.util.PaginationList;
import com.lokakarya.backend.wrapper.RegionWrapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class RegionService {
	
	@Autowired
	RegionRepository regionRepository;
	
	public RegionWrapper getByRegionId(Long regionId) {
		Region region = regionRepository.getById(regionId);
		return toWrapper(region);  
	}
	
	public List<RegionWrapper> findAll() {
		List<Region> regionList = regionRepository.findAll();
		return toWrapperList(regionList);
	};
	
	public RegionWrapper save(RegionWrapper wrapper) {
		Region region = regionRepository.save(toEntity(wrapper));
		return toWrapper(region);
	}
	
	public void delete(Long id) {
		regionRepository.deleteById(id);
	}
	
	private Region toEntity(RegionWrapper wrapper) {
		Region entity = new Region(); 
		if (wrapper.getRegionId() != null) {
			entity = regionRepository.getById(wrapper.getRegionId());
		}
		entity.setRegionName(wrapper.getRegionName());
		
		return entity;
	}
	
	private RegionWrapper toWrapper(Region entity) {
		RegionWrapper wrapper = new RegionWrapper();
		wrapper.setRegionId(entity.getRegionId());
		wrapper.setRegionName(entity.getRegionName());
		
		return wrapper;
	}
	
	private List<RegionWrapper> toWrapperList(List<Region> entityList){
		List<RegionWrapper> wrapperList = new ArrayList<RegionWrapper>();
		for(Region entity : entityList) {
			RegionWrapper wrapper = toWrapper(entity);
			wrapperList.add(wrapper);
		}
		return wrapperList;
	}
	

	public PaginationList<RegionWrapper, Region> findaAllWithPagination(int page, int size){
		Pageable paging = PageRequest.of(page, size);
		Page<Region> regionPage = regionRepository.findAll(paging);
		List<Region> regionList = regionPage.getContent();
		List<RegionWrapper> regionWrapperList = toWrapperList(regionList);
		return new PaginationList<RegionWrapper, Region>(regionWrapperList, regionPage);
	}
		
	public PaginationList<RegionWrapper, Region> findByRegionNameContaining(String regionName, int page, int size){
		Pageable paging = PageRequest.of(page, size);
		Page<Region> regionPage = regionRepository.findByRegionNameContainingIgnoreCase(regionName, paging);
		List<Region> regionList = regionPage.getContent();
		List<RegionWrapper> regionWrapperList = toWrapperList(regionList);
		return new PaginationList<RegionWrapper, Region>(regionWrapperList, regionPage);
	}
}


