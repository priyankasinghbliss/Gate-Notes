CREATE TABLE app_user (
    id          BIGSERIAL PRIMARY KEY,
    username    VARCHAR(50)  NOT NULL UNIQUE,
    email       VARCHAR(150) NOT NULL UNIQUE,
    password    VARCHAR(255) NOT NULL,
    role        VARCHAR(20)  NOT NULL DEFAULT 'ROLE_USER',
    enabled     BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at  TIMESTAMP    NOT NULL DEFAULT now()
);

CREATE INDEX idx_app_user_username ON app_user (username);

-- Seed an admin user. Password below is bcrypt for "Admin@123" — CHANGE IT immediately after first login.
INSERT INTO app_user (username, email, password, role, enabled)
VALUES ('admin', 'admin@yourorg.com',
        '$2a$10$W3z1Q0m2h1o5g5v1v0oQaOqfBqU2xU2v0m1z0k5m1z0k5m1z0k5m1', -- placeholder, regenerate before use
        'ROLE_ADMIN', TRUE);
