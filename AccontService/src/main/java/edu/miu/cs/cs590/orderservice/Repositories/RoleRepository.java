package edu.miu.cs.cs590.orderservice.Repositories;

import edu.miu.cs.cs590.orderservice.Models.Role;
import edu.miu.cs.cs590.orderservice.Models.enums.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(RoleName roleName);
}
