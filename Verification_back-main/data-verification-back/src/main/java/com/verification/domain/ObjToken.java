package com.verification.domain;

import lombok.Data;

import java.util.List;

@Data
public class ObjToken extends Token {
    private List<Token> NFT;
}
