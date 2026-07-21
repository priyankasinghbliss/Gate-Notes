package com.yourorg.backend.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

// Binds to app.storage.* in application.yml — points at a local/on-prem mounted directory
// (e.g. an NFS share or a local disk path), not cloud object storage.
@Configuration
@ConfigurationProperties(prefix = "app.storage")
@Data
public class FileStorageProperties {
    private String baseDir = "/data/app-storage";
}
