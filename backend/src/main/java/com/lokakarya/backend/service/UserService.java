package com.lokakarya.backend.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import com.lokakarya.backend.entity.User;
import com.lokakarya.backend.exception.BusinessException;
import com.lokakarya.backend.repository.UserRepository;
// import com.lokakarya.backend.util.PaginationList;
import com.lokakarya.backend.wrapper.UserWrapper;

import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class UserService {

    @Autowired
    UserRepository userRepository;

    // get
    public List<UserWrapper> findAll(){
        return toWrapperList(userRepository.findAll(Sort.by("userId").ascending()));
    }
    public UserWrapper getById(Long id){
        if (id == null)
	        throw new BusinessException("ID cannot be null.");
        Optional<User> user = userRepository.findById(id);
        if (!user.isPresent())
            throw new BusinessException("User not found: " + id + '.');
        return toWrapper(user.get());
    }
    public UserWrapper getByUsername(String username){
        if (username == null)
	        throw new BusinessException("Username cannot be null.");
        Optional<User> user = userRepository.findByUsername(username);
        if (!user.isPresent())
            throw new BusinessException("User not found: " + username + '.');
        return toWrapper(user.get());
    }
    // post & put
    public UserWrapper save(UserWrapper wrapper){
        User entity = toEntity(wrapper);
        if(entity.getUserId() != null){
            entity.setUpdatedDate(new Date());
            entity.setUpdatedBy(wrapper.getUpdatedBy());
        }else{
            entity.setCreatedDate(new Date());
            entity.setCreatedBy(wrapper.getCreatedBy());
        }
        return toWrapper(userRepository.save(entity));
    }

    // delete
    public void delete(Long id){
        if (id == null)
	         throw new BusinessException("ID cannot be null.");
		Optional<User> user = userRepository.findById(id);
		if (!user.isPresent())
			throw new BusinessException("User not found: " + id + '.');
		userRepository.deleteById(id);
    }

    // toEntity & toWrapper
    private User toEntity(UserWrapper wrapper){
        User entity = new User();
        if(wrapper.getUserId() != null){
            entity=userRepository.getById(wrapper.getUserId());
        }
        entity.setUsername(wrapper.getUsername());
        entity.setPassword(wrapper.getPassword());
        entity.setName(wrapper.getName());
        entity.setAddress(wrapper.getAddress());
        entity.setEmail(wrapper.getEmail());
        entity.setPhone(wrapper.getPhone());
        entity.setProgramName(wrapper.getProgramName());
        return entity;
    }

    private UserWrapper toWrapper(User entity){
        UserWrapper wrapper = new UserWrapper();
        wrapper.setUserId(entity.getUserId());
        wrapper.setUsername(entity.getUsername());
        wrapper.setPassword(entity.getPassword());
        wrapper.setName(entity.getName());
        wrapper.setAddress(entity.getAddress());
        wrapper.setEmail(entity.getEmail());
        wrapper.setPhone(entity.getPhone());
        wrapper.setProgramName(entity.getProgramName());
        wrapper.setCreatedDate(entity.getCreatedDate());
        wrapper.setCreatedBy(entity.getCreatedBy());
        wrapper.setUpdatedDate(entity.getUpdatedDate());
        wrapper.setUpdatedBy(entity.getUpdatedBy());
        return wrapper;
    }

    private List<UserWrapper> toWrapperList(List<User> userList){
        List<UserWrapper> wrapperList = new ArrayList<UserWrapper>();
        for (User user : userList) {
            wrapperList.add(toWrapper(user));
        }
        return wrapperList;
    }

    // private PaginationList<UserWrapper,User> toPaginationList(Page<User> userPage){
    //     List<User> userList = userPage.getContent();
    //     List<UserWrapper> wrapperList = toWrapperList(userList);
    //     PaginationList<UserWrapper,User> paginationList = new PaginationList<>(wrapperList, userPage);
    //     return paginationList;
    // }
}
