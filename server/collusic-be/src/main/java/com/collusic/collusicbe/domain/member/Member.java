package com.collusic.collusicbe.domain.member;

import com.collusic.collusicbe.domain.BaseTimeEntity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Member extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MEMBER_ID")
    private Long id;

    @Column(unique = true, nullable = false)
    private String authId;

    @Column(unique = true, nullable = false)
    private String email;

    @Size(min = 2, max = 24)
    @Column(unique = true, length = 24, nullable = false)
    private String nickname;

    @Column // TODO : 기본 프로필 이미지 url 생성되면 default로 반영할 것
    private String profileImageUrl;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private SnsType snsType;
}
