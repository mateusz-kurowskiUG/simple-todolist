FROM quay.io/keycloak/keycloak as builder

# Enable health and metrics support
ENV KC_HEALTH_ENABLED=true
ENV KC_METRICS_ENABLED=true
# Configure a database vendor
ENV KC_DB=postgres
ENV KC_DB_USERNAME=postgres
ENV KC_DB_PASSWORD=example
ENV KC_HOSTNAME=postgres
WORKDIR /opt/keycloak

# for demonstration purposes only, please make sure to use proper certificates in production instead
RUN keytool -genkeypair -storepass password -storetype PKCS12 -keyalg RSA -keysize 2048 -dname "CN=server" -alias server -ext "SAN:c=DNS:localhost,IP:127.0.0.1" -keystore conf/server.keystore

RUN /opt/keycloak/bin/kc.sh build

FROM quay.io/keycloak/keycloak

COPY --from=builder /opt/keycloak/ /opt/keycloak/

COPY ./stl-realm.json /opt/keycloak/data/import/keycloak.json

ENTRYPOINT ["/opt/keycloak/bin/kc.sh"]
CMD [ "start-dev", "--import-realm" ]