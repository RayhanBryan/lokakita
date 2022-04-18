package com.lokakarya.backend.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import com.lokakarya.backend.entity.Group;
import com.lokakarya.backend.entity.GroupMenu;
import com.lokakarya.backend.exception.BusinessException;
import com.lokakarya.backend.repository.GroupMenuRepository;
import com.lokakarya.backend.repository.GroupRepository;
import com.lokakarya.backend.repository.MenuRepository;
import com.lokakarya.backend.wrapper.GroupMenuWrapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class GroupMenuService {
    
    @Autowired
    GroupMenuRepository groupMenuRepository;
    @Autowired
    GroupRepository groupRepository;
    @Autowired
    MenuRepository menuRepository;

    private GroupMenu toEntity(GroupMenuWrapper wrapper){
        GroupMenu entity = new GroupMenu();
        if(wrapper.getGroupMenuId() != null){
            entity=groupMenuRepository.getById(wrapper.getGroupMenuId());
        }
        if (wrapper.getGroupId() != null){
            entity.setGroup(groupRepository.getById(wrapper.getGroupId()));
        }
        if (wrapper.getMenuId() != null){
            entity.setMenu(menuRepository.getById(wrapper.getMenuId()));
        }
        entity.setIsActive(wrapper.getIsActive());
        entity.setProgramName(wrapper.getProgramName());
        return entity;
    }

private GroupMenuWrapper toWrapper(GroupMenu groupMenu) {
        GroupMenuWrapper wrapper = new GroupMenuWrapper();
        wrapper.setGroupMenuId(groupMenu.getGroupMenuId());
        wrapper.setGroupId(groupMenu.getGroup() != null ? groupMenu.getGroup().getGroupId() : null);
        wrapper.setGroupName(groupMenu.getGroup() != null ? groupMenu.getGroup().getGroupName() : null);
        wrapper.setMenuId(groupMenu.getMenu() != null ? groupMenu.getMenu().getMenuId() : null);
        wrapper.setMenuName(groupMenu.getMenu() != null ? groupMenu.getMenu().getMenuName() : null);
        wrapper.setProgramName(groupMenu.getProgramName());
        wrapper.setCreatedDate(groupMenu.getCreatedDate());
        wrapper.setCreatedBy(groupMenu.getCreatedBy());
        wrapper.setUpdatedDate(groupMenu.getUpdatedDate());
        wrapper.setUpdatedBy(groupMenu.getUpdatedBy());
        return wrapper;
    }

    private List<GroupMenuWrapper> toWrapperList(List<GroupMenu> groupMenuList){
        List<GroupMenuWrapper> wrapperList = new ArrayList<GroupMenuWrapper>();
        for (GroupMenu groupMenu : groupMenuList) {
            wrapperList.add(toWrapper(groupMenu));
        }
        return wrapperList;
    }

    //get
    public List<GroupMenuWrapper> findAll() {
        return toWrapperList(groupMenuRepository.findAll());
    }
    public GroupMenuWrapper getById(Long id){
        if(id == null)
            throw new BusinessException("Id cannot be null.");
        Optional<GroupMenu> groupMenu = groupMenuRepository.findById(id);
        if(!groupMenu.isPresent())
            throw new BusinessException("Hak Akses not found: "+ id + ".");
        return toWrapper(groupMenu.get());
    }
    public List<GroupMenuWrapper> findByGroupId(Long id){
        if( id == null)
            throw new BusinessException("Id cannot be null.");
        Optional<Group> group = groupRepository.findById(id);
        if(!group.isPresent())
            throw new BusinessException("Hak Akses not found: "+ id + ".");
        return toWrapperList(groupMenuRepository.findByGroup(group.get()));
    }

    // post & update
    public GroupMenuWrapper save(GroupMenuWrapper wrapper){
        GroupMenu entity = toEntity(wrapper);
        if(entity.getGroupMenuId() != null){
            entity.setUpdatedDate(new Date());
            entity.setUpdatedBy(wrapper.getUpdatedBy());
        }else{
            entity.setCreatedDate(new Date());
            entity.setCreatedBy(wrapper.getCreatedBy());
        }
        return toWrapper(groupMenuRepository.save(entity));
    }

    // delete
    public void delete(Long id){
        if (id == null)
	         throw new BusinessException("ID cannot be null.");
		Optional<GroupMenu> groupMenu = groupMenuRepository.findById(id);
		if (!groupMenu.isPresent())
			throw new BusinessException("User not found: " + id + '.');
		groupMenuRepository.deleteById(id);
    }
}