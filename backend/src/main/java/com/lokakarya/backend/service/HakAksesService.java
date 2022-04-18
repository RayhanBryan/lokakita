package com.lokakarya.backend.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import com.lokakarya.backend.entity.HakAkses;
import com.lokakarya.backend.exception.BusinessException;
import com.lokakarya.backend.repository.GroupRepository;
import com.lokakarya.backend.repository.HakAksesRepository;
import com.lokakarya.backend.repository.UserRepository;
import com.lokakarya.backend.wrapper.HakAksesWrapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class HakAksesService {

    @Autowired
    HakAksesRepository hakAksesRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    GroupRepository groupRepository;


    private HakAkses toEntity(HakAksesWrapper wrapper){
        HakAkses entity = new HakAkses();
        if(wrapper.getHakAksesId() != null){
            entity=hakAksesRepository.getById(wrapper.getHakAksesId());
        }
        entity.setHakAksesId(wrapper.getHakAksesId());
        if (wrapper.getUserId() != null){
            entity.setUser(userRepository.getById(wrapper.getUserId()));
        }
        if (wrapper.getGroupId() != null){
            entity.setGroup(groupRepository.getById(wrapper.getGroupId()));
        }
        entity.setProgramName(wrapper.getProgramName());
        entity.setCreatedDate(wrapper.getCreatedDate());
        entity.setCreatedBy(wrapper.getCreatedBy());
        entity.setUpdatedDate(wrapper.getUpdatedDate());
        entity.setUpdatedBy(wrapper.getUpdatedBy());
        return entity;
    }
    
    private HakAksesWrapper toWrapper(HakAkses hakAkses) {
        HakAksesWrapper wrapper = new HakAksesWrapper();
        wrapper.setHakAksesId(hakAkses.getHakAksesId());
        wrapper.setUserId(hakAkses.getUser() != null ? hakAkses.getUser().getUserId() : null);
        wrapper.setGroupId(hakAkses.getGroup() != null ? hakAkses.getGroup().getGroupId() : null);
        wrapper.setProgramName(hakAkses.getProgramName());
        wrapper.setCreatedDate(hakAkses.getCreatedDate());
        wrapper.setCreatedBy(hakAkses.getCreatedBy());
        wrapper.setUpdatedDate(hakAkses.getUpdatedDate());
        wrapper.setUpdatedBy(hakAkses.getUpdatedBy());
        return wrapper;
    }

    private List<HakAksesWrapper> toWrapperList(List<HakAkses> hakAksesList){
        List<HakAksesWrapper> wrapperList = new ArrayList<HakAksesWrapper>();
        for (HakAkses hakAkses : hakAksesList) {
            wrapperList.add(toWrapper(hakAkses));
        }
        return wrapperList;
    }

    //get
    public List<HakAksesWrapper> findAll() {
        return toWrapperList(hakAksesRepository.findAll());
    }
    public HakAksesWrapper getById(Long id){
        if(id == null)
            throw new BusinessException("Id cannot be null.");
        Optional<HakAkses> group = hakAksesRepository.findById(id);
        if(!group.isPresent())
            throw new BusinessException("Hak Akses not found: "+ id + ".");
        return toWrapper(group.get());
    }

    // post & update
    public HakAksesWrapper save(HakAksesWrapper wrapper){
        HakAkses entity = toEntity(wrapper);
        if(entity.getHakAksesId() != null){
            entity.setUpdatedDate(new Date());
            entity.setUpdatedBy(wrapper.getUpdatedBy());
        }else{
            entity.setCreatedDate(new Date());
            entity.setCreatedBy(wrapper.getCreatedBy());
        }
        return toWrapper(hakAksesRepository.save(entity));
    }

    // delete
    public void delete(Long id){
        if (id == null)
	         throw new BusinessException("ID cannot be null.");
		Optional<HakAkses> user = hakAksesRepository.findById(id);
		if (!user.isPresent())
			throw new BusinessException("User not found: " + id + '.');
		hakAksesRepository.deleteById(id);
    }
}
