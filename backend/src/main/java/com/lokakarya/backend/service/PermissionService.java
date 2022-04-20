package com.lokakarya.backend.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
// import java.util.Optional;
import java.util.Optional;

import com.lokakarya.backend.entity.Permission;
import com.lokakarya.backend.entity.User;
import com.lokakarya.backend.exception.BusinessException;
import com.lokakarya.backend.repository.PermissionRepository;
import com.lokakarya.backend.repository.UserRepository;
import com.lokakarya.backend.wrapper.PermissionWrapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class PermissionService {

    @Autowired
    PermissionRepository permissionRepository;

    @Autowired
    UserRepository userRepository;

    public List<PermissionWrapper> findAll(){
        return toWrapperList(permissionRepository.findAll());
    }

    public List<PermissionWrapper> findPermissionByUserId(Long userId){
        if (userId == null)
            throw new BusinessException("Id cannot be null.");
        Optional<User> user = userRepository.findById(userId);
        if(!user.isPresent())
            throw new BusinessException("User not found: "+userId+".");
        return toWrapperList(permissionRepository.getPermissionByUserId(userId));
    }

    private Permission toEntity(PermissionWrapper wrapper){
        Permission entity = new Permission();
        if(wrapper.getPermissionId() != null){
            Optional<Permission> permission = permissionRepository.findById(wrapper.getPermissionId());
            if (!permission.isPresent())
                throw new BusinessException("Permission not found: " + wrapper.getPermissionId() + '.');
            entity = permission.get();
        }
        entity.setPermission(wrapper.getPermission());
        entity.setNote(wrapper.getNote());
        return entity;
    }

    private PermissionWrapper toWrapper(Permission entity){
        PermissionWrapper wrapper = new PermissionWrapper();
        wrapper.setPermissionId(entity.getPermissionId());
        wrapper.setPermission(entity.getPermission());
        wrapper.setNote(entity.getNote());
        return wrapper;
    }

    private List<PermissionWrapper> toWrapperList(List<Permission> entityList){
        List<PermissionWrapper> wrapperList = new ArrayList<PermissionWrapper>();
        for (Permission entity : entityList) {
            wrapperList.add(toWrapper(entity));
        }
        return wrapperList;
    }

    // get
    public PermissionWrapper getById(Long id){
        if(id == null)
            throw new BusinessException("Id cannot be null.");
        Optional<Permission> permission = permissionRepository.findById(id);
        if(!permission.isPresent())
            throw new BusinessException("Permission not found: "+ id + ".");
        return toWrapper(permission.get());
    }

    // post & update
    public PermissionWrapper save(PermissionWrapper wrapper){
        Permission entity = toEntity(wrapper);
        if(entity.getPermissionId() != null){
            entity.setPermission(wrapper.getPermission());
            entity.setNote(wrapper.getNote());
        }else{
            entity.setPermissionId(wrapper.getPermissionId());
            entity.setPermission(wrapper.getPermission());
            entity.setNote(wrapper.getNote());
        }
        return toWrapper(permissionRepository.save(entity));
    }

    // delete
    public void delete(Long id){
        if (id == null)
	         throw new BusinessException("ID cannot be null.");
		Optional<Permission> permission = permissionRepository.findById(id);
		if (!permission.isPresent())
			throw new BusinessException("Permission not found: " + id + '.');
		permissionRepository.deleteById(id);
    }
}
