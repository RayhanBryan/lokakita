package com.lokakarya.backend.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.lokakarya.backend.entity.Group;

// import javax.transaction.Transactional;

import com.lokakarya.backend.entity.Menu;
import com.lokakarya.backend.entity.User;
import com.lokakarya.backend.exception.BusinessException;
import com.lokakarya.backend.repository.GroupMenuRepository;
import com.lokakarya.backend.repository.GroupRepository;
import com.lokakarya.backend.repository.HakAksesRepository;
import com.lokakarya.backend.repository.MenuRepository;
import com.lokakarya.backend.repository.UserRepository;
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

    @Autowired
    UserRepository userRepository;

    @Autowired
    GroupRepository groupRepository;

    @Autowired
    GroupMenuRepository groupMenuRepository;

    @Autowired
    HakAksesRepository hakAksesRepository;
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

    public List<MenuWrapper> getMenuByUserId(Long id){
        if (id == null)
	        throw new BusinessException("ID cannot be null.");
        Optional<User> entity = userRepository.findById(id);
        if (!entity.isPresent())
            throw new BusinessException("User not found: " + id + '.');
        return toWrapperList(menuRepository.findMenuByUserId(id));
    }
    public List<MenuWrapper> getMenuByUserIdAndActive(Long id){
        if (id == null)
	        throw new BusinessException("ID cannot be null.");
        Optional<User> entity = userRepository.findById(id);
        if (!entity.isPresent())
            throw new BusinessException("User not found: " + id + '.');
        return toWrapperList(menuRepository.findMenuByUserIdAndActive(id));
    }
    public List<MenuWrapper> getMenuByGroupId(Long groupId){
        if (groupId == null)
	        throw new BusinessException("ID cannot be null.");
        Optional<Group> entity = groupRepository.findById(groupId);
        if (!entity.isPresent())
            throw new BusinessException("Group not found: " + groupId + '.');
        return toWrapperList(menuRepository.findMenuByGroupId(groupId));
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
