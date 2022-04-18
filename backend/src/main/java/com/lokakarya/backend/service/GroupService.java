package com.lokakarya.backend.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

// import javax.transaction.Transactional;

import com.lokakarya.backend.entity.Group;
import com.lokakarya.backend.exception.BusinessException;
import com.lokakarya.backend.repository.GroupRepository;
import com.lokakarya.backend.wrapper.GroupWrapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class GroupService {
    
    @Autowired
    GroupRepository groupRepository;

    // get
    public List<GroupWrapper> findAll(){
        return toWrapperList(groupRepository.findAll());
    }
    public GroupWrapper getById(Long id){
        if(id == null)
            throw new BusinessException("Id cannot be null.");
        Optional<Group> entity = groupRepository.findById(id);
        if(!entity.isPresent())
            throw new BusinessException("Group not found: "+ id + ".");
        return toWrapper(entity.get());
    }
    public GroupWrapper getByGroupName(String groupName){
        if(groupName == null)
            throw new BusinessException("Id cannot be null.");
        Optional<Group> entity = groupRepository.findByGroupName(groupName);
        if(!entity.isPresent())
            throw new BusinessException("Group not found: "+ groupName + ".");
        return toWrapper(entity.get());
    }
    // post & update
    public GroupWrapper save(GroupWrapper wrapper){
        Group entity = toEntity(wrapper);
        if(entity.getGroupId() != null){
            entity.setUpdatedDate(new Date());
            entity.setUpdatedBy(wrapper.getUpdatedBy());
        }else{
            entity.setCreatedDate(new Date());
            entity.setCreatedBy(wrapper.getCreatedBy());
        }
        return toWrapper(groupRepository.save(entity));
    }

    // delete
    public void delete(Long id){
        if (id == null)
	         throw new BusinessException("ID cannot be null.");
		Optional<Group> entity = groupRepository.findById(id);
		if (!entity.isPresent())
			throw new BusinessException("Group not found: " + id + '.');
		groupRepository.deleteById(id);
    }

    // util
    private Group toEntity(GroupWrapper wrapper){
        Group entity = new Group();
        if(wrapper.getGroupId() != null){
            Optional<Group> group = groupRepository.findById(wrapper.getGroupId());
            if(!group.isPresent())
                throw new BusinessException("Group not found: "+ wrapper.getGroupId() + ".");
            entity=group.get();
        }
        entity.setGroupName(wrapper.getGroupName());
        entity.setProgramName(wrapper.getProgramName());
        return entity;
    }

    private GroupWrapper toWrapper(Group entity){
        GroupWrapper wrapper = new GroupWrapper();
        wrapper.setGroupId(entity.getGroupId());
        wrapper.setGroupName(entity.getGroupName());
        wrapper.setProgramName(entity.getProgramName());
        wrapper.setCreatedDate(entity.getCreatedDate());
        wrapper.setCreatedBy(entity.getCreatedBy());
        wrapper.setUpdatedDate(entity.getUpdatedDate());
        wrapper.setUpdatedBy(entity.getUpdatedBy());
        return wrapper;
    }

    private List<GroupWrapper> toWrapperList(List<Group> entityList){
        List<GroupWrapper> wrapperList = new ArrayList<GroupWrapper>();
        for (Group entity : entityList) {
            wrapperList.add(toWrapper(entity));
        }
        return wrapperList;
    }
}
