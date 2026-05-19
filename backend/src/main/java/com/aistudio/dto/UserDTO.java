package com.aistudio.dto;

import lombok.*;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class UserDTO {

    private String uuid;
    private String name;
    private String email;
    private String avatar;
    private String role;
    private String status;
    private String createdAt;
}
