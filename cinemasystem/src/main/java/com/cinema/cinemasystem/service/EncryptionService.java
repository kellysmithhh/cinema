package com.cinema.cinemasystem.service;

import org.springframework.stereotype.Service;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.util.Base64;

@Service
public class EncryptionService {

    private static final String ALGORITHM = "AES";
    private static final byte[] KEY = new byte[16]; // 128-bit key. Ensure this is securely generated and stored.

    static {
        // Example key initialization - in production, use a secure key management approach
        System.arraycopy("CINEMA-SECRET-KEY".getBytes(), 0, KEY, 0, Math.min(KEY.length, "CINEMA-SECRET-KEY".getBytes().length));
    }

    public String encrypt(String value) {
        try {
            Key key = new SecretKeySpec(KEY, ALGORITHM);
            Cipher cipher = Cipher.getInstance(ALGORITHM);
            cipher.init(Cipher.ENCRYPT_MODE, key);

            byte[] encryptedByteValue = cipher.doFinal(value.getBytes("utf-8"));
            return Base64.getEncoder().encodeToString(encryptedByteValue);
        } catch (Exception e) {
            e.printStackTrace();
            return null; // Consider a better error handling strategy
        }
    }

    public String decrypt(String value) {
        try {
            Key key = new SecretKeySpec(KEY, ALGORITHM);
            Cipher cipher = Cipher.getInstance(ALGORITHM);
            cipher.init(Cipher.DECRYPT_MODE, key);

            byte[] decryptedValue64 = Base64.getDecoder().decode(value);
            byte[] decryptedByteValue = cipher.doFinal(decryptedValue64);
            return new String(decryptedByteValue, "utf-8");
        } catch (Exception e) {
            e.printStackTrace();
            return null; // Consider a better error handling strategy
        }
    }
}