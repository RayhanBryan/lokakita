package com.lokakarya.backend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import com.lokakarya.backend.entity.Group;
import com.lokakarya.backend.entity.Permission;
import com.lokakarya.backend.entity.PermissionGroup;
import com.lokakarya.backend.entity.User;
import com.lokakarya.backend.exception.BusinessException;
import com.lokakarya.backend.repository.GroupRepository;
import com.lokakarya.backend.repository.PermissionGroupRepository;
import com.lokakarya.backend.repository.PermissionRepository;
import com.lokakarya.backend.repository.UserRepository;
import com.lokakarya.backend.wrapper.PermissionGroupWrapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class PermissionGroupService {

    @Autowired
    PermissionGroupRepository permissionGroupRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PermissionRepository permissionRepository;

    @Autowired
    GroupRepository groupRepository;

    public List<PermissionGroupWrapper> findAll(){
        return toWrapperList(permissionGroupRepository.findAll());
    }

    public List<PermissionGroupWrapper> findPermissionGroupByUserId(Long userId){
        if (userId == null)
            throw new BusinessException("Id cannot be null.");
        Optional<User> user = userRepository.findById(userId);
        if(!user.isPresent())
            throw new BusinessException("User not found: "+userId+".");
        return toWrapperList(permissionGroupRepository.getPermissionGroupByUserId(userId));
    }

    private PermissionGroup toEntity(PermissionGroupWrapper wrapper){
        PermissionGroup entity = new PermissionGroup();
        if(wrapper.getPermissionGroupId() != null){
            Optional<PermissionGroup> permissionGroup = permissionGroupRepository.findById(wrapper.getPermissionGroupId());
            if (!permissionGroup.isPresent())
                throw new BusinessException("Permission Group not found: " + wrapper.getPermissionGroupId() + '.');
            entity = permissionGroup.get();
        }
        Optional<Permission> optionalPermission = permissionRepository.findById(wrapper.getPermissionId());
        Permission permission = optionalPermission.orElse(null);
        entity.setPermission(permission);
        Optional<Group> optionalGroup = groupRepository.findById(wrapper.getGroupId());
        Group group = optionalGroup.orElse(null);
        entity.setGroup(group);
        return entity;
    }

    private PermissionGroupWrapper toWrapper(PermissionGroup entity){
        PermissionGroupWrapper wrapper = new PermissionGroupWrapper();
        wrapper.setPermissionGroupId(entity.getPermissionGroupId());
        wrapper.setPermission(entity.getPermission().getPermission());
        wrapper.setPermissionId(entity.getPermission().getPermissionId());
        wrapper.setGroupId(entity.getGroup().getGroupId());
        wrapper.setGroupName(entity.getGroup().getGroupName());
        return wrapper;
    }

    private List<PermissionGroupWrapper> toWrapperList(List<PermissionGroup> entityList){
        List<PermissionGroupWrapper> wrapperList = new ArrayList<PermissionGroupWrapper>();
        for (PermissionGroup entity : entityList) {
            wrapperList.add(toWrapper(entity));
        }
        return wrapperList;
    }

    // get
    public PermissionGroupWrapper getById(Long id){
        if(id == null)
            throw new BusinessException("Id cannot be null.");
        Optional<PermissionGroup> permissionGroup = permissionGroupRepository.findById(id);
        if(!permissionGroup.isPresent())
            throw new BusinessException("Permission Group not found: "+ id + ".");
        return toWrapper(permissionGroup.get());
    }

    // post & update
    public PermissionGroupWrapper save(PermissionGroupWrapper wrapper) {
		PermissionGroup permissionGroup = permissionGroupRepository.save(toEntity(wrapper));
		return toWrapper(permissionGroup);
	}

    // delete
    public void delete(Long id){
        if (id == null)
	         throw new BusinessException("ID cannot be null.");
		Optional<PermissionGroup> permissionGroup = permissionGroupRepository.findById(id);
		if (!permissionGroup.isPresent())
			throw new BusinessException("Permission Group not found: " + id + '.');
		permissionGroupRepository.deleteById(id);
    }
    
}
