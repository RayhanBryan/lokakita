package com.lokakarya.backend.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

// import javax.transaction.Transactional;

import com.lokakarya.backend.entity.Menu;
import com.lokakarya.backend.exception.BusinessException;
import com.lokakarya.backend.repository.MenuRepository;
import com.lokakarya.backend.wrapper.MenuWrapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class MenuService {
    @Autowired
    MenuRepository menuRepository;

    // get
    public List<MenuWrapper> findAll(){
        return toWrapperList(menuRepository.findAll(Sort.by("menuId").ascending()));
    }
    public MenuWrapper getById(Long id){
        if (id == null)
	        throw new BusinessException("ID cannot be null.");
        Optional<Menu> entity = menuRepository.findById(id);
        if (!entity.isPresent())
            throw new BusinessException("Menu not found: " + id + '.');
        return toWrapper(entity.get());
    }
    public MenuWrapper getByMenuName(String menuName){
        if (menuName == null)
	        throw new BusinessException("Menu name cannot be null.");
        Optional<Menu> entity = menuRepository.findByMenuName(menuName);
        if (!entity.isPresent())
            throw new BusinessException("User not found: " + menuName + '.');
        return toWrapper(entity.get());
    }
    // post & update
    public MenuWrapper save(MenuWrapper wrapper){
        Menu entity = toEntity(wrapper);
        if(entity.getMenuId() != null){
            entity.setUpdatedDate(new Date());
            entity.setUpdatedBy(wrapper.getUpdatedBy());
        }else{
            entity.setCreatedDate(new Date());
            entity.setCreatedBy(wrapper.getCreatedBy());
        }
        return toWrapper(menuRepository.save(entity));
    }
    // delete
    public void delete(Long id){
        if (id == null)
	         throw new BusinessException("ID cannot be null.");
		Optional<Menu> entity = menuRepository.findById(id);
		if (!entity.isPresent())
			throw new BusinessException("Menu not found: " + id + '.');
		menuRepository.deleteById(id);
    }
    // util
    private Menu toEntity(MenuWrapper wrapper){
        Menu entity = new Menu();
        if(wrapper.getMenuId() != null){
            Optional<Menu> menu = menuRepository.findById(wrapper.getMenuId());
            if (!menu.isPresent())
                throw new BusinessException("Menu not found: " + wrapper.getMenuId() + '.');
            entity = menu.get();
        }
        entity.setMenuName(wrapper.getMenuName());
        entity.setIcon(wrapper.getIcon());
        entity.setUrl(wrapper.getUrl());
        entity.setProgramName(wrapper.getProgramName());
        return entity;
    }

    private MenuWrapper toWrapper(Menu entity){
        MenuWrapper wrapper = new MenuWrapper();
        wrapper.setMenuId(entity.getMenuId());
        wrapper.setMenuName(entity.getMenuName());
        wrapper.setIcon(entity.getIcon());
        wrapper.setUrl(entity.getUrl());
        wrapper.setProgramName(entity.getProgramName());
        wrapper.setCreatedDate(entity.getCreatedDate());
        wrapper.setCreatedBy(entity.getCreatedBy());
        wrapper.setUpdatedDate(entity.getUpdatedDate());
        wrapper.setUpdatedBy(entity.getUpdatedBy());
        return wrapper;
    }

    private List<MenuWrapper> toWrapperList(List<Menu> entityList){
        List<MenuWrapper> wrapperList = new ArrayList<MenuWrapper>();
        for (Menu entity : entityList) {
            wrapperList.add(toWrapper(entity));
        }
        return wrapperList;
    }
}
